import { Request, Response } from 'express';
import { createDoctor, getAllDoctors, getdoctorById, updatedoctor } from '../services/doctorService';

export const getAllDoctorsController = async (req: Request, res: Response) => {
    try {
        const doctors = await getAllDoctors();
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving doctors' });
    }
};

export const createDoctorController = async (req: Request, res: Response) => {
    try {
        const { user_id, endereco, especialidade, aceita_dinheiro, aceita_plano } = req.body;
        const newDoctor = await createDoctor({ user_id, endereco, especialidade, aceita_dinheiro, aceita_plano });
        res.status(201).json({ success: true, data: newDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating Doctor' });
    }
};

export const getdoctorByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doctor = await getdoctorById(id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving doctor' });
    }
};

export const updatedoctorController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updateddoctor = await updatedoctor(id, updatedData);
        if (!updateddoctor) {
            return res.status(404).json({ success: false, message: 'doctor not found' });
        }
        res.status(200).json({ success: true, data: updateddoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating doctor' });
    }
};