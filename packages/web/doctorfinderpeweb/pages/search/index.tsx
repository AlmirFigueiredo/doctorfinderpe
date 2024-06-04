import { MagnifyingGlass, MapPinLine } from 'phosphor-react';
import styles from './search.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { AppointmentForm } from './appointmentForm';

interface Address {
    id: number;
    endereco: string;
}

export interface Doctor {
    id: number;
    user_id: number;
    enderecos: Address[];
    especialidade: string;
    aceita_plano: boolean;
    name: string;
    description: string;
    enderecos_amout: number;
    feedbacksCount: number;
    imageSrc: string;
}

export default function Search() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [query, setQuery] = useState("");
    const [activeAddressIndexes, setActiveAddressIndexes] = useState<number[]>([]);


    useEffect(() => {
        async function loadDoctors(query?: string) {
            try {
                const response = await api.get('/doctors', {
                    params: {
                        q: query
                    }
                });
                setDoctors(response.data);

                // Definir o primeiro endereço como ativo para cada médico
                const initialActiveIndexes = response.data.map(() => 0);
                setActiveAddressIndexes(initialActiveIndexes);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        }
        loadDoctors(query);
    }, [query]);

    const handleAddressClick = (doctorIndex: number, addressIndex: number) => {
        const newActiveIndexes = [...activeAddressIndexes];
        newActiveIndexes[doctorIndex] = addressIndex; // atualiza o endereço ativo para o médico específico
        setActiveAddressIndexes(newActiveIndexes);

    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchQuery = String((event.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="search"]')?.value);
        setQuery(searchQuery);
    };



    return (
        <main className={styles.formContainer}>
            <div className={styles.centralized}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputWrapper}>
                        <MagnifyingGlass size={20} className={styles.icon} />
                        <input name="search" list="search-suggestions" type="text" placeholder="especialidade ou name" />
                        <datalist id="search-suggestions">
                            <option value="projeto 1"></option>
                            <option value="projeto 2"></option>
                            <option value="projeto 3"></option>
                            <option value="projeto 4"></option>
                        </datalist>
                        <button type="submit">buscar</button>
                    </div>
                </form>
                <div className={styles.resultsList}>
                    <h1>Resultados da Pesquisa</h1>
                    {doctors.length > 0 ? (
                        doctors.map((doctor, doctorIndex) => (
                            <article key={doctor.id} className={styles.doctorBox}>
                                <div className={styles.doctorContent}>
                                    <div className={styles.doctorInfo}>
                                        <img src={doctor.imageSrc} alt="" />
                                        <div>
                                            <strong>{doctor.name}</strong>
                                            <p>{doctor.description}</p>
                                            <span>feedbacks count: {doctor.feedbacksCount}</span>
                                        </div>
                                    </div>
                                    <div className={styles.doctorAddress}>
                                        {doctor.enderecos.map((address, addressIndex) => (
                                            <button
                                                key={address.id}
                                                className={`${styles.addressButton} ${addressIndex === activeAddressIndexes[doctorIndex] ? styles.active : ''}`}
                                                onClick={() => handleAddressClick(doctorIndex, addressIndex)} // adiciona um manipulador de clique para alternar entre os endereços
                                            >
                                                Address {address.id}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={styles.addressText}>
                                        <MapPinLine size={20} />
                                        <span>{activeAddressIndexes[doctorIndex] !== undefined && doctor.enderecos[activeAddressIndexes[doctorIndex]] ? doctor.enderecos[activeAddressIndexes[doctorIndex]].endereco : ''}</span>
                                    </div>
                                </div>
                                <AppointmentForm doctor={doctor}/>
                            </article>
                        ))
                    ) : (
                        <p>Nenhum médico encontrado.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

