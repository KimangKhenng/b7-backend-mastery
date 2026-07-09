import express from 'express';
const userRouter = express.Router();

// All routes start with /api/users

// GET /api/users
userRouter.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
});

// GET /api/users/:userId
userRouter.get('/:userId', (req, res) => {
    res.json({ message: 'Get user', userId: req.params.userId });
});

// POST /api/users
userRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'Create user', data: req.body });
});

// PUT /api/users/:userId
userRouter.put('/:userId', (req, res) => {
    res.json({ message: 'Update user', userId: req.params.userId });
});

// DELETE /api/users/:userId
userRouter.delete('/:userId', (req, res) => {
    res.status(204).send();
});

export default userRouter;