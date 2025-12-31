const userService = require('../services/user.service');

/**
 * GET /users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET /users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * POST /users
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
