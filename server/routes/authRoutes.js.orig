import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { insertUser, verifyUser, findUserByEmail } from '../db/operations.js';
import {randomBytes} from 'crypto';
import { sendOtpEmail } from "../services/emailService.js";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Simple validations (expand according to your needs)
    if (!email || !password || !username) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        if (await findUserByEmail(email)) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generating a 6-digit OTP
        await insertUser({ username, email, password: hashedPassword, otp });
        await sendOtpEmail(email, otp, username);
        
        
        res.status(201).json({ message: "User registered successfully! Verification email sent." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
});


router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send('Email and OTP are required.');
    }
    if(typeof otp !== 'string'){
        return res.status(400).send('Invalid OTP format.');
    }



    try {
        const verified = await verifyUser(email, otp);
        const user = await findUserByEmail(email);
        if (verified) {
            res.send('Account verified successfully.');
        }else if(user.isVerified){
            res.send('Account already verified.');
        } else {
            res.status(400).send('Invalid OTP or email.');
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).send('Error verifying account.');
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try{
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!user.isVerified){
            return res.status(401).json({message: "Please verify your account before logging in."});
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.json({message: "Login successful", accessToken, refreshToken});
    }catch(error){
        console.error("Error logging in:", error);
        res.status(500).json({ error: "An error occurred while logging in." });
    }
});




export default router;

