import express from 'express';
import router from './routes/index.js';
const app = express();
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};


const validator = (req, res, next) => {
    if (req.body.name) {
        next();
    } else {
        res.status(400).json({ error: 'Name required' });
    }
};

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});