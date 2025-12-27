const jwt = require('jsonwebtoken');

/**
 * Auth Middleware cho API Gateway
 * - Verify JWT
 * - Gắn user info vào header
 * - Service phía sau tin tưởng Gateway
 */
module.exports = (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    // Nếu không có token → chưa login
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }

    // Verify token bằng secret dùng chung
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * decoded ví dụ:
     * {
     *   userId: 1,
     *   role: 'ADMIN',
     *   permissions: ['USER_CREATE', 'USER_UPDATE']
     * }
     */

    // Gắn thông tin user vào request header
    // Service phía sau KHÔNG cần verify JWT nữa
    req.headers['x-user-id'] = decoded.userId;
    req.headers['x-user-role'] = decoded.role;
    req.headers['x-user-permissions'] = JSON.stringify(decoded.permissions);
    
    req.headers['x-gateway-secret'] = process.env.GATEWAY_SECRET;


    next(); // cho phép đi tiếp
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
