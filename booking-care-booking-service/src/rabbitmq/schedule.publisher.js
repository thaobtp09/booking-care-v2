const amqp = require('amqplib');

const EXCHANGE = 'doctor.schedule';
const ROUTING_KEY = 'schedule.booked';

let channel;

const connectRabbit = async () => {
  if (channel) return channel;

  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  return channel;
};

const publishScheduleBooked = async ({ schedule_id, status }) => {
  const ch = await connectRabbit();

  const payload = {
    event: 'SCHEDULE_BOOKED',
    data: {
      schedule_id,
      status
    }
  };

  console.log('[BOOKING] Publish schedule.booked', payload);

  ch.publish(
    EXCHANGE,
    ROUTING_KEY,
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );
};

module.exports = {
  publishScheduleBooked
};
