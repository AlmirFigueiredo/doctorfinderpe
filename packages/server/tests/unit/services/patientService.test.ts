import { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from '../../../src/services/patientService';
import Patient from '../../../src/models/Patient';

jest.mock('../../../src/models/Patient');

describe('Patient Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllPatients', () => {
        it('should return all patients', async () => {
            const patients = [
                { patient_id: 1, user_id: 1 },
                { patient_id: 2, user_id: 2 },
            ];
            (Patient.findAll as jest.Mock).mockResolvedValue(patients);

            const result = await getAllPatients();

            expect(result).toEqual(patients);
            expect(Patient.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Patient.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch patients'));

            await expect(getAllPatients()).rejects.toThrow('Error retrieving patients');
        });
    });

    describe('createPatient', () => {
        it('should create a new patient', async () => {
            const patientData = { user_id: 1 };
            const newPatient = { patient_id: 1, ...patientData };
            (Patient.create as jest.Mock).mockResolvedValue(newPatient);

            const result = await createPatient(patientData);

            expect(result).toEqual(newPatient);
            expect(Patient.create).toHaveBeenCalledWith(patientData);
        });

        it('should throw an error if creation fails', async () => {
            const patientData = { user_id: 1 };
            (Patient.create as jest.Mock).mockRejectedValue(new Error('Failed to create patient'));

            await expect(createPatient(patientData)).rejects.toThrow('Error creating patient');
        });
    });

    describe('getPatientById', () => {
        it('should return a patient bypatient_id', async () => {
            const patient = { patient_id: 1, user_id: 1 };
            (Patient.findByPk as jest.Mock).mockResolvedValue(patient);

            const result = await getPatientById(1);

            expect(result).toEqual(patient);
            expect(Patient.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if patient not found', async () => {
            (Patient.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getPatientById(999)).rejects.toThrow('Patient not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Patient.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch patient'));

            await expect(getPatientById(1)).rejects.toThrow('Error retrieving patient');
        });
    });

    describe('updatePatient', () => {
        it('should update a patient', async () => {
            const patient = {patient_id: 1, user_id: 1, update: jest.fn().mockResolvedValue({patient_id: 1, user_id: 2 }) };
            (Patient.findByPk as jest.Mock).mockResolvedValue(patient);

            const updatedData = { user_id: 2 };

            const result = await updatePatient(1, updatedData);

            expect(result).toEqual({patient_id: 1, user_id: 2 });
            expect(patient.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if patient not found', async () => {
            (Patient.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updatePatient(999, { user_id: 2 })).rejects.toThrow('Patient not found');
        });

        it('should throw an error if updating fails', async () => {
            const patient = {patient_id: 1, user_id: 1, update: jest.fn().mockRejectedValue(new Error('Failed to update patient')) };
            (Patient.findByPk as jest.Mock).mockResolvedValue(patient);

            await expect(updatePatient(1, { user_id: 2 })).rejects.toThrow('Error updating patient');
        });
    });

    describe('deletePatient', () => {
        it('should delete a patient', async () => {
            const patient = {patient_id: 1, user_id: 1, destroy: jest.fn().mockResolvedValue(null) };
            (Patient.findByPk as jest.Mock).mockResolvedValue(patient);

            const result = await deletePatient(1);

            expect(result).toEqual(patient);
            expect(patient.destroy).toHaveBeenCalled();
        });

        it('should throw an error if patient not found', async () => {
            (Patient.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deletePatient(999)).rejects.toThrow('Patient not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Patient.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete patient'));

            await expect(deletePatient(1)).rejects.toThrow('Error deleting patient');
        });
    });
});
