import { MagnifyingGlass, MapPinLine } from 'phosphor-react';
import styles from './search.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

interface Address {
    id: number;
    endereco: string;
}

interface Doctor {
    medico_id: number;
    user_id: number;
    enderecos: Address[];
    especialidade: string;
    aceita_plano: boolean;
    name: string;
    description: string;
    enderecos_amout: number;
    feedbacksCount: number;
}

export default function Search() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [query, setQuery] = useState("");
    const [activeAddressIndex, setActiveAddressIndex] = useState<number>(0); // estado para controlar o endereço ativo

    useEffect(() => {
        async function loadDoctors(query?: string) {
            try {
                const response = await api.get('/doctors', {
                    params: {
                        q: query
                    }
                });
                console.log(response.data); // Verifique a resposta da API no console
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        }
        loadDoctors(query);
    }, [query]);

    const handleAddressClick = (index: number) => {
        setActiveAddressIndex(index); // atualiza o endereço ativo quando um botão é clicado
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchQuery = (event.target as HTMLFormElement).elements.namedItem('search') as HTMLInputElement;
        setQuery(searchQuery.value);
    };

    return (
        <main className={styles.formContainer}>
            <div className={styles.centralized}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputWrapper}>
                        <MagnifyingGlass size={20} className={styles.icon} />
                        <input name="search" list="search-suggestions" type="text" placeholder="specialty, disease or name" />
                        <datalist id="search-suggestions">
                            <option value="projeto 1"></option>
                            <option value="projeto 2"></option>
                            <option value="projeto 3"></option>
                            <option value="projeto 4"></option>
                        </datalist>
                        <button type="submit">search</button>
                    </div>
                </form>
                <div className={styles.resultsList}>
                    <h1>Search Results</h1>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <article key={doctor.medico_id} className={styles.doctorBox}>
                                <div className={styles.doctorContent}>
                                    <div className={styles.doctorInfo}>
                                        <img src="https://github.com/IagoCarvalhoG.png" alt="" />
                                        <div>
                                            <strong>{doctor.name}</strong>
                                            <p>{doctor.description}</p>
                                            <span>feedbacks count: {doctor.feedbacksCount}</span>
                                        </div>
                                    </div>
                                    <div className={styles.doctorAddress}>
                                        {doctor.enderecos.map((address, index) => (
                                            <button
                                                key={address.id}
                                                className={`${styles.addressButton} ${index === activeAddressIndex ? styles.active : ''}`}
                                                onClick={() => handleAddressClick(index)} // adiciona um manipulador de clique para alternar entre os endereços
                                            >
                                                Address {address.id}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={styles.addressText}>
                                        <MapPinLine size={20} />
                                        <span>{doctor.enderecos[activeAddressIndex].endereco}</span>
                                    </div>
                                </div>
                                <iframe
                                    className={styles.maps}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.4558560739238!2d-34.89033712588267!3d-8.054895491972536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18ea6e481ed1%3A0x2bd9d6c2a072628d!2sUniversidade%20Cat%C3%B3lica%20de%20Pernambuco%20-%20Polo%20Ead%20Unicap!5e0!3m2!1sen!2sbr!4v1716666395920!5m2!1sen!2sbr"
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </article>
                        ))
                    ) : (
                        <p>No doctors found.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
