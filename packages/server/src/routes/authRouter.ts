import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../config/authMiddleware';

const router = Router();
const secretKey = 'muitosecreto'; 

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Account does not exist!' });
        }

        const passwordMatch = password === user.password;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                username: user.username,
                name: user.name,
                role: user.role,
            },
            secretKey,
            { expiresIn: '2h' }
        );

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Unknown internal server error' });
        }
    }
});

export default router;
