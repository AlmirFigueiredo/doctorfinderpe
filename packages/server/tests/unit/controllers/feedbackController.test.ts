import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    deleteFeedback,
    updateFeedback
} from '../../../src/services/feedbackService';

jest.mock('../../../src/services/feedbackService', () => ({
    createFeedback: jest.fn(),
    getAllFeedbacks: jest.fn(),
    getFeedbackById: jest.fn(),
    deleteFeedback: jest.fn(),
    updateFeedback: jest.fn()
}));

beforeAll(async () => {
    sequelize.authenticate = jest.fn().mockResolvedValue(undefined);
    sequelize.sync = jest.fn().mockResolvedValue(undefined);

    await sequelize.authenticate();
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
    jest.clearAllMocks();
});

describe('Feedback Controllers', () => {
    describe('getAllFeedbacksController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all feedbacks', async () => {
            const feedbacks = [
                { id: 1, doctor_id: 1, patient_id: 1, score: 5, comment: 'Great doctor', data: '2024-06-01' },
                { id: 2, doctor_id: 2, patient_id: 2, score: 4, comment: 'Not satisfied', data: '2024-06-02' },
            ];
            (getAllFeedbacks as jest.Mock).mockResolvedValue(feedbacks);

            const response = await request(app).get('/feedbacks');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(feedbacks);
        });

        it('should handle errors', async () => {
            (getAllFeedbacks as jest.Mock).mockRejectedValue(new Error('Failed to fetch feedbacks'));

            const response = await request(app).get('/feedbacks');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch feedbacks' });
        });
    });

    describe('createFeedbackController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new feedback', async () => {
            const newFeedback = { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great doctor', data: '2024-06-01' };
            (createFeedback as jest.Mock).mockResolvedValue(newFeedback);

            const response = await request(app)
                .post('/feedbacks')
                .send({ doctor_id: 1, patient_id: 1, score: 5,comment: 'Great doctor', data: '2024-06-01' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newFeedback);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/feedbacks')
                .send({ doctor_id: 1 });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });

        it('should handle errors', async () => {
            (createFeedback as jest.Mock).mockRejectedValue(new Error('Failed to create feedback'));

            const response = await request(app)
                .post('/feedbacks')
                .send({ doctor_id: 1, patient_id: 1, score: 5, comment: 'Great doctor', data: '2024-06-01' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create feedback' });
        });
    });
    describe('getFeedbackByIdController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return a feedback by id', async () => {
            const feedback = { id: 1, doctor_id: 1, patient_id: 1, score: 5, comment: 'Great doctor', data: '2024-06-01' };
            (getFeedbackById as jest.Mock).mockResolvedValue(feedback);

            const response = await request(app).get('/feedbacks/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(feedback);
        });

        it('should handle not found feedback', async () => {
            (getFeedbackById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/feedbacks/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Feedback not found' });
        });

        it('should handle errors', async () => {
            (getFeedbackById as jest.Mock).mockRejectedValue(new Error('Failed to fetch feedback'));

            const response = await request(app).get('/feedbacks/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch feedback' });
        });
    });
    describe('updateFeedbackController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should update a feedback', async () => {
            const updatedFeedback = { id: 1, doctor_id: 1, patient_id: 1, score: 4, comment: 'Good doctor', data: '2024-06-01' };
            (updateFeedback as jest.Mock).mockResolvedValue(updatedFeedback);

            const response = await request(app)
                .put('/feedbacks/1')
                .send({ doctor_id: 1, patient_id: 1, score: 4, comment: 'Good doctor', data: '2024-06-01' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedFeedback);
        });

        it('should handle not found feedback', async () => {
            (updateFeedback as jest.Mock).mockResolvedValue(null);

            const response = await request(app)
                .put('/feedbacks/999')
                .send({ doctor_id: 1, patient_id: 1, score: 4, comment: 'Good doctor', data: '2024-06-01' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Feedback not found' });
        });

        it('should handle errors', async () => {
            (updateFeedback as jest.Mock).mockRejectedValue(new Error('Failed to update feedback'));

            const response = await request(app)
                .put('/feedbacks/1')
                .send({ doctor_id: 1, patient_id: 1, score: 4, comment: 'Good doctor', data: '2024-06-01' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update feedback' });
        });
    });

    describe('deleteFeedbackController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should delete a feedback', async () => {
            (deleteFeedback as jest.Mock).mockResolvedValue({ id: 1, doctor_id: 1, patient_id: 1, score: 4, comment: 'Great doctor', data: '2024-06-01' });

            const response = await request(app).delete('/feedbacks/1');

            expect(response.status).toBe(204);
        });

        it('should handle not found feedback', async () => {
            (deleteFeedback as jest.Mock).mockResolvedValue(null);

            const response = await request(app).delete('/feedbacks/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Feedback not found' });
        });

        it('should handle errors', async () => {
            (deleteFeedback as jest.Mock).mockRejectedValue(new Error('Failed to delete feedback'));

            const response = await request(app).delete('/feedbacks/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete feedback' });
        });
    });
});