import { createFeedback, getAllFeedbacks, getFeedbackById, updateFeedback, deleteFeedback } from '../../../src/services/feedbackService';
import Feedback from '../../../src/models/feedback';

jest.mock('../../../src/models/feedback');

describe('Feedback Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllFeedbacks', () => {
        it('should return all feedbacks', async () => {
            const feedbacks = [
                { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01' },
                { id: 2, doctor_id: 2, patient_id: 2, comment: 'Very satisfied', data: '2024-06-02' },
            ];
            (Feedback.findAll as jest.Mock).mockResolvedValue(feedbacks);

            const result = await getAllFeedbacks();

            expect(result).toEqual(feedbacks);
            expect(Feedback.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Feedback.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch feedbacks'));

            await expect(getAllFeedbacks()).rejects.toThrow('Error retrieving feedbacks');
        });
    });

    describe('createFeedback', () => {
        it('should create a new feedback', async () => {
            const feedbackData = { doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01' };
            const newFeedback = { id: 1, ...feedbackData };
            (Feedback.create as jest.Mock).mockResolvedValue(newFeedback);

            const result = await createFeedback(feedbackData);

            expect(result).toEqual(newFeedback);
            expect(Feedback.create).toHaveBeenCalledWith(feedbackData);
        });

        it('should throw an error if creation fails', async () => {
            const feedbackData = { doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01' };
            (Feedback.create as jest.Mock).mockRejectedValue(new Error('Failed to create feedback'));

            await expect(createFeedback(feedbackData)).rejects.toThrow('Error creating feedback');
        });
    });

    describe('getFeedbackById', () => {
        it('should return a feedback by id', async () => {
            const feedback = { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01' };
            (Feedback.findByPk as jest.Mock).mockResolvedValue(feedback);

            const result = await getFeedbackById(1);

            expect(result).toEqual(feedback);
            expect(Feedback.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if feedback not found', async () => {
            (Feedback.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getFeedbackById(999)).rejects.toThrow('Feedback not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Feedback.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch feedback'));

            await expect(getFeedbackById(1)).rejects.toThrow('Error retrieving feedback');
        });
    });

    describe('updateFeedback', () => {
        it('should update a feedback', async () => {
            const feedback = { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01', update: jest.fn().mockResolvedValue({ id: 1, doctor_id: 1, patient_id: 1, comment: 'Updated comment', data: '2024-06-01' }) };
            (Feedback.findByPk as jest.Mock).mockResolvedValue(feedback);

            const updatedData = { comment: 'Updated comment' };

            const result = await updateFeedback(1, updatedData);

            expect(result).toEqual({ id: 1, doctor_id: 1, patient_id: 1, comment: 'Updated comment', data: '2024-06-01' });
            expect(feedback.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if feedback not found', async () => {
            (Feedback.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateFeedback(999, { comment: 'Updated comment' })).rejects.toThrow('Feedback not found');
        });

        it('should throw an error if updating fails', async () => {
            const feedback = { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01', update: jest.fn().mockRejectedValue(new Error('Failed to update feedback')) };
            (Feedback.findByPk as jest.Mock).mockResolvedValue(feedback);

            await expect(updateFeedback(1, { comment: 'Updated comment' })).rejects.toThrow('Error updating feedback');
        });
    });

    describe('deleteFeedback', () => {
        it('should delete a feedback', async () => {
            const feedback = { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great service', data: '2024-06-01', destroy: jest.fn().mockResolvedValue(null) };
            (Feedback.findByPk as jest.Mock).mockResolvedValue(feedback);

            const result = await deleteFeedback(1);

            expect(result).toEqual(feedback);
            expect(feedback.destroy).toHaveBeenCalled();
        });

        it('should throw an error if feedback not found', async () => {
            (Feedback.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteFeedback(999)).rejects.toThrow('Feedback not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Feedback.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete feedback'));

            await expect(deleteFeedback(1)).rejects.toThrow('Error deleting feedback');
        });
    });
});
