import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
import { insertUser, verifyUser, findUserByEmail } from '../db/operations.js';
// import {randomBytes} from 'crypto';
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
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        if(!user.isVerified){
            return res.status(401).json({message: "Please verify your account before logging in."});
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id },process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        console.log("Setting cookies", accessToken, refreshToken);

        res.cookie('accessToken', accessToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.cookie('refreshToken', refreshToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });


        console.log("Login successful");
        res.json({message: "Login successful", accessToken, refreshToken});
    }catch(error){
        console.error("Error logging in:", error);
        res.status(500).json({ error: "An error occurred while logging in." });
    }
});

router.get("/check-session", (req, res) => {
    try {
        const token = req.cookies.accessToken;  // Assuming you have a middleware to verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ authenticated: false });
            }
            return res.status(200).json({ authenticated: true, user: decoded });
        });
    } 
    catch (error) {
        console.error("Error checking session:", error);
        res.status(500).json({error: 'Internal server error' });
    }
});

// refresh token
// post /api/refresh

router.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ success: true });
    });
});



// logout
router.post('/logout', (req, res) => {
    
    try {
        // Clear the authentication cookies
    res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'Strict' });

    // Send a response indicating logout was successful
    res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "An error occurred while logging out." });
    }
});


export default router;

