import { Request, Response } from 'express';
import { 
  createFeedback, 
  getAllFeedbacks, 
  getFeedbackById, 
  updateFeedback, 
  deleteFeedback 
} from '../services/feedbackService';

export const getAllFeedbacksController = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

export const createFeedbackController = async (req: Request, res: Response) => {
  try {
    const { doctor_id, patient_id, comment, data } = req.body;

    if (!doctor_id || !patient_id || !comment || !data) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newFeedback = await createFeedback({ doctor_id, patient_id, comment, data });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

export const getFeedbackByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await getFeedbackById(Number(id));
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

export const updateFeedbackController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctor_id, patient_id, comment, data } = req.body;
    const updatedFeedback = await updateFeedback(Number(id), { doctor_id, patient_id, comment, data });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

export const deleteFeedbackController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteFeedback(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};