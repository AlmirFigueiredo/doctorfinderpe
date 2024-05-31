import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { createUser } from '../services/userService';
import { createPatient } from '../services/patientService';

export const registerController = async (req: Request, res: Response) => {
const { name, email, password, role } = req.body;

if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
}

if (role === "Doctor" && !req.body.crm) {
    return res.status(400).json({ error: 'CRM is required for doctors' });
}

try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword, role });

    if (role === "Patient") {
    await createPatient({ user_id: newUser.user_id });
    }

    res.status(201).json(newUser);
} catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
}
};

export const loginController = async (req: Request, res: Response) => {
const { email, password } = req.body;

if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
}

try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ token });
} catch (error) {
    res.status(500).json({ error: 'Error logging in' });
}
};
