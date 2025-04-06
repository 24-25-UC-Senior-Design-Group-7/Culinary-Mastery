import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOtpEmail = async (email, otp, userame) => {

    console.log("Email sent to:", email);
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your OTP Verification for Culinary Mastery",
        text: `Hello ${userame}, Your One Time Password (OTP) is: ${otp}. Use this OTP to verify your account. It will expire in 10 minutes. If you didn't request this, please ignore this email.`,
        html: `
            <p>Hello ${userame},</p>
            <h1>OTP Verification</h1>
            <p>Your One Time Password (OTP) is: <strong>${otp}</strong>.</p>
            <p>Use this OTP to verify your account. It will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;  // Indicates success
    } catch (error) {
        console.error("Error sending email:", error);
        return false;  // Indicates failure
    }
};
