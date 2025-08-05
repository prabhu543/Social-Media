const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controller/userController');

// Get user profile by userId (email)
router.get('/:userId', getUserProfile);

module.exports = router;
