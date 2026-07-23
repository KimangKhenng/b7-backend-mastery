import express from 'express';
import {
    createUser,
    deleteById,
    getAllUsers,
    getUserById,
    updateById
} from '../controllers/userController.js';
import { authorize } from '../middleware/authorize.js';

const userRouter = express.Router();

userRouter.post('/', authorize('admin'), createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserById)
userRouter.put('/:userId', authorize('admin'), updateById)
userRouter.delete('/:userId', authorize('admin'), deleteById)

export default userRouter;