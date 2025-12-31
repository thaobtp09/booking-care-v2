require('dotenv').config();
const { startScheduleConsumer } = require('./rabbitmq/schedule.consumer');

const express = require('express');
const app = express();

// Parse JSON body
app.use(express.json());

// Routes
const bookingRoutes = require('./routes/booking.routes');
app.use('/api', bookingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'booking-service'
  });
});

// Start server
const PORT = process.env.PORT || 5003;
(async () => {
  try {
    console.log('[BOOKING] Starting service...');

    await startScheduleConsumer(); // 👈 START CONSUMER

    app.listen(PORT, () => {
      console.log(`Booking Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[BOOKING] Failed to start service', err);
    process.exit(1);
  }
})();
