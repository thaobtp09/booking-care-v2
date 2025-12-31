const amqp = require('amqplib');
const User = require('../models/user.model');

const EXCHANGE = 'doctor.events';
const QUEUE = 'auth.doctor.created';
const ROUTING_KEY = 'doctor.created';

const startDoctorCreatedConsumer = async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  const q = await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(q.queue, EXCHANGE, ROUTING_KEY);

  console.log(' Auth-service listening doctor.created events');

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    try {
      const { doctorId, userId } = JSON.parse(msg.content.toString());

      console.log(' doctor.created received:', { doctorId, userId });

      const user = await User.findByPk(userId);

      if (!user) {
        console.warn(` User ${userId} not found → skip`);
        return channel.ack(msg);
      }

      if (user.doctor_id === null) {
        await user.update({ doctor_id: doctorId });
        console.log(` User ${userId} updated doctor_id = ${doctorId}`);
      } else {
        console.log(
          ` User ${userId} already has doctor_id = ${user.doctor_id}, skip`
        );
      }

      channel.ack(msg);
    } catch (err) {
      console.error(' Consume doctor.created failed', err);
      //  không ack để RabbitMQ retry
    }
  });
};

module.exports = { startDoctorCreatedConsumer };
