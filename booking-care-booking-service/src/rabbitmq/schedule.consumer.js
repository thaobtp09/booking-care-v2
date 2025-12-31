const amqp = require('amqplib');

const EXCHANGE = 'doctor.schedule';
const ROUTING_KEY = 'schedule.changed';
const QUEUE = 'booking.schedule.sync';

const startScheduleConsumer = async () => {
  console.log('[BOOKING] Connecting to RabbitMQ...');

  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

  const q = await channel.assertQueue(QUEUE, { durable: true });

  await channel.bindQueue(q.queue, EXCHANGE, ROUTING_KEY);

  console.log('[BOOKING] RabbitMQ connected');
  console.log('[BOOKING] Listening queue:', q.queue);
  console.log('[BOOKING] Bind:', EXCHANGE, '->', ROUTING_KEY);

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    try {
      const content = msg.content.toString();
      const event = JSON.parse(content);

      console.log('------------------------------');
      console.log('[BOOKING]  EVENT RECEIVED');
      console.log(JSON.stringify(event, null, 2));
      console.log('------------------------------');

      const { action, data } = event;

      switch (action) {
        case 'CREATED':
          console.log('[BOOKING] ACTION = CREATED');
          console.log('[BOOKING] Schedule data:', data);
          // TODO: insert vào bảng local
          break;

        case 'UPDATED':
          console.log('[BOOKING] ACTION = UPDATED');
          console.log('[BOOKING] Schedule data:', data);
          // TODO: update bảng local
          break;

        case 'DELETED':
          console.log('[BOOKING] ACTION = DELETED');
          console.log('[BOOKING] Schedule data:', data);
          // TODO: delete bảng local
          break;

        default:
          console.log('[BOOKING] UNKNOWN ACTION:', action);
      }

      channel.ack(msg);
    } catch (err) {
      console.error('[BOOKING] ERROR processing message', err);
      channel.nack(msg, false, false); // bỏ message lỗi
    }
  });
};

module.exports = {
  startScheduleConsumer
};
