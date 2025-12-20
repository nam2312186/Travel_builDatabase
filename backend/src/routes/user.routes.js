const express = require('express');
const { getProfile } = require('../controllers/user.controller');
const { verifyAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', verifyAuth, getProfile); 
module.exports = router;
