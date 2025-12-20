const express = require('express');
const { getAllTours, getTourDetail } = require('../controllers/tour.controller');
const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourDetail);

module.exports = router;