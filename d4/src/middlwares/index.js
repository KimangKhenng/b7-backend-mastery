export const logger = (req, res, next) => {
    console.log(`${req.method} | ${req.originalUrl}`);
    next();
};

export const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }

    if (age && (age < 0 || age > 150)) {
        return res.status(400).json({
            error: 'Age must be between 0 and 150'
        });
    }

    // Validation passed
    next();
};

export const validator = (req, res, next) => {
    if (req.body.name) {
        next();
    } else {
        res.status(400).json({ error: 'Name required' });
    }
};