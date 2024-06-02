import { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } from '../../../src/services/appointmentService';
import Appointment from '../../../src/models/appointment';

jest.mock('../../../src/models/appointment');

describe('Appointment Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllAppointments', () => {
        it('should return all appointments', async () => {
            const appointments = [
                { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled' },
                { id: 2, doctor_id: 2, patient_id: 2, data: '2024-06-02', hour: '11:00', status: 'completed' },
            ];
            (Appointment.findAll as jest.Mock).mockResolvedValue(appointments);

            const result = await getAllAppointments();

            expect(result).toEqual(appointments);
            expect(Appointment.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Appointment.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch appointments'));

            await expect(getAllAppointments()).rejects.toThrow('Error retrieving appointments');
        });
    });

    describe('createAppointment', () => {
        it('should create a new appointment', async () => {
            const appointmentData = { doctor_id: 1, patient_id: 1, address_id: 1, data: '2024-06-01', hour: '10:00' };
            const newAppointment = { id: 1, ...appointmentData };
            (Appointment.create as jest.Mock).mockResolvedValue(newAppointment);

            const result = await createAppointment(appointmentData);

            expect(result).toEqual(newAppointment);
            expect(Appointment.create).toHaveBeenCalledWith(appointmentData);
        });

        it('should throw an error if creation fails', async () => {
            const appointmentData = { doctor_id: 1, patient_id: 1, address_id: 1, data: '2024-06-01', hour: '10:00' };
            (Appointment.create as jest.Mock).mockRejectedValue(new Error('Failed to create appointment'));

            await expect(createAppointment(appointmentData)).rejects.toThrow('Error creating appointment');
        });
    });

    describe('getAppointmentById', () => {
        it('should return an appointment by id', async () => {
            const appointment = { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled' };
            (Appointment.findByPk as jest.Mock).mockResolvedValue(appointment);

            const result = await getAppointmentById(1);

            expect(result).toEqual(appointment);
            expect(Appointment.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if appointment not found', async () => {
            (Appointment.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getAppointmentById(999)).rejects.toThrow('Appointment not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Appointment.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch appointment'));

            await expect(getAppointmentById(1)).rejects.toThrow('Error retrieving appointment');
        });
    });

    describe('updateAppointment', () => {
        it('should update an appointment', async () => {
            const appointment = { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled', update: jest.fn().mockResolvedValue({ id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'completed' }) };
            (Appointment.findByPk as jest.Mock).mockResolvedValue(appointment);

            const updatedData = { status: 'completed' };

            const result = await updateAppointment(1, updatedData);

            expect(result).toEqual({ id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'completed' });
            expect(appointment.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if appointment not found', async () => {
            (Appointment.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateAppointment(999, { status: 'completed' })).rejects.toThrow('Appointment not found');
        });

        it('should throw an error if updating fails', async () => {
            const appointment = { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled', update: jest.fn().mockRejectedValue(new Error('Failed to update appointment')) };
            (Appointment.findByPk as jest.Mock).mockResolvedValue(appointment);

            await expect(updateAppointment(1, { status: 'completed' })).rejects.toThrow('Error updating appointment');
        });
    });

    describe('deleteAppointment', () => {
        it('should delete an appointment', async () => {
            const appointment = { id: 1, doctor_id: 1, patient_id: 1, data: '2024-06-01', hour: '10:00', status: 'scheduled', destroy: jest.fn().mockResolvedValue(null) };
            (Appointment.findByPk as jest.Mock).mockResolvedValue(appointment);

            const result = await deleteAppointment(1);

            expect(result).toEqual(appointment);
            expect(appointment.destroy).toHaveBeenCalled();
        });

        it('should throw an error if appointment not found', async () => {
            (Appointment.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteAppointment(999)).rejects.toThrow('Appointment not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Appointment.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete appointment'));

            await expect(deleteAppointment(1)).rejects.toThrow('Error deleting appointment');
        });
    });
});
