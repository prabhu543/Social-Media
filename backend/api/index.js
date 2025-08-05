const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const routes = require('../routes/route'); // Adjust import according to your export style
const connectDB = require('../connect/connect'); // Same here

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount your API router at /api (recommended for clarity)
app.use('/api', routes);

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error('Server startup error:', error);
	}
};

start();
