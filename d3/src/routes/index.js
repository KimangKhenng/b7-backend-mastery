import express from 'express';
import userRouter from './users.js';
import postRouter from './posts.js';
import productRouter from './product.js';
const router = express.Router();


// Mount routers
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/products', productRouter)

export default router;