import Doctor from '../models/Doctor';
import Address from '../models/address';
import Appointment from '../models/appointment';

export const getAllDoctors = async () => {
    return Doctor.findAll({
        include: [{
            model: Address,
            as: 'addresses',
            attributes: ['address_id', 'local_phone', 'zip_code', 'city', 'street_number', 'street', 'neighborhood', 'complement']
        }]
    });
}

export const createDoctor = async (doctorData: { user_id: number; crm: string; specialty: string; accept_money: boolean; accept_plan: boolean }) => {
    try {
        return await Doctor.create(doctorData);
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw new Error('Error creating doctor');
    }
};

export const getDoctorById = async (doctorId: number) => {
    try {
        const doctor = await Doctor.findByPk(doctorId, {
            include: [{
                model: Address,
                as: 'addresses'
            }]
        });
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        return doctor;
    } catch (error) {
        if (error instanceof Error && error.message === 'Doctor not found') {
            throw error;
        }
        throw new Error('Error retrieving doctor');
    }
};

export const updateDoctor = async (doctorId: number, updatedData: { user_id?: number; crm?: string; specialty?: string; accept_money?: boolean; accept_plan?: boolean }) => {
    try {
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        return await doctor.update(updatedData);
    } catch (error) {
        if (error instanceof Error && error.message === 'Doctor not found') {
            throw error;
        }
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
        if (error instanceof Error && error.message === 'Doctor not found') {
            throw error;
        }
        throw new Error('Error deleting doctor');
    }
};



export const getDoctorsByCity = async (city: string) => {

    try {
        const doctors = await Doctor.findAll({
            include: [{
                model: Address,
                as: 'addresses',
                where: { city },
                attributes: ['address_id', 'local_phone', 'zip_code', 'city', 'street_number', 'street', 'neighborhood', 'complement']
            }]
        })

        if (!doctors) {
            throw new Error('Doctors not found!')
        }

        return doctors
    } catch (error) {
        throw new Error('Error when search doctors by city')
    }
}

export const getDoctorAppointments = async (doctorId: number) => {
    try {
        const appointments = await Appointment.findAll({
            where: {
                doctor_id: doctorId
            }
        });

        if (!appointments || appointments.length === 0) {
            throw new Error('Nenhum appointment encontrado para este doutor');
        }

        return appointments;
    } catch (error) {
        console.error('Erro ao obter appointments do doutor:', error);
        throw error;
    }
};