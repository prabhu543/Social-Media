const express = require('express');
const router = express.Router();
const {
	createPost,
	getAllPosts,
	getPostsByUser,
} = require('../controller/postController');

// Create a post
router.post('/', createPost);

// Get all posts
router.get('/', getAllPosts);

// Get posts by userId (authorEmail)
router.get('/user/:userId', getPostsByUser);

module.exports = router;
