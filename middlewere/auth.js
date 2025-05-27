const jwt = require("jsonwebtoken");
 // Import the config module

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from the config
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
