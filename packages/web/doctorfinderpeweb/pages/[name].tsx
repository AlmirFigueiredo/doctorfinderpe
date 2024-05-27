import { useRouter } from 'next/router';
import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';

interface Address {
    id: number;
    endereco: string;
}

interface FormDataTypes {
    username?: string;
    name?: string;
    description?: string;
    especialidade?: string;
    enderecos?: Address[];
}

export default function Profile() {
    const router = useRouter();
    const perfilName = router.query.name;

    const [formData, setFormData] = useState<FormDataTypes>({
        username: 'marcelocoelho1',
        name: 'Marcelo Henrique',
        description: '',
        especialidade: 'nutritionist',
        enderecos: [{ id: 1, endereco: '' }, { id: 2, endereco: '' }]
    });

    useEffect(() => {
        // Fetch and populate formData with real data from API or state
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;

        if (name === 'endereco' && typeof index !== 'undefined') {
            const newAddresses = [...(formData.enderecos || [])];
            newAddresses[index] = { ...newAddresses[index], endereco: value }; // Ensure id is kept
            setFormData((prevData) => ({ ...prevData, enderecos: newAddresses }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

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

    return (
        <div className={styles.profile}>
            <header>
                <h1>Profile</h1>
            </header>
            <div className={styles.profileContainer}>
                <aside className={styles.sidebar}>
                    <button className={styles.active}>Profile</button>
                    <button>Change password</button>
                </aside>
                <main className={styles.main}>
                    <header>
                        <strong>{perfilName}</strong>
                    </header>
                    <div className={styles.profileImage}>
                        <span>Profile Image</span>
                        <div className={styles.imageContent}>
                            <img src="https://github.com/marcelocoelho1.png" alt="" />
                            <div>
                                <button>Upload new</button>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
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
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    rows={6}
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    placeholder='description'
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="especialidade">Specialty</label>
                                <input
                                    type="text"
                                    name="especialidade"
                                    value={formData.especialidade || ''}
                                    onChange={handleChange}
                                    placeholder='nutritionist'
                                />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="endereco">Address</label>
                                </div>
                                <section>
                                    {formData.enderecos?.map((addr, index) => (
                                        <input
                                            key={addr.id}
                                            type="text"
                                            name="endereco"
                                            value={addr.endereco}
                                            onChange={(e) => handleChange(e, index)}
                                            placeholder={`Address ${index + 1}`}
                                        />
                                    ))}
                                </section>
                            </div>
                            <div>
                                <span>Update profile</span>
                                <button type='submit'>Update</button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
