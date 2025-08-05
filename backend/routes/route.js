const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute');
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoutes');

// Mount each router under a specific path
router.use('/auth', authRoutes); // e.g., /api/auth/register, /api/auth/login
router.use('/users', userRoutes); // e.g., /api/users/:userId
router.use('/posts', postRoutes); // e.g., /api/posts/, /api/posts/user/:userId

module.exports = router;
