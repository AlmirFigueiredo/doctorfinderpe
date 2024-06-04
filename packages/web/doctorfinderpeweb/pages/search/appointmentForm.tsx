import React, { useState } from 'react';
import styles from './search.module.css'
import {Doctor} from './index'

interface AppointmentFormProps {
    doctor: Doctor;
}

export function AppointmentForm({ doctor }: AppointmentFormProps) {
    const [formValues, setFormValues] = useState({
        date: '',
        hour: '',
        doctor_id: doctor.id,
        addressId: doctor.enderecos.length > 0 ? doctor.enderecos[0].id : null, // Define o primeiro endereço como padrão
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleAddressChange = (addressId: number) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            addressId,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValues);
    };

    return (
        <form className={styles.appointmentForm} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Data</label>
                <input type="date" id="date" value={formValues.date} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="hour">Hora</label>
                <input type="text" id="hour" value={formValues.hour} onChange={handleChange} placeholder="12:00" />
            </div>
            <div className={styles.location}>
                {doctor.enderecos.map((address) => (
                    <label key={address.id}>
                        <input
                            type="radio"
                            name="address"
                            value={address.id.toString()}
                            checked={formValues.addressId === address.id}
                            onChange={() => handleAddressChange(address.id)}
                        />
                        {address.endereco}
                    </label>
                ))}
            </div>
            <input type="hidden" name="doctor_id" value={formValues.doctor_id} />
            <button type="submit">Agendar Consulta</button>
        </form>
    );
};

