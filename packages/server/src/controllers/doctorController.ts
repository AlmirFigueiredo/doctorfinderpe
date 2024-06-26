import { Request, Response } from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsByCity,
  getDoctorAppointments
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
    const { user_id, crm, specialty, accept_money, accept_plan, description } = req.body;

    if (!user_id || !crm || !specialty || accept_money === undefined || accept_plan === undefined || description === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newDoctor = await createDoctor({ user_id, crm, specialty, accept_money, accept_plan, description });
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
    const { username, name ,crm, specialty, accept_money, accept_plan, description } = req.body;
    const updatedDoctor = await updateDoctor(Number(id), { username, name ,crm, specialty, accept_money, accept_plan, description });
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


export const getDoctorsByCityController = async (req: Request, res: Response) => {

  try {
    const { city } = req.params;
    const doctors = await getDoctorsByCity(city)

    if(!doctors) {
      return res.status(404).json({ error: 'Doctors not found' });
    }
    return res.status(201).send(doctors)
  } catch (error) {
    res.status(500).json({ error: 'Failed to search doctors by city' });
  }
}

export const getDoctorAppointmentsController = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const patientAppointments = await getDoctorAppointments(Number(id));

      if (!patientAppointments) {
          return res.status(404).json({ message: 'Doctor não encontrado' });
      }

      return res.json(patientAppointments);
  } catch (error) {
      console.error('Erro ao obter consultas do doutor:', error);
      return res.status(500).json({ message: 'Erro ao obter consultas do doutor' });
  }
};