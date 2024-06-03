import { Request, Response } from 'express';
import { 
  createPatient, 
  getAllPatients, 
  getPatientById, 
  updatePatient, 
  deletePatient, 
  getPatientAppointments
} from '../services/patientService';
import Appointment from '../models/appointment';

export const getAllPatientsController = async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

export const createPatientController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const newPatient = await createPatient({ user_id });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

export const getPatientByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(Number(id));
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

export const updatePatientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const updatedPatient = await updatePatient(Number(id), { user_id });
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

export const deletePatientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPatient = await deletePatient(Number(id));
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};


export const getPatientAppointmentsController = async (req: Request, res: Response)  => {
  try {
      const { id } = req.params;

      const patientAppointments = await getPatientAppointments(Number(id))

      if (!patientAppointments) {
          throw new Error('Paciente não encontrado');
      }

      // Retorna as consultas associadas ao paciente
      res.status(201).send(patientAppointments)
  } catch (error) {
      console.error('Erro ao obter consultas do paciente:', error);
      throw error;
  }
}