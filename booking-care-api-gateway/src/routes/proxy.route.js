const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

/**
 * AUTH SERVICE
 * Client gọi:    /auth/login
 * Gateway forward: http://localhost:4000/auth/login
 */
router.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,

    // 🔥 CỰC KỲ QUAN TRỌNG – tránh /auth/auth/login
    pathRewrite: {
      '^/auth': '',
    },

    onProxyReq(proxyReq) {
      proxyReq.setHeader('x-from-gateway', 'true');
    },

    onError(err, req, res) {
      console.error('AUTH PROXY ERROR:', err.message);
      res.status(500).json({ message: 'Auth service unavailable' });
    },
  })
);

module.exports = router;
