import express from 'express';

const bookRouter = express.Router();

import {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} from '../controllers/bookController.js';

bookRouter.post('/', createBook)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:bookId', getBookById)
bookRouter.put('/:bookId', updateBookById)
bookRouter.delete('/:bookId', deleteBookById)

export default bookRouter;