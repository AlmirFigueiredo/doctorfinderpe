import { Request, Response } from 'express';
import {
  createAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../services/addressService";
import Doctor from "../models/Doctor";

export const getAllAddressController = async (_req: Request, res: Response) => {
  try {
    const address = await getAllAddress();
    res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};

export const createAddressController = async (req: Request, res: Response) => {
  try {
    const { doctor_id, zip_code, local_number, street, neighborhood, complement } = req.body;

    if (!doctor_id || !zip_code || !local_number || !street || !neighborhood || !complement) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newAddress = await createAddress({ doctor_id, zip_code, local_number, street, neighborhood, complement });
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating Address:', error);
    res.status(500).json({ error: 'Failed to create Address' });
  }
};

export const getAddressByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Address = await getAddressById(Number(id));
    if (!Address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.status(200).json(Address);
  } catch (error) {
    console.error('Error fetching Address:', error);
    res.status(500).json({ error: 'Failed to fetch Address' });
  }
};

export const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctor_id, zip_code, local_number, street, neighborhood, complement } = req.body;
    const updatedAddress = await updateAddress(Number(id), { doctor_id, zip_code, local_number, street, neighborhood, complement});
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error updating Address:', error);
    res.status(500).json({ error: 'Failed to update Address' });
  }
};

export const deleteAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteAddress(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting Address:', error);
    res.status(500).json({ error: 'Failed to delete Address' });
  }
};