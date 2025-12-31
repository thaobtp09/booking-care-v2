/**
 * Permission middleware
 * @param {string} permission - quyền cần có để truy cập API
 */
module.exports = (permission) => {
  return (req, res, next) => {
    /**
     * req.user được gắn từ auth.middleware
     * Ví dụ:
     * req.user = {
     *   userId: 1,
     *   role: 'ADMIN',
     *   permissions: ['USER_CREATE', 'USER_DELETE']
     * }
     */

    // Nếu request chưa qua auth.middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    // Kiểm tra user có quyền yêu cầu hay không
    const hasPermission = req?.user?.permissions?.includes(permission);

    // Nếu không có quyền → chặn
    // if (!hasPermission) {
    //   return res.status(403).json({
    //     message: `Forbidden: missing permission ${permission}`
    //   });
    // }

    // Có quyền → cho đi tiếp
    next();
  };
};
