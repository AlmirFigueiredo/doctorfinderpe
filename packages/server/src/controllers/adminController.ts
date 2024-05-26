import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const getAllAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const { name, surname, birthday, username, password } = req.body;

    if (!name || !surname || !birthday || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newAdmin = await Admin.create({ name, surname, birthday, username, password });
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

export const getAdminByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

export const updateAdminController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, surname, birthday, username, password } = req.body;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.name = name || admin.name;
    admin.surname = surname || admin.surname;
    admin.birthday = birthday || admin.birthday;
    admin.username = username || admin.username;
    admin.password = password || admin.password;

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
};

export const deleteAdminController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};