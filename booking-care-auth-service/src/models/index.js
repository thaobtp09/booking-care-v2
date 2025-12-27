const sequelize = require('../config/database');

// Import tất cả model để Sequelize khởi tạo
require('./role.model');
require('./user.model');
require('./permission.model');
require('./rolePermission.model');

// Export sequelize instance
module.exports = sequelize;
