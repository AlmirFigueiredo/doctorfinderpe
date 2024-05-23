import Patient from '../models/Patient';

export const getAllPatients = async () => {
  try {
    return await Patient.findAll();
  } catch (error) {
    throw new Error('Error retrieving patients');
  }
};
// Faz os outros ai...
