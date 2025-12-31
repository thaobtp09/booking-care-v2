const amqp = require('amqplib');
const repo = require('../repositories/doctorScheduleCache.repository');

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

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    try {

      const event = JSON.parse(msg.content.toString());
      const { action, data } = event;

      console.log('------------------------------');
      console.log('[BOOKING] EVENT RECEIVED');

  if (action === 'CREATED' || action === 'UPDATED') {
        await repo.upsert({
          schedule_id: data.schedule_id,
          doctor_id: data.doctor_id,
          schedule_date: data.schedule_date,
          time_slot_id: data.time_slot_id,
          status: data.status
        });

        console.log('[BOOKING] Cache UPSERT success:', data.schedule_id);
      }

      if (action === 'DELETED') {
        await repo.remove(data.schedule_id);
        console.log('[BOOKING] Cache DELETE success:', data.schedule_id);
      }
      channel.ack(msg);
    } catch (err) {
      console.error('[BOOKING]  ERROR processing message', err);
      channel.nack(msg, false, false);
    }
  });
};
module.exports = {
  startScheduleConsumer
};
