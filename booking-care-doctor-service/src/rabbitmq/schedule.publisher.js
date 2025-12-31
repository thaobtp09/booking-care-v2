const amqp = require('amqplib');

let channel;

const ALLOWED_ACTIONS = ['CREATED', 'UPDATED', 'DELETED'];

const connectRabbit = async () => {
  if (channel) return;

  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();

  await channel.assertExchange('doctor.schedule', 'topic', {
    durable: true
  });
};
console.log('[RabbitMQ] connected (schedule)');
const publishScheduleChanged = async ({ action, data }) => {
  if (!channel) await connectRabbit();
  const payload = {
    event: 'SCHEDULE_CHANGED',
    action,
    data
  };

  console.log(' FINAL PUBLISH PAYLOAD');
  console.log(JSON.stringify(payload, null, 2));

  channel.publish(
    'doctor.schedule',
    'schedule.changed',
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );

};

module.exports = { publishScheduleChanged };
