import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to verify the access token and authenticate the user.
 * If the token is valid, the user is attached to the request object and the next middleware is called.
 * If the token is invalid, a 403 status is sent with an error message.
 * If the token is missing, a 401 status is sent with an error message.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void}
 */
export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401).json({ message: 'Unauthorized Access' });

    jwt.verify(token, window.process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({ message: 'Forbidden Access' });
        req.user = user;
        next();
    })
}

