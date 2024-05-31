import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers['authorization'];

if (!authHeader) {
    return res.status(401).json({ message: 'Access denied' });
}

const token = authHeader.split(' ')[1];

if (!token) {
    return res.status(401).json({ message: 'Access denied' });
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
} catch (error) {
    res.status(400).json({ message: 'Invalid token' });
}
};

export default authMiddleware;
