const mongoose = require('mongoose');

const connectDB = async (url) => {
	mongoose
		.connect(url)
		.then(() => console.log('mongoDB connected!!'))
		.catch((error) => console.log('DB error : ', error));
};

module.exports = connectDB;
