import { Request, Response } from 'express';
import { 
  createAvailability, 
  getAllAvailabilities, 
  getAvailabilityById, 
  updateAvailability, 
  deleteAvailability 
} from '../services/availabilityService';

export const getAllAvailabilitiesController = async (_req: Request, res: Response) => {
  try {
    const availabilities = await getAllAvailabilities();
    res.status(200).json(availabilities);
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({ error: 'Failed to fetch availabilities' });
  }
};

export const createAvailabilityController = async (req: Request, res: Response) => {
  try {
    const { doctor_id, day, start_time, end_time } = req.body;

    if (!doctor_id || !day || !start_time || !end_time) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newAvailability = await createAvailability({ doctor_id, day, start_time, end_time });
    res.status(201).json(newAvailability);
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({ error: 'Failed to create availability' });
  }
};

export const getAvailabilityByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availability = await getAvailabilityById(Number(id));
    if (!availability) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
};

export const updateAvailabilityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctor_id, day, start_time, end_time } = req.body;
    const updatedAvailability = await updateAvailability(Number(id), { doctor_id, day, start_time, end_time });
    if (!updatedAvailability) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};

export const deleteAvailabilityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAvaliability = await deleteAvailability(Number(id));
    if (!deletedAvaliability) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ error: 'Failed to delete availability' });
  }
};