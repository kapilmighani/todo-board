import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import sendToken from '../utils/sendToken.js';
import User from '../models/user.model.js';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if( existingUser ) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        sendToken(savedUser, 201, res);
    }catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        sendToken(user, 200, res);
    }catch (error) {
        console.log("Error logging in user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}