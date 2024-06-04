import Patient from '../models/Patient';
import Appointment from '../models/appointment';

export const getAllPatients = async () => {
    try {
        return await Patient.findAll();
    } catch (error) {
        console.error('Error on retrieving patients:', error);
        throw new Error('Error retrieving patients');
    }
};

export const createPatient = async (patientData: { user_id: number; plan: null | string }) => {
    try {
        return await Patient.create(patientData);
    } catch (error) {
        console.error('Error creating patient:', error);
        throw new Error('Error creating patient');
    }
};

export const getPatientById = async (patientId: number) => {
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    } catch (error) {
        if (error instanceof Error && error.message === 'Patient not found') {
            throw error;
        }
        throw new Error('Error retrieving patient');
    }
};

export const updatePatient = async (patientId: number, updatedData: { user_id?: number; plan?: string; }) => {
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            throw new Error('Patient not found');
        }
        return await patient.update(updatedData);
    } catch (error) {
        if (error instanceof Error && error.message === 'Patient not found') {
            throw error;
        }
        throw new Error('Error updating patient');
    }
};

export const deletePatient = async (patientId: number) => {
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            throw new Error('Patient not found');
        }
        await patient.destroy();
        return patient;
    } catch (error) {
        if (error instanceof Error && error.message === 'Patient not found') {
            throw error;
        }
        throw new Error('Error deleting patient');
    }
};

export const getPatientAppointments = async (patientId: number) => {
    try {
        const appointments = await Appointment.findAll({
            where: {
                patient_id: patientId
            }
        });

        if (!appointments || appointments.length === 0) {
            throw new Error('Nenhum appointment encontrado para este paciente');
        }

        return appointments;
    } catch (error) {
        console.error('Erro ao obter appointments do paciente:', error);
        throw error;
    }
};