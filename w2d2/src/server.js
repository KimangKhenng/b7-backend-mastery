import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
const PORT = 3000
const app = express();


app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB()

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})