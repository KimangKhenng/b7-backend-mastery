import express from 'express';
import { login, refresh, registerUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', login)
authRouter.post('/refresh', refresh)

export default authRouter;