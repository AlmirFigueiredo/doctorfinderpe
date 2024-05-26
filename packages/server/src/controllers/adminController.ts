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
    const { admin_id, user_id, role } = req.body;

    if (!admin_id || !user_id || !role ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newAdmin = await Admin.create({ admin_id, user_id, role });
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
    const { admin_id, user_id, role } = req.body;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.admin_id = admin_id || admin.admin_id;
    admin.user_id = user_id || admin.user_id;
    admin.role = role || admin.role;

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