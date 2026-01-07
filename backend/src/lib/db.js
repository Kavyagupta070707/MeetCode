import mongoose from 'mongoose';
import {ENV} from './env.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log('Connected to MongoDB', conn.connection.host);
    } catch (error) {
        console.error("Error connecting to Mongodb", error);
        process.exit(1);
    }
}