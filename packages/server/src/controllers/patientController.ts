import { Request, Response } from 'express';
import { getAllPatients } from '../services/patientService';

//OBS: NAO EH EFICIENTE ROTA PARA PEGAR TODOS OS USUARIOS, APENAS EXEMPLO
export const getAllPatientsController = async (req: Request, res: Response) => {
    try {
      const patients = await getAllPatients();
      res.status(200).json({ success: true, data: patients });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving patients' });
    }
};
// outros métodos como createPatient, getPatientById, updatePatient, deletePatient
