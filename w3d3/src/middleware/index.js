import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"

export const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findById(decoded.sub)
    req.user = user
    next()
})