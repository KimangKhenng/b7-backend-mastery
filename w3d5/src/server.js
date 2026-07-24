import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
import authRouter from './routes/authRoute.js';
import { notFound, verifyToken } from './middleware/index.js';
import errorHandler from './middleware/errorHandler.js';
const PORT = 3000
const app = express();


app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

await connectDB()

app.use('/api/users', verifyToken, userRouter)
app.use('/api/books', verifyToken, bookRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    console.error(err.stack);

    // Close server & exit
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);

    // Exit immediately
    process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});