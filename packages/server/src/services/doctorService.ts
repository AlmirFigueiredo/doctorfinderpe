import Doctor from '../models/Doctor';
import Address from '../models/address';

export const getAllDoctors = async () => {
    return Doctor.findAll({
        include: [{
            model: Address,
            as: 'addresses',
            attributes: ['address_id', 'local_phone', 'zip_code', 'city', 'street_number', 'street', 'neighborhood', 'complement'] 
        }]
    });
}

export const createDoctor = async (doctorData: { user_id: number;  crm: string; specialty: string; accept_money: boolean; accept_plan: boolean }) => {
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
      console.error('Error retrieving doctor:', error);
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