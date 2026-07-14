import asyncHandler from "express-async-handler"
import BookModel from "../models/bookModel.js"

export const createBook = asyncHandler(async (req, res) => {
    const { title, isbn, author, publishedYear } = req.body
    const book = new BookModel({ title, isbn, author, publishedYear })
    await book.save()
    res.status(201).json({
        success: true,
        data: book,
        message: 'Book created successfully'
    });
})

export const getAllBooks = asyncHandler(async (req, res) => {

    const {
        page = 11,
        limit = 10,
        publishedYear,
        minYear,
        maxYear,
        search,
        sort = '-createdAt',
        populate,
        select
    } = req.query

    // const publishedYear = parseInt(req.query.publishedYear)

    const query = {}

    if (req.query.publishedYear) {
        query.publishedYear = publishedYear
    }

    // Add range filter for view count
    if (minYear || maxYear) {
        query.publishedYear = {};
        if (minYear) query.publishedYear.$gte = parseInt(minYear);
        if (maxYear) query.publishedYear.$lte = parseInt(maxYear);
    }

    if (search) {
        // Search in title OR isbn
        query.$text = {
            '$search': search
        }
    }


    let popArray = ""

    if (populate) {
        popArray = populate.replace(",", " ")
    }

    let selectArray = ""

    if (select) {
        selectArray = select.replace(",", " ")
    }

    console.log("Query:", query)


    // const result = await BookModel.paginate(query, {
    //     page: parseInt(page),
    //     limit: parseInt(limit),
    //     select: selectArray,
    //     sort,
    //     populate: popArray
    // });

    const result = await BookModel.find({}).populate('author', 'name email age')

    res.status(200).json(result);
})

export const getBookById = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId
    const book = await BookModel.findById(bookId).populate('author', 'name email age')
    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }
    res.status(200).json({
        success: true,
        data: book
    })
})

export const updateBookById = asyncHandler(async (req, res) => {
    const book = await BookModel.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        {
            new: true,           // Return updated document
            runValidators: true  // Run schema validators
        }
    );

    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }

    res.status(200).json({
        success: true,
        data: book,
        message: 'Book updated successfully'
    });
})

export const deleteBookById = asyncHandler(async (req, res) => {
    const book = await BookModel.findByIdAndDelete(req.params.bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }
    res.status(200).json({
        success: true,
        data: {},
        message: 'Book deleted successfully'
    });
})