import { Request, Response } from 'express';
import { getAllAdmins, createAdmin, getAdminById, updateAdmin, deleteAdmin } from '../services/adminService';

export const getAllAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdmins();
    res.status(200).json({ success: true, data : admins });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving admins' });
  }
};

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const { name, surname, birthday, username, password} = req.body;
    const newAdmin = await createAdmin({ name, surname, birthday, username, password });
    res.status(201).json({ success: true, data : newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating admin' });
  }
};

export const getAdminByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data : admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving admin' });
  }
};

export const updateAdminController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAdmin = await updateAdmin(id, updatedData);
    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data : updatedAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating admin' });
  }
};

export const deleteAdminController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await deleteAdmin(id);
    if (!deletedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data : deletedAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting admin' });
  }
};