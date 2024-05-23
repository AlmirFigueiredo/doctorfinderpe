import Doctor from '../models/Doctor';

export const getAllDoctors = async () => {
  try {
    return await Doctor.findAll();
  } catch (error) {
    throw new Error('Error retrieving doctors');
  }
};
//Faz pra os outros ai...