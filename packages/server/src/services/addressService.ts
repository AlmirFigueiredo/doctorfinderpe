import Address from '../models/address';

export const getAllAddress = async () => {
  try {
    return await Address.findAll();
  } catch (error) {
    console.error('Error on retrieving addresss:', error);
    throw new Error('Error retrieving addresss');
  }
};

export const createAddress = async (addressData: { doctor_id: number; zip_code: string; local_number: string; street: string; neighborhood: string; complement: string }) => {
  try {
    return await Address.create(addressData);
  } catch (error) {
    console.error('Error on creating address:', error);
    throw new Error('Error creating address');
  }
};

export const getAddressById = async (addressId: number) => {
 try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      throw new Error('address not found');
    }
    return address;
  } catch (error) {
    console.error('Error retrieving address:', error);
    throw new Error('Error retrieving address');
  }
};

export const updateAddress = async (addressId: number, updatedData: { doctor_id?: number; zip_code?: string; local_number?: string; street?: string; neighborhood?: string; complement?: string }) => {
  try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      throw new Error('address not found');
    }
    return await address.update(updatedData);
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Error updating address');
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      throw new Error('address not found');
    }
    await address.destroy();
    return address;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Error deleting address');
  }
};