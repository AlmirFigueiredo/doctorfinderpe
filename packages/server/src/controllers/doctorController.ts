import { Request, Response } from 'express';
import { 
  createDoctor, 
  getAllDoctors, 
  getDoctorById, 
  updateDoctor, 
  deleteDoctor 
} from '../services/doctorService';

export const getAllDoctorsController = async (_req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

export const createDoctorController = async (req: Request, res: Response) => {
  try {
    const { user_id, address_id ,crm, specialty, accept_money, accept_plan } = req.body;

    if (!user_id || !address_id|| !crm || !specialty || accept_money === undefined || accept_plan === undefined ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newDoctor = await createDoctor({ user_id, address_id ,crm, specialty ,accept_money, accept_plan });
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Failed to create doctor' });
  }
};

export const getDoctorByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await getDoctorById(Number(id));
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
};

export const updateDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, address_id ,crm, specialty, accept_money, accept_plan } = req.body;
    const updatedDoctor = await updateDoctor(Number(id), { user_id, address_id ,crm, specialty, accept_money, accept_plan });
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
} catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'Failed to update doctor' });
}
};

export const deleteDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await deleteDoctor(Number(id));
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(204).send();
} catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Failed to delete doctor' });
}
};