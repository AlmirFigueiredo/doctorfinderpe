import Doctor from '../models/Doctor';
import User from '../models/User';
import Address from '../models/address';
import Appointment from '../models/appointment';

export const getAllDoctors = async () => {
    return Doctor.findAll({
        include: [{
            model: Address,
            as: 'addresses',
            attributes: ['address_id', 'local_phone', 'zip_code', 'city', 'street_number', 'street', 'neighborhood', 'complement']
        }, {
            model: User,
            attributes: ['name', 'picture'],
        }]
    });
}

export const createDoctor = async (doctorData: { user_id: number; crm: string; specialty: string; accept_money: boolean; accept_plan: boolean, description: string }) => {
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
            },
            {
                model: User,
                as: 'User',
                attributes: ['name', 'picture']
            }
            ]
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

export const updateDoctor = async (doctorId: number, updatedData: { user_id?: number; username?: string; name?: string; crm?: string; specialty?: string; accept_money?: boolean; accept_plan?: boolean; description?: string }) => {
    try {
        const { user_id, username, name } = updatedData;

        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        // Atualizar os dados do médico
        await doctor.update({
            crm: updatedData.crm,
            specialty: updatedData.specialty,
            accept_money: updatedData.accept_money,
            accept_plan: updatedData.accept_plan,
            description: updatedData.description,
        });

        // Se houver dados de usuário para atualizar
        if (user_id || username || name) {
            // Verificar se o médico está associado a um usuário
            const associatedUser = await User.findByPk(doctor.user_id);
            if (!associatedUser) {
                throw new Error('Associated user not found');
            }

            // Atualizar os dados do usuário
            await associatedUser.update({
                username: updatedData.username || associatedUser.username,
                name: updatedData.name || associatedUser.name,
            });
        }

        return doctor;
    } catch (error) {
        if (error instanceof Error && (error.message === 'Doctor not found' || error.message === 'Associated user not found')) {
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
            include: [
                {
                    model: Address,
                    as: 'addresses',
                    where: { city }, // Filtro por cidade
                    attributes: ['address_id', 'local_phone', 'zip_code', 'city', 'street_number', 'street', 'neighborhood', 'complement']
                },
                {
                    model: User,
                    as: 'User',
                    attributes: ['name', 'picture']
                }
            ],
            attributes: ['doctor_id', 'user_id', 'crm', 'specialty', 'accept_money', 'accept_plan', 'description', 'createdAt', 'updatedAt']
        });

        if (!doctors || doctors.length === 0) {
            return null;
        }

        return doctors;
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