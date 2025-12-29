const roleService = require('../services/role.service');

/**
 * GET /roles
 */
exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET /roles/:id
 */
exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    res.json(role);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.getRolePermissions = async (req, res) => {
  try {
    const roleId = req.params.id;
    const permissions = await roleService.getRolePermissions(roleId);

    res.json(permissions);
  } catch (err) {
    res.status(500).json({
      message: "Get role permissions failed",
      error: err.message,
    });
  }
};

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