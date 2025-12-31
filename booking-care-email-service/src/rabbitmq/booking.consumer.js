const amqp = require('amqplib');
const {
  handleBookingCreated
} = require('../services/emailNotification.service');

const EXCHANGE = 'booking.events';
const QUEUE = 'booking.created.mail';

async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, 'booking.created');

  console.log('📬 [MAIL] Waiting for events...');

  channel.consume(QUEUE, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    try {
      await handleBookingCreated(data);
      channel.ack(msg);
      console.log('✅ [MAIL] Event processed');
    } catch (err) {
      console.error('❌ [MAIL] Error:', err);
      channel.ack(msg);
    }
  });
}

module.exports = startConsumer;
