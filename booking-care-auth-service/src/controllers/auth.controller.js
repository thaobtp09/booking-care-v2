const authService = require('../services/auth.service');

// Controller xử lý login
exports.login = async (req, res) => {
  console.log('AUTH LOGIN HIT', req.body);
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
