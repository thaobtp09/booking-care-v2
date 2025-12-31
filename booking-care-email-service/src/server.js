require('dotenv').config();
const startConsumer = require('./rabbitmq/booking.consumer');

startConsumer();
console.log('📧 Mail service is running...');
