const permissionService = require('../services/permission.service');

/**
 * GET /roles/:roleId/permissions
 * Lấy danh sách permissionId theo role
 */
exports.getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const permissionIds =
      await permissionService.getPermissionIdsByRole(roleId);

    res.json({
      roleId: Number(roleId),
      permissionIds,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /roles/:roleId/permissions
 * Gán lại danh sách permission cho role
 */
exports.assignPermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    await permissionService.assignPermissionsToRole(
      roleId,
      permissionIds
    );

    res.json({ message: 'Permissions assigned successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
