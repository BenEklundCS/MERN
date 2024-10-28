// Installed Packages
import express from 'express';

// Import the Product model
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/Product.controller.js';

// Create a new router
const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;