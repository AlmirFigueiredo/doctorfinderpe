import { 
    createDoctor, 
    getAllDoctors, 
    getDoctorById, 
    updateDoctor, 
    deleteDoctor 
} from '../../../src/services/doctorService';
import Doctor from '../../../src/models/Doctor';

jest.mock('../../../src/models/Doctor');

describe('Doctor Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllDoctors', () => {
        it('should return all doctors', async () => {
            const doctors = [
                {doctor_id: 1, user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false },
                {doctor_id: 2, user_id: 2, specialty: 'Dermatology', crm: '654321', accept_money: false, accept_plan: true },
            ];
            (Doctor.findAll as jest.Mock).mockResolvedValue(doctors);

            const result = await getAllDoctors();

            expect(result).toEqual(doctors);
            expect(Doctor.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Doctor.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch doctors'));

            await expect(getAllDoctors()).rejects.toThrow('Error retrieving doctors');
        });
    });

    describe('createDoctor', () => {
        it('should create a new doctor', async () => {
            const doctorData = { user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false };
            const newDoctor = {doctor_id: 1, ...doctorData };
            (Doctor.create as jest.Mock).mockResolvedValue(newDoctor);

            const result = await createDoctor(doctorData);

            expect(result).toEqual(newDoctor);
            expect(Doctor.create).toHaveBeenCalledWith(doctorData);
        });

        it('should throw an error if creation fails', async () => {
            const doctorData = { user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false };
            (Doctor.create as jest.Mock).mockRejectedValue(new Error('Failed to create doctor'));

            await expect(createDoctor(doctorData)).rejects.toThrow('Error creating doctor');
        });
    });

    describe('getDoctorById', () => {
        it('should return a doctor bydoctor_id', async () => {
            const doctor = {doctor_id: 1, user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false };
            (Doctor.findByPk as jest.Mock).mockResolvedValue(doctor);

            const result = await getDoctorById(1);

            expect(result).toEqual(doctor);
            expect(Doctor.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if doctor not found', async () => {
            (Doctor.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getDoctorById(999)).rejects.toThrow('Doctor not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Doctor.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch doctor'));

            await expect(getDoctorById(1)).rejects.toThrow('Error retrieving doctor');
        });
    });

    describe('updateDoctor', () => {
        it('should update a doctor', async () => {
            const doctor = {doctor_id: 1, user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false, update: jest.fn().mockResolvedValue({doctor_id: 1, user_id: 1, specialty: 'Dermatology', crm: '123456', accept_money: true, accept_plan: false }) };
            (Doctor.findByPk as jest.Mock).mockResolvedValue(doctor);

            const updatedData = { specialty: 'Dermatology' };

            const result = await updateDoctor(1, updatedData);

            expect(result).toEqual({doctor_id: 1, user_id: 1, specialty: 'Dermatology', crm: '123456', accept_money: true, accept_plan: false });
            expect(doctor.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if doctor not found', async () => {
            (Doctor.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateDoctor(999, { specialty: 'Dermatology' })).rejects.toThrow('Doctor not found');
        });

        it('should throw an error if updating fails', async () => {
            const doctor = {doctor_id: 1, user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false, update: jest.fn().mockRejectedValue(new Error('Failed to update doctor')) };
            (Doctor.findByPk as jest.Mock).mockResolvedValue(doctor);

            await expect(updateDoctor(1, { specialty: 'Dermatology' })).rejects.toThrow('Error updating doctor');
        });
    });

    describe('deleteDoctor', () => {
        it('should delete a doctor', async () => {
            const doctor = {doctor_id: 1, user_id: 1, specialty: 'Cardiology', crm: '123456', accept_money: true, accept_plan: false, destroy: jest.fn().mockResolvedValue(null) };
            (Doctor.findByPk as jest.Mock).mockResolvedValue(doctor);

            const result = await deleteDoctor(1);

            expect(result).toEqual(doctor);
            expect(doctor.destroy).toHaveBeenCalled();
        });

        it('should throw an error if doctor not found', async () => {
            (Doctor.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteDoctor(999)).rejects.toThrow('Doctor not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Doctor.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete doctor'));

            await expect(deleteDoctor(1)).rejects.toThrow('Error deleting doctor');
        });
    });
});
