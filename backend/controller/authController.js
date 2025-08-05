const User = require('../model/User');

const registerUser = async (req, res) => {
	const { name, email, password, bio } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: 'Email already exists' });

		const user = new User({ name, email, password, bio });
		await user.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user || user.password !== password) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		res.json({ userId: user.email, message: 'Login successful' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { registerUser, loginUser };
