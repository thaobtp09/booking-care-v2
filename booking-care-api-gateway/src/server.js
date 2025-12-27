require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxyRoutes = require('./routes/proxy.route');

const app = express();

// Cho phép UI gọi Gateway
app.use(cors());
app.use(express.json());

// Gắn proxy routes
proxyRoutes(app);

// Start API Gateway
app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});
