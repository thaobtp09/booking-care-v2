const permissionService = require('../services/permission.service');

/**
 * POST /roles/:id/permissions
 */
exports.assignPermissions = async (req, res) => {
  try {
    await permissionService.assignPermissionsToRole(
      req.params.id,
      req.body.permissionIds
    );
    res.json({ message: 'Permissions assigned' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
