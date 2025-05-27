const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')

//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory")
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) return res.status(409).json({ message: "User already exists" })
  
  const user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
  await user.save();
  
  
  res.status(201).json(_.pick(user, ['_id', 'email', 'username']));
};

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory")
  }

  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = user.genAuthToken()
    return res.status(200).json({token})
  } 

  return res.status(401).json({message: "Invalid email or password"})

};

//@desc current user info
//@route GET /api/users/me
//@access private
const currentUser = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
