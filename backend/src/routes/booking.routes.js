const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/booking.controller');
const router = express.Router();

router.post('/', createBooking);
router.get('/user', getUserBookings);

module.exports = router;