import Doctor from '../models/Doctor';

export const getAllDoctors = async () => {
    try {
        return await Doctor.findAll();
    } catch (error) {
        throw new Error('Error retrieving doctors');
    }
};

export const createDoctor = async (doctorData: { user_id: number; endereco: string; especialidade: string; aceita_dinheiro: boolean; aceita_plano: boolean }) => {
    try {
        return await Doctor.create(doctorData);
    } catch (error) {
        throw new Error('Error creating doctor');
    }
};

export const getdoctorById = async (medico_id: string) => {
    try {
        const doctor = await Doctor.findByPk(medico_id);
        if (!doctor) {
            throw new Error('doctor not found');
        }
        return doctor;
    } catch (error) {
        throw new Error('Error retrieving doctor');
    }
};

export const updatedoctor = async (medico_id: string, updatedData: { endereco?: string; especialidade?: string; aceita_dinheiro?: boolean; aceita_plano?: boolean }) => {
    try {
        const doctor = await Doctor.findByPk(medico_id);
        if (!doctor) {
            throw new Error('doctor not found');
        }
        return await doctor.update(updatedData);
    } catch (error) {
        throw new Error('Error updating doctor');
    }
};