const amqp = require('amqplib');

let channel;

const connectRabbit = async () => {
  const conn = await amqp.connect('amqp://localhost:5672');
  channel = await conn.createChannel();

  await channel.assertExchange('doctor.events', 'topic', {
    durable: true
  });
  console.log('RabbitMQ connected & exchange asserted');
};

const publishDoctorCreated = async (message) => {
  if (!channel) await connectRabbit();

  channel.publish(
    'doctor.events',
    'doctor.created',
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );
};

module.exports = { publishDoctorCreated };
