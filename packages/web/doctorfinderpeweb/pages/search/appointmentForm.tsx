import React, { useState } from 'react';
import styles from './search.module.css'
import { Doctor } from './index'
import { useAuth } from '@/context/authContext';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';

interface AppointmentFormProps {
    doctor: Doctor;
    patientId: number
}

export function AppointmentForm({ doctor, patientId }: AppointmentFormProps) {
    const router = useRouter()
    const { user, isLoggedIn } = useAuth()
    const [formValues, setFormValues] = useState({
        data: '', 
        hour: '',
        doctor_id: doctor.doctor_id,
        address_id: doctor.addresses.length > 0 ? doctor.addresses[0].address_id : null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id === 'date' ? 'data' : id]: value, 
        }));
    };

    const handleAddressChange = (addressId: number) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            addressId,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!isLoggedIn) {
            router.push('/login')
        }
        const formData = {
            ...formValues,
            status: "Scheduled",
            patient_id: patientId,
        }

        try {
            const response = await api.post('/Appointments', formData);
        
            if (response.status) {
                alert('Consulta marcada com sucesso!');
            } else {
                console.error('Erro ao marcar consulta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao marcar consulta:', error);
        }
    };

    return (
        <form className={styles.appointmentForm} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Data</label>
                <input type="date" id="date" value={formValues.data} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="hour">Hora</label>
                <input type="text" id="hour" value={formValues.hour} onChange={handleChange} placeholder="12:00" />
            </div>
            <div className={styles.location}>
                {doctor.addresses.map((address) => (
                    <label key={address.address_id}>
                        <input
                            type="radio"
                            name="address"
                            value={address.address_id.toString()}
                            checked={formValues.address_id === address.address_id}
                            onChange={() => handleAddressChange(address.address_id)}
                        />
                        {`${address.street}, ${address.city}`}
                    </label>
                ))}
            </div>
            <input type="hidden" name="doctor_id" value={formValues.doctor_id} />
            <button type="submit">Agendar Consulta</button>
        </form>
    );
};
