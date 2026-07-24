import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"
import ApiError from "../utils/ApiError.js"

export const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw ApiError.unauthorized('No token provided or invalid format');
    }
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findById(decoded.sub)
    req.user = user
    next()
})

export const notFound = (req, res, next) => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};