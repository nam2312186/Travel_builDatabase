const express = require('express');
const { applyPromotion } = require('../controllers/promotion.controller');
const { getAllPromotions } = require('../controllers/promotion.controller');
const router = express.Router();

router.post('/apply', applyPromotion);
router.get('/', getAllPromotions);

module.exports = router;