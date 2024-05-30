import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import { 
    getAllAppointments,
    getAppointmentById

} from '../../../src/services/appointmentService';

jest.mock('../../../src/services/appointmentService', () => ({
    getAllAppointments: jest.fn(),
    getAppointmentById: jest.fn(),
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

describe('Appointment Controllers', () => {
    describe('getAllAppointmentsController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all appointments', async () => {
            const appointments = [
                { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled' },
                { id: 2, doctor_id: 2, patient_id: 2, data: '2024-06-02', hour: '11:00', status: 'completed' },
            ];
            (getAllAppointments as jest.Mock).mockResolvedValue(appointments);

            const response = await request(app).get('/appointments');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(appointments);
        });

        it('should handle errors', async () => {
            (getAllAppointments as jest.Mock).mockRejectedValue(new Error('Failed to fetch appointments'));

            const response = await request(app).get('/appointments');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch appointments' });
        });
    });
    describe('getAppointmentByIdController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return an appointment by id', async () => {
            const appointment = { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled' };
            (getAppointmentById as jest.Mock).mockResolvedValue(appointment);

            const response = await request(app).get('/appointments/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(appointment);
        });

        it('should handle not found appointment', async () => {
            (getAppointmentById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/appointments/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Appointment not found' });
        });

        it('should handle errors', async () => {
            (getAppointmentById as jest.Mock).mockRejectedValue(new Error('Failed to fetch appointment'));

            const response = await request(app).get('/appointments/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch appointment' });
        });
    });
});
