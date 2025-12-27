const { createProxyMiddleware } = require('http-proxy-middleware');
const auth = require('../middlewares/auth.middleware');

/**
 * Định nghĩa routing từ Gateway → các service
 */
module.exports = (app) => {

  /**
   * USER SERVICE
   * /api/users → http://localhost:4000
   */
  app.use(
    '/api/users',
    auth, // kiểm tra login
    createProxyMiddleware({
      target: process.env.USER_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/users': '/users' // đổi path
      }
    })
  );

  /**
   * BOOKING SERVICE
   * /api/bookings → http://localhost:5000
   */
  app.use(
    '/api/bookings',
    auth,
    createProxyMiddleware({
      target: process.env.BOOKING_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/bookings': '/bookings'
      }
    })
  );

  /**
   * DOCTOR SERVICE
   * /api/doctors → http://localhost:6000
   */
  app.use(
    '/api/doctors',
    auth,
    createProxyMiddleware({
      target: process.env.DOCTOR_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/doctors': '/doctors'
      }
    })
  );
};
