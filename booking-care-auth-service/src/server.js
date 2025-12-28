require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const roleRoutes = require('./routes/role.route');
const permissionRoutes = require('./routes/permission.route');
const gatewayMiddleware = require('./middlewares/gateway.middleware');
const initAdmin = require('./seed/init-admin');

const app = express();

/* ===== GLOBAL MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== GATEWAY MIDDLEWARE ===== */
app.use(gatewayMiddleware);

/* ===== ROUTES ===== */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);

/* ===== START SERVER AFTER DB READY ===== */
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Auth DB connected');

    //   CHỈ CHẠY SEED SAU KHI DB READY
    await initAdmin();

    app.listen(process.env.PORT, () => {
      console.log(` Auth Service running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(' Cannot start server:', err);
    process.exit(1);
  }
})();
