const amqp = require('amqplib');

const EXCHANGE = 'booking.events';
const ROUTING_KEY = 'booking.created';

async function publishBookingCreatedEvent(payload) {
  let connection;
  let channel;

  try {
    console.log(' [BOOKING] Preparing to publish event...');
    console.log(' Exchange:', EXCHANGE);
    console.log(' Routing key:', ROUTING_KEY);
    console.log(' Payload:', payload);

    // 1. Connect RabbitMQ
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    // 2. Assert exchange (tự tạo nếu chưa có)
    await channel.assertExchange(EXCHANGE, 'topic', {
      durable: true
    });

    // 3. Publish message
    const isPublished = channel.publish(
      EXCHANGE,
      ROUTING_KEY,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: true,
        contentType: 'application/json'
      }
    );

    if (isPublished) {
      console.log(' [BOOKING] Event published successfully');
    } else {
      console.warn(' [BOOKING] Event buffered (RabbitMQ backpressure)');
    }
  } catch (error) {
    console.error(' [BOOKING] Failed to publish booking.created event');
    console.error(error);
  } finally {
    if (channel) await channel.close();
    if (connection) await connection.close();
  }
}

module.exports = {
  publishBookingCreatedEvent
};
