import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_management';
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to MongoDB: ${MONGODB_URI}`);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1);
    }
};
