import { Request, Response } from 'express';
import { getAllDoctors } from '../services/doctorService';

//OBS: NAO EH EFICIENTE ROTA PARA PEGAR TODOS OS USUARIOS, APENAS EXEMPLO
export const getAllDoctorsController = async (req: Request, res: Response) => {
    try {
      const doctors = await getAllDoctors();
      res.status(200).json({ success: true, data: doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving doctors' });
    }
};
// outros métodos como createDoctor, getDoctorById, updateDoctor, deleteDoctor
