require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxyRoutes = require('./routes/proxy.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(express.json());

//  log mọi request đi qua gateway
app.use((req, res, next) => {
  console.log('[GATEWAY]', req.method, req.originalUrl);
  next();
});

//  gắn proxy routes
app.use(proxyRoutes);
//  start server (LUÔN đặt cuối)
app.listen(PORT, () => {
  console.log(` API Gateway running on port ${PORT}`);
});
