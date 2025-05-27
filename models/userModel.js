const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  { timestamps: true }
);

userSchema.methods.genAuthToken = function () {
  return jwt.sign(
    {
      user: {
        username: this.username,
        email: this.email,
        id: this.id,
      },
    },
    process.env.JWT_SECRET // Use the secret from the .env
  );
};

module.exports = mongoose.model("User", userSchema);
