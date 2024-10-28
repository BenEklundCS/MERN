import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Middleware to parse JSON data for POST requests to API
app.get("/", (request, response) => {
    response.send("Server is ready.");
})

console.log(process.env.MONGO_URI)

// Start server on port 5000
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});