import Admin from '../models/Admin';

export const getAllAdmins = async () => {
  try {
    return await Admin.findAll();
  } catch (error) {
    console.error('Error on retrieving admins:', error);
    throw new Error('Error retrieving admins');
  }
};

export const createAdmin = async (adminData: { user_id: number; role: string }) => {
  try {
    return await Admin.create(adminData);
  } catch (error) {
    throw new Error('Error creating admin');
  }
};

export const getAdminById = async (adminId: string) => {
 try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new Error('Error retrieving admin');
  }
};

export const updateAdmin = async (adminId: string, updatedData: {  admin_id: number; user_id: number; role: string }) => {
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return await admin.update(updatedData);
  } catch (error) {
    throw new Error('Error updating admin');
  }
};

export const deleteAdmin = async (adminId: string) => {
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }
    await admin.destroy();
    return admin;
  } catch (error) {
    throw new Error('Error deleting admin');
  }
};