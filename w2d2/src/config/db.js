import mongoose from 'mongoose';

const uri = process.env.MONGODB_ATLAS

const connectDB = async () => {
    try {
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
        await mongoose.connect(uri, {
            dbName: 'b6-fullstack'
        });
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;