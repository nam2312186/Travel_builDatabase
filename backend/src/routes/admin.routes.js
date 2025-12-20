const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/auth.middleware');
const {
  getAllBookings,
  getUserBookings,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  updateTripPricing,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  resetUserPassword
} = require('../controllers/admin.controller');

// Tất cả routes này yêu cầu quyền admin
router.use(verifyAdmin);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Bookings management
router.get('/bookings', getAllBookings);
router.get('/bookings/user/:username', getUserBookings);

// Tours management
router.get('/tours', getAllTours);
router.post('/tours', createTour);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', deleteTour);

// Trip pricing
router.put('/trips/:id/pricing', updateTripPricing);

// Users management
router.get('/users', getAllUsers);
router.delete('/users/:username', deleteUser);
router.post('/users/:username/reset-password', resetUserPassword);

module.exports = router;
