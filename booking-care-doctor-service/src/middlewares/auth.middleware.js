const { verifyToken } = require('../utils/jwt');

// Middleware xác thực người dùng đã login hay chưa
module.exports = (req, res, next) => {
  try {
    // Lấy token từ header Authorization: Bearer xxx
    const token = req.headers.authorization?.split(' ')[1];

    // Nếu không có token → chưa đăng nhập
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
    
    // Giải mã JWT để lấy thông tin user
    const decoded = verifyToken(token);

    // Gắn thông tin user vào request để dùng tiếp
    // decoded chứa: userId, role, permissions
    req.user = decoded;

    next(); // cho phép đi tiếp
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
