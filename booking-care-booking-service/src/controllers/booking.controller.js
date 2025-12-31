const bookingService = require('../services/booking.service');

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Create booking failed' });
  }
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  const { appointment_date } = req.query;

  const booking = await bookingService.getBooking(id, appointment_date);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.json(booking);
};
