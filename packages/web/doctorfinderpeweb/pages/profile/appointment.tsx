import { api } from '@/lib/axios'
import styles from './profile.module.css'
import { useEffect, useState } from 'react'

interface AppointmentProps {
    userId: number
    role: string
}

interface AppointmentResponse {
    appointment_id: number;
    doctor_id: number;
    patient_id: number;
    address_id: number;
    data: string;
    hour: string;
    status: string;
    Doctor: UserDetails;
    Patient: UserDetails;
    address: Address;
}

interface Address {
    street: string;
    city: string;
}

interface UserDetails {
    user_id: number;
    User: User;
}

interface User {
    name: string;
}

export function Appointment({ userId, role }: AppointmentProps) {
    const [scheduledAppointments, setScheduledAppointments] = useState<AppointmentResponse[]>([]);
    const [completedAppointments, setCompletedAppointments] = useState<AppointmentResponse[]>([]);

    useEffect(() => {
        async function getAppointments() {
            if (userId && role) {
                const response = await api.get(`/appointments/${userId}/${role}`)
                if (response.status === 200) {
                    console.log(response.data)
                    categorizeAppointments(response.data);
                }
            }
        }
        getAppointments()
    }, [userId, role])

    const categorizeAppointments = (appointments: AppointmentResponse[]) => {
        const scheduled: AppointmentResponse[] = [];
        const completed: AppointmentResponse[] = [];

        appointments.forEach(appointment => {
            if (appointment.status === 'Concluida') {
                completed.push(appointment);
            } else {
                scheduled.push(appointment);
            }
        });

        setScheduledAppointments(scheduled);
        setCompletedAppointments(completed);
    }

    const updateAppointmentStatus = async (appointmentId: number) => {
        try {
            const url = `/appointments/${appointmentId}`;
            console.log(`Updating appointment status: ${url}`);
            const response = await api.put(url, { status: 'Concluida' });
            if (response.status === 200) {
                setScheduledAppointments(prev => prev.filter(app => app.appointment_id !== appointmentId));
                const updatedAppointment = scheduledAppointments.find(app => app.appointment_id === appointmentId);
                if (updatedAppointment) {
                    setCompletedAppointments(prev => [
                        ...prev,
                        { ...updatedAppointment, status: 'Concluida' }
                    ]);
                }
            }
        } catch (error) {
            console.error('Error updating appointment status', error);
        }
    }

    const renderTable = (appointments: AppointmentResponse[], title: string) => (
        <div className={styles.appointment}>
            <h3>{title}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        {role === "Patient" && <th>Médico</th>}
                        {role === "Doctor" && <th>Paciente</th>}
                        <th>Localização</th>
                        <th>Data</th>
                        <th>Hora</th>
                        {role === "Doctor" && title === 'Consultas Marcadas' && <th>Ação</th>}
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.appointment_id}>
                            <td>{appointment.status}</td>
                            {role === 'Patient' && <td>{appointment.Doctor.User.name}</td>}
                            {role === "Doctor" && <td>{appointment.Patient.User.name}</td>}
                            <td>
                                {appointment.address.street}
                                <br />
                                {appointment.address.city}
                            </td>
                            <td>{appointment.data}</td>
                            <td>{appointment.hour}</td>
                            {role === "Doctor" && title === 'Consultas Marcadas' && (
                                <td>
                                    <button onClick={() => updateAppointmentStatus(appointment.appointment_id)}>
                                        Concluir
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            {renderTable(scheduledAppointments, 'Consultas Marcadas')}
            {renderTable(completedAppointments, 'Consultas Concluídas')}
        </>
    )
}
