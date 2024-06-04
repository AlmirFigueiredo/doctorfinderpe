import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import User from '../models/User';
import address from '../models/address';

export const getAllUsers = async () => {
    try {
        return await User.findAll({attributes: {exclude: ['password']} });
    } catch (error) {
        console.error('Error on retrieving users:', error);
        throw new Error('Error retrieving users');
    }
};

export const createUser = async (userData: { name: string; username: string; email: string; password: string; role: string; cpf: string; rg: string; }) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

export const getUserById = async (userId: number) => {
    try {
        const user = await User.findByPk(userId, {attributes: {exclude: ['password']} });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            throw error;
        }
        throw new Error('Error retrieving user');
    }
};

export const updateUser = async (userId: number, updatedData: { name?: string;username?: string; picture?: string; email?: string; password?: string; role?: string; rg?: string; cpf?: string; }) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
        }
        return await user.update(updatedData);
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            throw error;
        }
        throw new Error('Error updating user');
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return user;
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            throw error;
        }
        throw new Error('Error deleting user');
    }
};


export const getUserByUsername = async (username: string) => {
    try {
        const user = await User.findOne({
            where: { username },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new Error('User not found');
        }

        let result: any = {
            user_id: user.user_id,
            name: user.name,
            username: user.username,
            picture: user.picture,
            email: user.email,
            cpf: user.cpf,
            rg: user.rg,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        if (user.role === "Patient") {
            const patient = await Patient.findOne({
                where: { user_id: user.user_id }
            });

            if (!patient) {
                throw new Error('Patient not found');
            }

            result = {
                ...result,
                patient_id: patient.patient_id,
                plan: patient.plan,
            };
        } else if (user.role === "Doctor") {
            const doctor = await Doctor.findOne({
                where: { user_id: user.user_id }
            });

            if (!doctor) {
                throw new Error('Doctor not found');
            }

            const addresses = await address.findAll({
                where: { doctor_id: doctor.doctor_id }
            });

            const result = {
                user_id: user.user_id,
                name: user.name,
                username: user.username,
                picture: user.picture,
                email: user.email,
                cpf: user.cpf,
                rg: user.rg,
                role: user.role,
                doctor_id: doctor.doctor_id,
                crm: doctor.crm,
                specialty: doctor.specialty,
                accept_money: doctor.accept_money,
                accept_plan: doctor.accept_plan,
                description: doctor.description,
                addresses: addresses.map(address => ({
                    address_id: address.address_id,
                    local_phone: address.local_phone,
                    zip_code: address.zip_code,
                    city: address.city,
                    street_number: address.street_number,
                    street: address.street,
                    neighborhood: address.neighborhood,
                    complement: address.complement,
                })),
            };

            return result;
        }

        return result;
    } catch (error) {
        throw new Error(`Error retrieving user}`);
    }
};