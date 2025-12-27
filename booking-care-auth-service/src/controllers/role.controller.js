const roleService = require('../services/role.service');

/**
 * POST /roles
 */
exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /roles/:id
 */
exports.updateRole = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /roles/:id
 */
exports.deleteRole = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
