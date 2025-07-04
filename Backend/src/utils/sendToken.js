import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const sendToken = (savedUser, statusCode, res) => {

    const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: 'User registered successfully',
        user: savedUser,
        token
    })
};

export default sendToken;