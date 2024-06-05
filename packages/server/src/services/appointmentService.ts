import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import User from '../models/User';
import address from '../models/address';
import Appointment from '../models/appointment';

export const getAllAppointments = async () => {
    try {
        return await Appointment.findAll();
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        throw new Error('Error retrieving appointments');
    }
};

export const createAppointment = async (appointmentData: { doctor_id: number; patient_id: number; status: string; address_id: number; data: string; hour: string; }) => {
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
        if (error instanceof Error && error.message === 'Appointment not found') {
            throw error;
        }
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
        if (error instanceof Error && error.message === 'Appointment not found') {
            throw error;
        }
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
        if (error instanceof Error && error.message === 'Appointment not found') {
            throw error;
        }
        throw new Error('Error deleting appointment');
    }
};

export const getAppointmentsByUserId = async (id: number, role: string) => {
    try {
        let appointments;

        if (role === "Doctor") {
            const doctor = await Doctor.findOne({ where: { user_id: id } });

            if (!doctor) {
                throw new Error("Doctor not found!");
            }

            appointments = await Appointment.findAll({
                where: { doctor_id: doctor.doctor_id },
                include: [
                    {
                        model: Patient,
                        include: [
                            {
                                model: User,
                                attributes: ['name'],
                            },
                        ],
                        attributes: ['patient_id'], 
                        as: 'Patient' 
                    },
                    {
                        model: address,
                        attributes: ['street', 'city'],
                    },
                ],
            });
        } else if (role === "Patient") {
            const patient = await Patient.findOne({ where: { user_id: id } });

            if (!patient) {
                throw new Error("Patient not found!");
            }

            appointments = await Appointment.findAll({
                where: { patient_id: patient.patient_id },
                include: [
                    {
                        model: Doctor,
                        include: [
                            {
                                model: User,
                                attributes: ['name'],
                            },
                        ],
                        attributes: ['doctor_id'], 
                        as: 'Doctor' 
                    },
                    {
                        model: address,
                        attributes: ['street', 'city'],
                    },
                ],
            });
        } else {
            throw new Error("Invalid role");
        }

        return appointments;
    } catch (error) {
        throw new Error("Service Error");
    }
}





[
    {
      "appointment_id": 1,
      "doctor_id": 1,
      "address_id": 2,
      "patient_id": 1,
      "data": "2024-06-06",
      "hour": "13:00",
      "status": "Scheduled",
      "createdAt": "2024-06-05T12:05:02.797Z",
      "updatedAt": "2024-06-05T12:05:02.797Z",
      "Doctor": {
        "doctor_id": 1,
        "User": {
          "name": "Marcelo Henrique Salve"
        }
      },
      "address": {
        "street": "rua do beijo russo",
        "city": "Olinda beer"
      }
    }
  ]