import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import { 
    createAvailability, 
    getAllAvailabilities,
} from '../../../src/services/availabilityService';

jest.mock('../../../src/services/availabilityService', () => ({
    createAvailability: jest.fn(),
    getAllAvailabilities: jest.fn(),
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

describe('Availability Controllers', () => {
    describe('getAllAvailabilitiesController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all availabilities', async () => {
            const availabilities = [
                { id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' },
                { id: 2, doctor_id: 2, day: 'Tuesday', start_time: '10:00', end_time: '18:00' },
            ];
            (getAllAvailabilities as jest.Mock).mockResolvedValue(availabilities);

            const response = await request(app).get('/availabilities');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(availabilities);
        });

        it('should handle errors', async () => {
            (getAllAvailabilities as jest.Mock).mockRejectedValue(new Error('Failed to fetch availabilities'));

            const response = await request(app).get('/availabilities');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch availabilities' });
        });
    });

    describe('createAvailabilityController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new availability', async () => {
            const newAvailability = { id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' };
            (createAvailability as jest.Mock).mockResolvedValue(newAvailability);

            const response = await request(app)
                .post('/availabilities')
                .send({ doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newAvailability);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/availabilities')
                .send({ doctor_id: 1 });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });

        it('should handle errors', async () => {
            (createAvailability as jest.Mock).mockRejectedValue(new Error('Failed to create availability'));

            const response = await request(app)
                .post('/availabilities')
                .send({ doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create availability' });
        });
    });
});
