import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/Product.route.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Allows us to accept JSON data in the body of the request
app.use(express.json());

// Import the product routes api
app.use('/api/products', productRoutes);

// Start server on port 5000
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});