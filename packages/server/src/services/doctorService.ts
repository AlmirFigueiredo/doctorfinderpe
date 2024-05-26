import Doctor from '../models/doctor';

export const getAllDoctors = async () => {
  try {
    return await Doctor.findAll();
  } catch (error) {
    throw new Error('Error retrieving doctors');
  }
};
//Faz pra os outros ai...