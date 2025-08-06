const User = require('../model/User');

const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId); // findById for _id search
		if (!user) return res.status(404).json({ message: 'User not found' });

		// Return only needed fields including the user ID
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			bio: user.bio,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('_id name email bio'); // select only needed fields
		res.json(users);
	} catch (error) {
		console.error('Get all users error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getUserProfile, getAllUsers };
