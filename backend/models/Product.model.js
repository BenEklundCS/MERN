import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Create a model from the schema and export it
// Mongoose adds an 's' to the end of the model name to create a collection in the database
const Product = mongoose.model('Product', productSchema);

export default Product;