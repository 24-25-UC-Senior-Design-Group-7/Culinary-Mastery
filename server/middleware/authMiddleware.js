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
    const token = req.cookies.accessToken;
    console.log(req.cookies);
    console.log('acess token');
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access - No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden Access - Token is invalid' });
        }

        req.user = decoded; // Assuming your JWT stores user information in payload
        next();
    });
};


