require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models');

// Import routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const roleRoutes = require('./routes/role.route');
const permissionRoutes = require('./routes/permission.route');
const gatewayMiddleware = require('./middlewares/gateway.middleware');

const app = express();

// Middleware toàn cục
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);
app.use(gatewayMiddleware);

// Kiểm tra DB rồi mới start server
sequelize.authenticate().then(() => {
  console.log('User DB connected');
  app.listen(process.env.PORT, () => {
    console.log(`User Service running on ${process.env.PORT}`);
  });
});
