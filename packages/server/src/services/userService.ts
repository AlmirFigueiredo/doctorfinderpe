import User from '../models/User';

export const getAllUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        console.error('Error on retrieving users:', error);
        throw new Error('Error retrieving users');
    }
};

export const createUser = async (userData: { name: string; username: string; email: string; password: string; role: string }) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

export const getUserById = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
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

export const updateUser = async (userId: number, updatedData: { name?: string;username?: string; picture?: string; email?: string; password?: string; role?: string }) => {
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