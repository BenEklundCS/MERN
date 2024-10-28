import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.model.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Allows us to accept JSON data in the body of the request
app.use(express.json());

// Middleware to parse JSON data for POST requests to API
app.get("/", (request, response) => {
    response.send("Server is ready.");
})

app.post("/api/products", async (request, response) => {
    // User sends us a product to add to the database
    const product = request.body;

    // Validate the product
    if (!product.name || !product.price || !product.image) {
        return response.status(400).send({ message: "Product is missing required fields." });
    }

    // Add the product to the database
    const newProduct = new Product(product);

    // Save the product to the database
    try {
        await newProduct.save();
        return response.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ success: false, message: "Error saving product to database." });
    }
});

console.log(process.env.MONGO_URI);

// Start server on port 5000
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});