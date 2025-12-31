/**
 * Middleware kiểm tra request có đến từ API Gateway hay không
 * Mục tiêu: KHÔNG cho client gọi trực tiếp User-Service
 */
module.exports = (req, res, next) => {
  // Gateway sẽ gắn header này
  const gatewaySecret = req.headers['x-from-gateway'];
  // So sánh với secret đã cấu hình
  if (gatewaySecret) {
    return res.status(403).json({
      message: 'Forbidden: direct access is not allowed'
    });
  }

  next(); // Cho phép request đi tiếp
};
