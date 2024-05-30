import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
} from '../../../src/services/patientService';

jest.mock('../../../src/services/patientService', () => ({
    createPatient: jest.fn(),
    getAllPatients: jest.fn(),
    getPatientById: jest.fn(),
    updatePatient: jest.fn(),
    deletePatient: jest.fn(),
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

describe('Patient Controllers', () => {
    describe('getAllPatientsController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all patients', async () => {
            const patients = [
                { id: 1, user_id: 1 },
                { id: 2, user_id: 2 },
            ];
            (getAllPatients as jest.Mock).mockResolvedValue(patients);

            const response = await request(app).get('/patients');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(patients);
        });

        it('should handle errors', async () => {
            (getAllPatients as jest.Mock).mockRejectedValue(new Error('Failed to fetch patients'));

            const response = await request(app).get('/patients');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch patients' });
        });
    });

    describe('createPatientController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new patient', async () => {
            const newPatient = { id: 1, user_id: 1 };
            (createPatient as jest.Mock).mockResolvedValue(newPatient);

            const response = await request(app)
                .post('/patients')
                .send({ user_id: 1 });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newPatient);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/patients')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'User ID is required' });
        });

        it('should handle errors', async () => {
            (createPatient as jest.Mock).mockRejectedValue(new Error('Failed to create patient'));

            const response = await request(app)
                .post('/patients')
                .send({ user_id: 1 });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create patient' });
        });
    });

    describe('getPatientByIdController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return a patient by id', async () => {
            const patient = { id: 1, user_id: 1 };
            (getPatientById as jest.Mock).mockResolvedValue(patient);

            const response = await request(app).get('/patients/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(patient);
        });

        it('should handle not found patient', async () => {
            (getPatientById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/patients/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Patient not found' });
        });

        it('should handle errors', async () => {
            (getPatientById as jest.Mock).mockRejectedValue(new Error('Failed to fetch patient'));

            const response = await request(app).get('/patients/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch patient' });
        });
    });

    describe('updatePatientController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should update a patient', async () => {
            const updatedPatient = { id: 1, user_id: 1 };
            (updatePatient as jest.Mock).mockResolvedValue(updatedPatient);

            const response = await request(app)
                .put('/patients/1')
                .send({ user_id: 1 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedPatient);
        });

        it('should handle not found patient', async () => {
            (updatePatient as jest.Mock).mockResolvedValue(null);

            const response = await request(app)
                .put('/patients/999')
                .send({ user_id: 1 });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Patient not found' });
        });

        it('should handle errors', async () => {
            (updatePatient as jest.Mock).mockRejectedValue(new Error('Failed to update patient'));

            const response = await request(app)
                .put('/patients/1')
                .send({ user_id: 1 });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update patient' });
        });
    });

    describe('deletePatientController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should delete a patient', async () => {
            (deletePatient as jest.Mock).mockResolvedValue({ id: 1, user_id: 1 });

            const response = await request(app).delete('/patients/1');

            expect(response.status).toBe(204);
        });

        it('should handle not found patient', async () => {
            (deletePatient as jest.Mock).mockResolvedValue(null);

            const response = await request(app).delete('/patients/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Patient not found' });
        });

        it('should handle errors', async () => {
            (deletePatient as jest.Mock).mockRejectedValue(new Error('Failed to delete patient'));

            const response = await request(app).delete('/patients/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete patient' });
        });
    });
});
