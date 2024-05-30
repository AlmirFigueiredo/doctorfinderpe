import { api } from "@/lib/axios";
import styles from './profile.module.css';

import { useState } from "react";


interface FormDataTypes {
    username?: string;
    name?: string;
    cpf?: string;
    rg?: string
    plan?: string;
}

export function ClientProfile() {
    const [formData, setFormData] = useState<FormDataTypes>({
        username: 'marcelocoelho1',
        name: 'Marcelo Henrique',
        cpf: '',
        rg: '',
        plan: 'amil',
    });

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.patch('/doctors/1', formData);
            console.log(response.data);
            // Sucesso na atualização do perfil
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))

    };

    return (
        <form onSubmit={handleUpdateProfile}>
            <div className={styles.username}>
                <span>Username</span>
                <div>
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        placeholder='marcelocoelho1'
                    />
                </div>
            </div>
            <div className={styles.userInfo}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        placeholder='Marcelo Henrique'
                    />
                </div>

                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf || ''}
                        onChange={handleChange}
                        placeholder='999.999.999-99'
                    />
                </div>

                <div>
                    <label htmlFor="rg">RG</label>
                    <input
                        type="text"
                        name="rg"
                        value={formData.rg || ''}
                        onChange={handleChange}
                        placeholder='999999-99'
                    />
                </div>
                
                <div>
                    <label htmlFor="plan">Plan</label>
                    <input
                        type="text"
                        name="plan"
                        value={formData.plan || ''}
                        onChange={handleChange}
                        placeholder='Seu Plano'
                    />
                </div>

                <div>
                    <span>Update profile</span>
                    <button type='submit'>Update</button>
                </div>
            </div>
        </form>
    )
}