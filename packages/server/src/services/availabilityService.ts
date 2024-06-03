import Availability from '../models/availability';

export const getAllAvailabilities = async () => {
    try {
        return await Availability.findAll();
    } catch (error) {
        console.error('Error retrieving availabilities:', error);
        throw new Error('Error retrieving availabilities');
    }
};

export const createAvailability = async (availabilityData: { doctor_id: number; day: string; start_time: string; end_time: string }) => {
    try {
        return await Availability.create(availabilityData);
    } catch (error) {
        console.error('Error creating availability:', error);
        throw new Error('Error creating availability');
    }
};

export const getAvailabilityById = async (availabilityId: number) => {
    try {
        const availability = await Availability.findByPk(availabilityId);
        console.log(availability);
        if (!availability) {
            throw new Error('Availability not found');
        }
        return availability;
    } catch (error) {
        console.error('Error retrieving availability:', error);
        throw new Error('Error retrieving availability');
    }
};

export const updateAvailability = async (availabilityId: number, updatedData: { doctor_id?: number; day?: string; start_time?: string; end_time?: string }) => {
    try {
        const availability = await Availability.findByPk(availabilityId);
        if (!availability) {
            throw new Error('Availability not found');
        }
        return await availability.update(updatedData);
    } catch (error) {
        console.error('Error updating availability:', error);
        throw new Error('Error updating availability');
    }
};

export const deleteAvailability = async (availabilityId: number) => {
    try {
        const availability = await Availability.findByPk(availabilityId);
        if (!availability) {
            throw new Error('Availability not found');
        }
        await availability.destroy();
        return availability;
    } catch (error) {
        console.error('Error deleting availability:', error);
        throw new Error('Error deleting availability');
    }
};