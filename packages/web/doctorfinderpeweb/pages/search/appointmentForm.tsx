import React, { useState } from 'react';
import styles from './search.module.css';
import { Doctor } from './index';
import { useAuth } from '@/context/authContext';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';

interface AppointmentFormProps {
    doctor: Doctor;
    patientId: number;
}

const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
        times.push(`${hour}:00`);
        if (hour < 18) {
            times.push(`${hour}:30`);
        }
    }
    return times;
};

export function AppointmentForm({ doctor, patientId }: AppointmentFormProps) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [formValues, setFormValues] = useState({
        data: '', 
        hour: '',
        doctor_id: doctor.doctor_id,
        address_id: doctor.addresses.length > 0 ? doctor.addresses[0].address_id : null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id === 'date' ? 'data' : id]: value, 
        }));
    };

    const handleAddressChange = (addressId: number) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            address_id: addressId,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        if (!formValues.data || !formValues.hour) {
            alert('Por favor, selecione uma data e uma hora.');
            return;
        }
        const formData = {
            ...formValues,
            status: 'Marcada',
            patient_id: patientId,
        };

        try {
            const response = await api.post('/Appointments', formData);
            if (response.status === 201) {
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
                <label htmlFor="date">Data e Hora</label>
                <input type="date" id="date" value={formValues.data} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="hour"></label>
                <select id="hour" value={formValues.hour} onChange={handleChange}>
                    <option value="">Selecione uma hora</option>
                    {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
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
