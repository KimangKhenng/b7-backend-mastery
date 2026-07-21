import UserModel from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async (req, res) => {
    const { email, name, age, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({
        name,
        email,
        age,
        password: hashedPassword
    })
    await user.save()
    user.password = ""
    res.json(user)
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email }).select('email password')
    if (!user) {
        return res.status(401).json({ message: "User or password not correct!" })
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "User or password not correct!" })
    }
    // Sign Token
    const secret = process.env.JWT_SECRET
    const refresh_secret = process.env.JWT_REFRESH_SECRET
    const accessToken = jwt.sign(
        {
            sub: user._id,
            email: user.email
        }
        , secret,
        { expiresIn: '15m' });

    const refreshToken = jwt.sign(
        {
            sub: user._id,
            email: user.email
        }
        , refresh_secret,
        { expiresIn: '3d' });

    return res.json({
        accessToken,
        refreshToken
    })
})