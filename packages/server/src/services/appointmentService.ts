import Appointment from '../models/appointment';

export const getAllAppointments = async () => {
    try {
        return await Appointment.findAll();
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        throw new Error('Error retrieving appointments');
    }
};

export const createAppointment = async (appointmentData: { doctor_id: number; patient_id: number;address_id: number; data: string; hour: string;}) => {
  try {
    const existingAppointment = await Appointment.findOne({
      where: {
        data: appointmentData.data,
        hour: appointmentData.hour
      }
    });
    if (existingAppointment) {
      throw new Error('Appointment already exists at this date and hour');
    }
    return await Appointment.create(appointmentData);
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Error creating appointment');
  }

};

export const getAppointmentById = async (appointmentId: number) => {
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        return appointment;
    } catch (error) {
        console.error('Error retrieving appointment:', error);
        throw new Error('Error retrieving appointment');
    }
};

export const updateAppointment = async (appointmentId: number, updatedData: { doctor_id?: number; address_id?: number; patient_id?: number; data?: string; hour?: string; status?: string }) => {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');

        }
        return await appointment.update(updatedData);
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw new Error('Error updating appointment');
    }
};

export const deleteAppointment = async (appointmentId: number) => {
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        await appointment.destroy();
        return appointment;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw new Error('Error deleting appointment');
    }
};