/**
 * @file /home/ben/Programming/WebApps/MERN/frontend/store/product.js
 * @description Zustand store for managing product state in a MERN stack application.
 */

import {create} from 'zustand';

/**
 * Zustand store for managing product state.
 * @function useProductStore
 * @returns {Object} The product store with state and actions.
 * @property {Array} products - The list of products.
 * @property {Function} setProducts - Action to set the list of products.
 * @property {Function} createProduct - Action to create a new product.
 */

// Define the useProductStore hook using Zustand
export const useProductStore = create((set) => ({
    // Initial state: an empty array of products
    products: [],
    
    // Action to set the products array
    setProducts: (products) => set({ products }),
    
    // Action to create a new product
    createProduct: async (newProduct) => {
        // Validate the new product fields
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }

        // Send a POST request to the API to create the new product
        const res = await fetch("api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        // Parse the response data
        const data = await res.json();

        // If the request was successful, update the state and return success
        if (res.ok) {
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        }
    }
}));