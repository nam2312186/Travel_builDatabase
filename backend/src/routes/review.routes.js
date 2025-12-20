const express = require('express');
const { createReview, getReviewsByTour } = require('../controllers/review.controller');
const router = express.Router();

router.post('/', createReview);
router.get('/:IDTour', getReviewsByTour);

module.exports = router;