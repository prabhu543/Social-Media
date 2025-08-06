const Post = require('../model/Post');
const User = require('../model/User');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
	const { text, authorId } = req.body;
	if (!text || !authorId) {
		return res
			.status(400)
			.json({ message: 'Post content and authorId required' });
	}

	if (!mongoose.isValidObjectId(authorId)) {
		return res.status(400).json({ message: 'Invalid authorId' });
	}

	try {
		// Verify user exists
		const user = await User.findById(authorId);
		if (!user) return res.status(400).json({ message: 'Author not found' });

		const post = new Post({
			text,
			authorId,
		});
		await post.save();

		// Optionally populate author info before sending response
		const populatedPost = await Post.findById(post._id).populate(
			'authorId',
			'name email'
		);

		res.status(201).json(populatedPost);
	} catch (error) {
		console.error('Create post error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

const getAllPosts = async (req, res) => {
	try {
		// Find all posts and populate author info
		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate('authorId', 'name email');
		const formattedPosts = posts.map((post) => ({
			_id: post._id,
			text: post.text,
			createdAt: post.createdAt,
			author: post.authorId
				? { name: post.authorId.name, email: post.authorId.email }
				: { name: 'Unknown', email: null },
		}));

		res.json(formattedPosts);
	} catch (error) {
		console.error('Get all posts error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

const getPostsByUser = async (req, res) => {
	const userId = req.params.userId;

	if (!mongoose.isValidObjectId(userId)) {
		return res.status(400).json({ message: 'Invalid userId' });
	}

	try {
		const posts = await Post.find({ authorId: userId }).sort({ createdAt: -1 });

		res.json(
			posts.map((post) => ({
				_id: post._id,
				text: post.text,
				createdAt: post.createdAt,
			}))
		);
	} catch (error) {
		console.error('Get posts by user error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostsByUser,
};
