const express = require('express');
const router = express.Router();
const { getUserProfile, getAllUsers } = require('../controller/userController');

// Get user profile by userId (email)
router.get('/:userId', getUserProfile);
router.get('/', getAllUsers);

module.exports = router;
