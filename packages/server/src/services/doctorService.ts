import Doctor from '../models/Doctor';

export const getAllDoctors = async () => {
    try {
        return await Doctor.findAll();
    } catch (error) {
        console.error('Error on retrieving doctors:', error);
        throw new Error('Error retrieving doctors');
    }
};

export const createDoctor = async (doctorData: { user_id: number;  address : string; crm: string; specialty: string; accept_money: boolean; accept_plan: boolean }) => {
    try {
        return await Doctor.create(doctorData);
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw new Error('Error creating doctor');
    }
};

export const getDoctorById = async (doctorId: number) => {
    try {
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        return doctor;
    } catch (error) {
        console.error('Error retrieving doctor:', error);
        throw new Error('Error retrieving doctor');
    }
};

export const updateDoctor = async (doctorId: number, updatedData: { user_id?: number; address?: string; crm?: string; specialty?: string; accept_money?: boolean; accept_plan?: boolean }) => {
    try {
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        return await doctor.update(updatedData);
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw new Error('Error updating doctor');
    }
};

export const deleteDoctor = async (doctorId: number) => {
    try {
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        await doctor.destroy();
        return doctor;
    } catch (error) {
        console.error('Error deleting doctor:', error);
        throw new Error('Error deleting doctor');
    }
};