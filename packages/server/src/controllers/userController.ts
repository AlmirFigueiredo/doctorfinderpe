import { Request, Response } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
    getPatientWithUserId,
} from '../services/userService';
import { createPatient} from '../services/patientService';
import { createDoctor } from '../services/doctorService';
import { login } from '../services/userService'

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};

export const getAllUsersController = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Controlador para criar um novo usuário
export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password, role, address_id, crm, specialty, accept_money, accept_plan, rg, cpf, plan, description } = req.body;

        if (!name || !username || !email || !password || !role || !rg || !cpf) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (role === "Doctor" && !crm) {
            return res.status(400).json({ error: 'CRM is required for doctors' });
        }

        const newUser = await createUser({ name, username, email, password, role, rg, cpf });

        if (role === "Doctor") {
            await createDoctor({
                user_id: newUser.user_id,
                crm: crm,
                specialty: specialty,
                accept_money: accept_money,
                accept_plan: accept_plan,
                description: description
            });
        }
        if (role === "Patient") {
            await createPatient({ user_id: newUser.user_id, plan: plan})
        }
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Controlador para obter um usuário por ID
export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Controlador para atualizar um usuário
export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, username, picture, email, password, role } = req.body;
        const updatedUser = await updateUser(Number(id), { name, username, picture, email, password, role });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Controlador para deletar um usuário
export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(Number(id));
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};


export const getUserByUsernameController = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        const user = await getUserByUsername(username)
        
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).send(user)
    } catch (error) {
        console.error('Error when fetch user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const getPatientWithUserIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await getPatientWithUserId(Number(id))
        
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).send(user)
    } catch (error) {
        console.error('Error when fetch user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};