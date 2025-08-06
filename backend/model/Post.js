const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}, // Reference User by ObjectId
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

module.exports = mongoose.model('Post', postSchema);
