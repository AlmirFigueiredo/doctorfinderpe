import { api } from '@/lib/axios'
import styles from './profile.module.css'
import { formatDistanceToNow } from 'date-fns'
import { ptBR, tr } from 'date-fns/locale'
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
    data: Date;
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
    const [appointmentList, setAppointmentList] = useState<AppointmentResponse[] | []>([])

    useEffect(() => {


        async function getAppointments() {

            if (userId && role) {
                const response = await api.get(`/Appointments/${userId}/${role}`)

                if (response.status) {
                    console.log(response.data)
                    setAppointmentList(response.data)
                }
            }

        }
        getAppointments()
    }, [userId, role])

    let dateExample = new Date();
    dateExample.setDate(dateExample.getDate() + 10);



    return (
        <>
            <div className={styles.appointment}>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            {role === "Patient" && (
                                <th>Médico</th>
                            )}
                            {role === "Doctor" && (
                                <th>Paciente</th>

                            )}
                            <th>Localização</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentList && appointmentList.map((appointment) => {
                            return (
                                <tr key={appointment.appointment_id}>
                                    <td>{appointment.status}</td>

                                    {role === 'Patient' && (
                                        <td>{appointment.Doctor.User.name}</td>
                                    )}
                                    {role === "Doctor" && (
                                        <td>{appointment.Patient.User.name}</td>

                                    )}
                                    
                                    <td>
                                        {appointment.address.street}
                                        <br />
                                        {appointment.address.city}
                                    </td>
                                    <td>
                                        {formatDistanceToNow(new Date(appointment.data), {
                                            locale: ptBR,
                                            addSuffix: true,
                                        })}
                                    </td>
                                    <td>{appointment.hour}</td>
                                </tr>
                            );
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
