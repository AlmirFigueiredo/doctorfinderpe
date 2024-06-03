import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} from '../../../src/services/doctorService';

jest.mock('../../../src/services/doctorService', () => ({
    createDoctor: jest.fn(),
    getAllDoctors: jest.fn(),
    getDoctorById: jest.fn(),
    updateDoctor: jest.fn(),
    deleteDoctor: jest.fn()
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
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all doctors', async () => {
            const doctors = [
                { doctor_id: 1, user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false },
                { doctor_id: 2, user_id: 2, address_id: '456 Avenue', specialty: 'Dermatology', accept_money: false, accept_plan: true },
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
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new doctor', async () => {
            const newDoctor = { doctor_id: 1, user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false };
            (createDoctor as jest.Mock).mockResolvedValue(newDoctor);

            const response = await request(app)
                .post('/doctors')
                .send({ user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false });

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
                .send({ user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create doctor' });
        });
    });
    describe('getDoctorByIdController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return a doctor by doctor_id', async () => {
            const doctor = { doctor_id: 1, user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false };
            (getDoctorById as jest.Mock).mockResolvedValue(doctor);

            const response = await request(app).get('/doctors/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(doctor);
        });

        it('should handle not found doctor', async () => {
            (getDoctorById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/doctors/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Doctor not found' });
        });

        it('should handle errors', async () => {
            (getDoctorById as jest.Mock).mockRejectedValue(new Error('Failed to fetch doctor'));

            const response = await request(app).get('/doctors/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch doctor' });
        });
    });
    describe('updateDoctorController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should update a doctor', async () => {
            const updatedDoctor = { doctor_id: 1, user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: true };
            (updateDoctor as jest.Mock).mockResolvedValue(updatedDoctor);

            const response = await request(app)
                .put('/doctors/1')
                .send({ address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: true });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedDoctor);
        });

        it('should handle not found doctor', async () => {
            (updateDoctor as jest.Mock).mockResolvedValue(null);

            const response = await request(app)
                .put('/doctors/999')
                .send({ address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: true });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Doctor not found' });
        });

        it('should handle errors', async () => {
            (updateDoctor as jest.Mock).mockRejectedValue(new Error('Failed to update doctor'));

            const response = await request(app)
                .put('/doctors/1')
                .send({ address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: true });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update doctor' });
        });
    });
    describe('deleteDoctorController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should delete a doctor', async () => {
            (deleteDoctor as jest.Mock).mockResolvedValue({ doctor_id: 1, user_id: 1, address_id: '123 Street', crm: '12345', specialty: 'Cardiology', accept_money: true, accept_plan: false });

            const response = await request(app).delete('/doctors/1');

            expect(response.status).toBe(204);
        });

        it('should handle not found doctor', async () => {
            (deleteDoctor as jest.Mock).mockResolvedValue(null);

            const response = await request(app).delete('/doctors/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Doctor not found' });
        });

        it('should handle errors', async () => {
            (deleteDoctor as jest.Mock).mockRejectedValue(new Error('Failed to delete doctor'));

            const response = await request(app).delete('/doctors/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete doctor' });
        });
    });
});
