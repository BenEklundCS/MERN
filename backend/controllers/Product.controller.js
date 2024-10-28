import Product from '../models/Product.model.js';
import mongoose from 'mongoose';

// Get all products from the database
export const getProducts = async (request, response) => {
    // Get all products from the database
    try {
        const products = await Product.find({});
        response.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error fetching products from database." });
    }
}

// Create a new product in the database
export const createProduct = async (request, response) => {
    // User sends us a product to add to the database
    const product = request.body;

    // Validate the product
    if (!product.name || !product.price || !product.image) {
        response.status(400).send({ message: "Product is missing required fields." });
    }

    // Add the product to the database
    const newProduct = new Product(product);

    // Save the product to the database
    try {
        await newProduct.save();
        response.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        // If there is an error saving the product to the database
        console.log(error);
        response.status(500).json({ success: false, message: "Error saving product to database." });
    }
}

// Update a product by id in the database
export const updateProduct = async (request, response) => {
    // Get the id of the product to update
    const {id} = request.params;
    // Get the new data for the product
    const product = request.body;

    // Check if the provided product data is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Product not found." });
    }

    // Attempt to update the product
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // use findByIdAndUpdate method to update the product (Mongoose method)
        response.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log(error);
        response.status(400).json({ success: false, message: "Internal server error." });
    }
}

// Delete a product by id from the database
export const deleteProduct = async (request, response) => {
    // Get the id of the product to delete
    const {id} = request.params;
    // Log the id to the console
    console.log("Deleting product with id:", id);

    // Check if the provided product data is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Product not found." });
    }

    // Attempt to delete the product
    try {
        await Product.findByIdAndDelete(id); // use findByIdAndDelete method to delete the product (Mongoose method)
        response.status(200).json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Internal server error." });
    }

}