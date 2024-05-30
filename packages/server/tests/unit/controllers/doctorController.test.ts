import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import { createDoctor, getAllDoctors } from '../../../src/services/doctorService';

jest.mock('../../../src/services/doctorService', () => ({
    createDoctor: jest.fn(),
    getAllDoctors: jest.fn(),
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

describe('Doctor Controllers', () => {
    describe('getAllDoctorsController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all doctors', async () => {
            const doctors = [
                { id: 1, user_id: 1, address: '123 Street', specialty: 'Cardiology', accept_money: true, accept_plan: false },
                { id: 2, user_id: 2, address: '456 Avenue', specialty: 'Dermatology', accept_money: false, accept_plan: true },
            ];
            (getAllDoctors as jest.Mock).mockResolvedValue(doctors);

            const response = await request(app).get('/doctors');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(doctors);
        });

        it('should handle errors', async () => {
            (getAllDoctors as jest.Mock).mockRejectedValue(new Error('Failed to fetch doctors'));

            const response = await request(app).get('/doctors');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch doctors' });
        });
    });

    describe('createDoctorController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new doctor', async () => {
            const newDoctor = { id: 1, user_id: 1, address: '123 Street', specialty: 'Cardiology', accept_money: true, accept_plan: false };
            (createDoctor as jest.Mock).mockResolvedValue(newDoctor);

            const response = await request(app)
                .post('/doctors')
                .send({ user_id: 1, address: '123 Street', specialty: 'Cardiology', accept_money: true, accept_plan: false });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newDoctor);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/doctors')
                .send({ user_id: 1 });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });

        it('should handle errors', async () => {
            (createDoctor as jest.Mock).mockRejectedValue(new Error('Failed to create doctor'));

            const response = await request(app)
                .post('/doctors')
                .send({ user_id: 1, address: '123 Street', specialty: 'Cardiology', accept_money: true, accept_plan: false });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create doctor' });
        });
    });
});
