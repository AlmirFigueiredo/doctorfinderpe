import { Request, Response } from 'express';
import { 
  createAppointment, 
  getAllAppointments, 
  getAppointmentById, 
  updateAppointment, 
  deleteAppointment 
} from '../services/appointmentService';

export const getAllAppointmentsController = async (_req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

export const createAppointmentController = async (req: Request, res: Response) => {
  try {
    const { doctor_id, patient_id, data, hour, status } = req.body;

    if (!doctor_id || !patient_id || !data || !hour || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newAppointment = await createAppointment({ doctor_id, patient_id, data, hour, status });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

export const getAppointmentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(Number(id));
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

export const updateAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctor_id, patient_id, data, hour, status } = req.body;
    const updatedAppointment = await updateAppointment(Number(id), { doctor_id, patient_id, data, hour, status });
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

export const deleteAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await deleteAppointment(Number(id));
    
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};