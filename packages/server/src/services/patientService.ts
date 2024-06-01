import Patient from '../models/Patient';

export const getAllPatients = async () => {
    try {
        return await Patient.findAll();
    } catch (error) {
        console.error('Error on retrieving patients:', error);
        throw new Error('Error retrieving patients');
    }
};

export const createPatient = async (patientData: { user_id: number }) => {
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
        console.error('Error retrieving patient:', error);
        throw new Error('Error retrieving patient');
    }
};

export const updatePatient = async (patientId: number, updatedData: { user_id?: number }) => {
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            throw new Error('Patient not found');
        }
        return await patient.update(updatedData);
    } catch (error) {
        console.error('Error updating patient:', error);
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
        console.error('Error deleting patient:', error);
        throw new Error('Error deleting patient');
    }
};