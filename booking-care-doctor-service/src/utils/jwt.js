const jwt = require('jsonwebtoken');

// Tạo JWT token
exports.generateToken = (payload) => {
  return jwt.sign(
    payload,                  // dữ liệu nhúng vào token
    process.env.JWT_SECRET,   // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Verify token
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
