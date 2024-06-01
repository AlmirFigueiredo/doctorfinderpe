import Feedback from '../models/feedback';

export const getAllFeedbacks = async () => {
    try {
        return await Feedback.findAll();
    } catch (error) {
        console.error('Error retrieving feedbacks:', error);
        throw new Error('Error retrieving feedbacks');
    }
};

export const createFeedback = async (feedbackData: { doctor_id: number; patient_id: number; comment: string; data: string }) => {
    try {
        return await Feedback.create(feedbackData);
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw new Error('Error creating feedback');
    }
};

export const getFeedbackById = async (feedbackId: number) => {
    try {
        const feedback = await Feedback.findByPk(feedbackId);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return feedback;
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        throw new Error('Error retrieving feedback');
    }
};

export const updateFeedback = async (feedbackId: number, updatedData: { doctor_id?: number; patient_id?: number; comment?: string; data?: string }) => {
    try {
        const feedback = await Feedback.findByPk(feedbackId);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return await feedback.update(updatedData);
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw new Error('Error updating feedback');
    }
};

export const deleteFeedback = async (feedbackId: number) => {
    try {
        const feedback = await Feedback.findByPk(feedbackId);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        await feedback.destroy();
        return feedback;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw new Error('Error deleting feedback');
    }
};