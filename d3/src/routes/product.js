import express from 'express';
const productRouter = express.Router();

const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999, stock: 15 },
    { id: 2, name: 'Phone', category: 'electronics', price: 699, stock: 25 },
    { id: 3, name: 'Desk', category: 'furniture', price: 299, stock: 10 },
    { id: 4, name: 'Chair', category: 'furniture', price: 150, stock: 30 },
    { id: 5, name: 'Monitor', category: 'electronics', price: 350, stock: 20 },
    { id: 6, name: 'Headphones', category: 'electronics', price: 199, stock: 50 },
    { id: 7, name: 'Keyboard', category: 'electronics', price: 120, stock: 40 },
    { id: 8, name: 'Mouse', category: 'electronics', price: 80, stock: 60 },
    { id: 9, name: 'Bookshelf', category: 'furniture', price: 200, stock: 5 },
    { id: 10, name: 'Lamp', category: 'furniture', price: 75, stock: 20 },
    { id: 11, name: 'Tablet', category: 'electronics', price: 450, stock: 30 },
    { id: 12, name: 'Smartwatch', category: 'electronics', price: 250, stock: 25 },
    { id: 13, name: 'Camera', category: 'electronics', price: 800, stock: 15 },
    { id: 14, name: 'Printer', category: 'electronics', price: 150, stock: 10 },
    { id: 15, name: 'Router', category: 'electronics', price: 100, stock: 20 },
    { id: 16, name: 'Speaker', category: 'electronics', price: 180, stock: 30 },
    { id: 17, name: 'Webcam', category: 'electronics', price: 90, stock: 25 },
    { id: 18, name: 'External Hard Drive', category: 'electronics', price: 120, stock: 40 },
    { id: 19, name: 'Gaming Console', category: 'electronics', price: 400, stock: 15 },
    { id: 20, name: 'VR Headset', category: 'electronics', price: 350, stock: 10 }
];

// GET /api/products with filtering and sorting
productRouter.get('/', (req, res) => {
    let result = [...products];

    // Filter by category
    if (req.query.category) {
        result = result.filter(p => p.category === req.query.category);
    }

    // Filter by price range
    if (req.query.minPrice) {
        result = result.filter(p => p.price >= parseFloat(req.query.minPrice));
    }
    if (req.query.maxPrice) {
        result = result.filter(p => p.price <= parseFloat(req.query.maxPrice));
    }

    // Filter by stock availability
    if (req.query.inStock === 'true') {
        result = result.filter(p => p.stock > 0);
    }

    // Sort (e.g., sort=price or sort=-price for descending)
    if (req.query.sort) {
        const sortField = req.query.sort.replace('-', '');
        const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;

        result.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1 * sortOrder;
            if (a[sortField] > b[sortField]) return 1 * sortOrder;
            return 0;
        });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResults = result.slice(startIndex, endIndex);

    res.json({
        success: true,
        count: paginatedResults.length,
        total: result.length,
        page,
        totalPages: Math.ceil(result.length / limit),
        data: paginatedResults
    });
});

// GET /api/products/:id (single product)
productRouter.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }

    res.json({
        success: true,
        data: product
    });
});

export default productRouter
