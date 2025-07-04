import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log('mongodb connected');
    }catch (error) {
        console.error('Error connecting to MongoDB :', error.message);
        process.exit(1);
    }
}

export default connectDB;
