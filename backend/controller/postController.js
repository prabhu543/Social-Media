const Post = require('../model/Post');
const User = require('../model/User');

const createPost = async (req, res) => {
	const { text, authorEmail } = req.body;
	if (!text || !authorEmail) {
		return res
			.status(400)
			.json({ message: 'Post content and author required' });
	}

	try {
		// Optional: verify user exists
		const user = await User.findOne({ email: authorEmail });
		if (!user) return res.status(400).json({ message: 'Author not found' });

		const post = new Post({
			text,
			authorEmail,
		});
		await post.save();

		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		// Add author name to each post
		const postsWithAuthors = await Promise.all(
			posts.map(async (post) => {
				const user = await User.findOne({ email: post.authorEmail });
				return {
					_id: post._id,
					text: post.text,
					createdAt: post.createdAt,
					author: { name: user?.name || 'Unknown', email: post.authorEmail },
				};
			})
		);
		res.json(postsWithAuthors);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

const getPostsByUser = async (req, res) => {
	try {
		const posts = await Post.find({ authorEmail: req.params.userId }).sort({
			createdAt: -1,
		});
		res.json(
			posts.map((post) => ({
				_id: post._id,
				text: post.text,
				createdAt: post.createdAt,
			}))
		);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostsByUser,
};
