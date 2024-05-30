import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createFeedback,
    getAllFeedbacks
} from '../../../src/services/feedbackService';

jest.mock('../../../src/services/feedbackService', () => ({
    createFeedback: jest.fn(),
    getAllFeedbacks: jest.fn(),
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
                { id: 1, doctor_id: 1, patient_id: 1, comment: 'Great doctor', data: '2024-06-01' },
                { id: 2, doctor_id: 2, patient_id: 2, comment: 'Not satisfied', data: '2024-06-02' },
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
                .send({ doctor_id: 1, patient_id: 1, comment: 'Great doctor', data: '2024-06-01' });

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
                .send({ doctor_id: 1, patient_id: 1, comment: 'Great doctor', data: '2024-06-01' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create feedback' });
        });
    });
});