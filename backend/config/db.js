import mongoose from 'mongoose';

// Connect to the database asynchronously
export const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the MONGO_URI environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI, {

        });
        // Log the connection host
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error message in case of failure
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1 means exit with failure, 0 means exit without failure
    }
}