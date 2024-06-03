import { createAvailability, getAllAvailabilities, getAvailabilityById, updateAvailability, deleteAvailability } from '../../../src/services/availabilityService';
import Availability from '../../../src/models/availability';

jest.mock('../../../src/models/availability');

describe('Availability Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllAvailabilities', () => {
        it('should return all availabilities', async () => {
            const availabilities = [
                {availability_id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' },
                {availability_id: 2, doctor_id: 2, day: 'Tuesday', start_time: '10:00', end_time: '18:00' },
            ];
            (Availability.findAll as jest.Mock).mockResolvedValue(availabilities);

            const result = await getAllAvailabilities();

            expect(result).toEqual(availabilities);
            expect(Availability.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Availability.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch availabilities'));

            await expect(getAllAvailabilities()).rejects.toThrow('Error retrieving availabilities');
        });
    });

    describe('createAvailability', () => {
        it('should create a new availability', async () => {
            const availabilityData = { doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' };
            const newAvailability = {availability_id: 1, ...availabilityData };
            (Availability.create as jest.Mock).mockResolvedValue(newAvailability);

            const result = await createAvailability(availabilityData);

            expect(result).toEqual(newAvailability);
            expect(Availability.create).toHaveBeenCalledWith(availabilityData);
        });

        it('should throw an error if creation fails', async () => {
            const availabilityData = { doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' };
            (Availability.create as jest.Mock).mockRejectedValue(new Error('Failed to create availability'));

            await expect(createAvailability(availabilityData)).rejects.toThrow('Error creating availability');
        });
    });

    describe('getAvailabilityById', () => {
        it('should return an availability byavailability_id', async () => {
            const availability = {availability_id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00' };
            (Availability.findByPk as jest.Mock).mockResolvedValue(availability);

            const result = await getAvailabilityById(1);

            expect(result).toEqual(availability);
            expect(Availability.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if availability not found', async () => {
            (Availability.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getAvailabilityById(999)).rejects.toThrow('Availability not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Availability.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch availability'));

            await expect(getAvailabilityById(1)).rejects.toThrow('Error retrieving availability');
        });
    });

    describe('updateAvailability', () => {
        it('should update an availability', async () => {
            const availability = {availability_id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00', update: jest.fn().mockResolvedValue({availability_id: 1, doctor_id: 1, day: 'Tuesday', start_time: '09:00', end_time: '17:00' }) };
            (Availability.findByPk as jest.Mock).mockResolvedValue(availability);

            const updatedData = { day: 'Tuesday' };

            const result = await updateAvailability(1, updatedData);

            expect(result).toEqual({availability_id: 1, doctor_id: 1, day: 'Tuesday', start_time: '09:00', end_time: '17:00' });
            expect(availability.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if availability not found', async () => {
            (Availability.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateAvailability(999, { day: 'Tuesday' })).rejects.toThrow('Availability not found');
        });

        it('should throw an error if availability not found', async () => {
            (Availability.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateAvailability(999, { day: 'Tuesday' })).rejects.toThrow('Availability not found');
        });

        it('should throw an error if updating fails', async () => {
            const availability = {availability_id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00', update: jest.fn().mockRejectedValue(new Error('Failed to update availability')) };
            (Availability.findByPk as jest.Mock).mockResolvedValue(availability);

            await expect(updateAvailability(1, { day: 'Tuesday' })).rejects.toThrow('Error updating availability');
        });
    });

    describe('deleteAvailability', () => {
        it('should delete an availability', async () => {
            const availability = {availability_id: 1, doctor_id: 1, day: 'Monday', start_time: '09:00', end_time: '17:00', destroy: jest.fn().mockResolvedValue(null) };
            (Availability.findByPk as jest.Mock).mockResolvedValue(availability);

            const result = await deleteAvailability(1);

            expect(result).toEqual(availability);
            expect(availability.destroy).toHaveBeenCalled();
        });

        it('should throw an error if availability not found', async () => {
            (Availability.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteAvailability(999)).rejects.toThrow('Availability not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Availability.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete availability'));

            await expect(deleteAvailability(1)).rejects.toThrow('Error deleting availability');
        });
    });
});
