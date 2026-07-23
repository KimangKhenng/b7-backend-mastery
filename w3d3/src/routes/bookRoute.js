import express from 'express';

const bookRouter = express.Router();

import {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} from '../controllers/bookController.js';
import { checkOwnership } from '../middleware/authorize.js';
import BookModel from '../models/bookModel.js';

bookRouter.post('/', createBook)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:bookId', getBookById)
bookRouter.put('/:bookId', checkOwnership(BookModel), updateBookById)
bookRouter.delete('/:bookId', checkOwnership(BookModel), deleteBookById)

export default bookRouter;