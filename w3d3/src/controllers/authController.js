import UserModel from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async (req, res) => {
    const { email, name, age, role, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({
        name,
        email,
        age,
        role,
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

    const refreshTokenHash = await bcrypt.hash(refreshToken, 12)

    user.refreshToken = refreshTokenHash
    await user.save()

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,                                        // JS cannot read it
        secure: process.env.NODE_ENV === 'production',         // HTTPS only in prod
        sameSite: 'strict',                                    // No cross-site sending
        maxAge: 7 * 24 * 60 * 60 * 1000,                      // 7 days in ms
    });

    return res.json({
        accessToken
    })
})

export const refresh = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No refresh token provided" })
    }
    const refreshSecret = process.env.JWT_REFRESH_SECRET
    const decoded = jwt.verify(token, refreshSecret)
    const user = await UserModel.findById(decoded.sub).select('refreshToken')
    if (!user) {
        return res.status(401).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(token, user.refreshToken);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid refresh token" })
    }
    const secret = process.env.JWT_SECRET
    const accessToken = jwt.sign(
        {
            sub: user._id,
            email: decoded.email
        }
        , secret,
        { expiresIn: '15m' });

    return res.json({
        accessToken
    })
})