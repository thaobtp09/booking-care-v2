const amqp = require('amqplib');
const axios = require('axios');

const EXCHANGE = 'doctor.schedule';
const ROUTING_KEY = 'schedule.booked';
const QUEUE = 'doctor.schedule.booked';

const DOCTOR_API_URL =
  process.env.DOCTOR_SERVICE_URL || `http://localhost:${process.env.PORT}`;

const startScheduleBookedConsumer = async () => {
  console.log('[DOCTOR] Connecting to RabbitMQ...');

  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  const q = await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(q.queue, EXCHANGE, ROUTING_KEY);

  console.log('[DOCTOR] RabbitMQ connected');
  console.log('[DOCTOR] Listening queue:', q.queue);

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    console.log('----------------------------------');
    console.log('[DOCTOR] EVENT RECEIVED');

    try {
      const raw = msg.content.toString();
      console.log('[DOCTOR] Raw message:', raw);

      const event = JSON.parse(raw);
      console.log('[DOCTOR] Parsed event:', event);

      const { schedule_id, status } = event.data || {};
      console.log('[DOCTOR] Event data extracted:', {
        schedule_id,
        status
      });

      // ✅ CHECK LẤY ĐƯỢC DATA CHƯA
      if (!schedule_id) {
        throw new Error('Missing schedule_id in event');
      }

      console.log(
        `[DOCTOR] Calling PUT /doctor-schedules/${schedule_id} with status=${status}`
      );

      // ✅ GỌI API PUT
      const response = await axios.put(
        `${DOCTOR_API_URL}/doctor-schedules/${schedule_id}`,
        { status },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // ✅ CHECK PUT THÀNH CÔNG
      console.log('[DOCTOR] PUT success');
      console.log('[DOCTOR] Response status:', response.status);
      console.log('[DOCTOR] Response data:', response.data);

      channel.ack(msg);
      console.log('[DOCTOR] Message ACKED');
    } catch (err) {
      console.error('[DOCTOR] ERROR processing message:', err.message);
      channel.nack(msg, false, false);
    }
  });
};

module.exports = {
  startScheduleBookedConsumer
};
