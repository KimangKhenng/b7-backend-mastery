import express from 'express';
import {
    createUser,
    deleteById,
    getAllUsers,
    getUserById,
    updateById
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/', createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserById)
userRouter.put('/:userId', updateById)
userRouter.delete('/:userId', deleteById)

export default userRouter;