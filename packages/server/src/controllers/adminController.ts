import { Request, Response } from 'express';
import { getAllAdmins } from '../services/adminService';

//OBS: NAO EH EFICIENTE ROTA PARA PEGAR TODOS OS USUARIOS, APENAS EXEMPLO
export const getAllAdminsController = async (req: Request, res: Response) => {
    try {
      const admins = await getAllAdmins();
      res.status(200).json({ success: true, data: admins });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving admins' });
    }
  };
// outros métodos como createAdmin, getAdminById, updateAdmin, deleteAdmin
