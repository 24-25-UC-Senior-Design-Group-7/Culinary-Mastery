import express from 'express';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/authMiddleware.js';


dotenv.config();
import { findUserById } from '../db/operations.js';
var router = express.Router();

// GET user by ID
// Route to get the current user's information
router.get('/current-user', async (req, res) => {
    try {
        // `req.user` should have been set by the `authenticateToken` middleware
        const user = await findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: { id: user.id, name: user.username, email: user.email } });
    } catch (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ message: 'Failed to fetch user information' });
    }
});



export default router;
