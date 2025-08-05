const User = require('../model/User');

const getUserProfile = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.params.userId });
		if (!user) return res.status(404).json({ message: 'User not found' });

		// Return only needed fields
		res.json({
			name: user.name,
			email: user.email,
			bio: user.bio,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getUserProfile };
