import express from 'express';
const app = express();

// 1. First middleware
app.use((req, res, next) => {
    console.log('1. Global middleware');
    next();
});

// 2. Second middleware
app.use((req, res, next) => {
    console.log('2. Another global middleware');
    next();
});

// 3. Route-specific middleware
app.get('/users',
    (req, res, next) => {
        console.log('3. Route middleware');
        next();
    },
    (req, res) => {
        console.log('4. Route handler');
        res.json({ message: 'Users' });
    }
);

// 5. Error handler (only if error occurs)
app.use((err, req, res, next) => {
    console.log('5. Error handler');
    res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});