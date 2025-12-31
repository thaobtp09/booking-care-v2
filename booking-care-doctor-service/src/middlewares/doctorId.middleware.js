/**
 * Permission middleware
 * @param {string} permission - quyền cần có để truy cập API
 */
module.exports = (req, res, next) => {
    // Nếu request chưa qua auth.middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

   if (req.user.role !== 'ADMIN' && req.user.doctor_id !== req.body.doctor_id) {
        return res.status(403).json({ message: 'Không có quyền'})
    }

    next()
    // Có quyền → cho đi tiếp
    
  };
