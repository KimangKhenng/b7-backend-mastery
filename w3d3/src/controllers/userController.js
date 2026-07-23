import UserModel from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

export const createUser = asyncHandler(async (req, res) => {
    const { name, email, age, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({ name, email, age, password: hashedPassword })
    await user.save()
    user.password = ""
    res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
    });
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({}).populate('books').populate('booksCount')
    res.status(200).json(users)
})

export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const user = await UserModel.findById(userId)
    res.status(200).json(user)
})

export const updateById = asyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
            new: true,           // Return updated document
            runValidators: true  // Run schema validators
        }
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully'
    });
})

export const deleteById = asyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndDelete(req.params.userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    res.status(200).json({
        success: true,
        data: {},
        message: 'User deleted successfully'
    });
})