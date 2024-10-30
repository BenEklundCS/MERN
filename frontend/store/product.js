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
    },

    fetchProducts: async () => {
        // Send a GET request to the API to fetch all products
        const res = await fetch("api/products");

        // Parse the response data
        const data = await res.json();

        // If the request was successful, update the state with the products
        if (res.ok) {
            set({ products: data.data });
        }
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`api/products/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
            // Update the state by removing the deleted product, this will trigger a re-render
            set((state) => ({
                products: state.products.filter((product) => product._id !== pid)
            }));
            return { success: true, message: data.message };
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`api/products/${pid}`, {  // Use backticks for interpolation
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
    
        const data = await res.json();
    
        if (res.ok) {
            set((state) => ({
                products: state.products.map((product) => {
                    if (product._id === pid) {
                        return { ...product, ...updatedProduct };
                    }
                    return product;
                })
            }));
            return { success: true, message: data.message };
        } else {
            // Return an error message if the request was not successful
            return { success: false, message: data.message || "Failed to update product" };
        }
    },
    
}));