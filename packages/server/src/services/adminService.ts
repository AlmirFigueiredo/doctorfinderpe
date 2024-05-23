import Admin from '../models/Admin';

export const getAllAdmins = async () => {
  try {
    return await Admin.findAll();
  } catch (error) {
    throw new Error('Error retrieving admins');
  }
};
//Faz o resto ai boy...