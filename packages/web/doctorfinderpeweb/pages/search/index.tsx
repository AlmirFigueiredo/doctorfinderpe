import { MagnifyingGlass, MapPinLine } from 'phosphor-react';
import styles from './search.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { AppointmentForm } from './appointmentForm';
import { useAuth } from '@/context/authContext';

export interface Address {
    address_id: number;
    local_phone: string;
    zip_code: string;
    city: string;
    street_number: string;
    street: string;
    neighborhood: string;
    complement: string;
}

export interface Doctor {
    doctor_id: number;
    user_id: number;
    crm: string;
    specialty: string;
    accept_money: boolean | null;
    accept_plan: boolean | null;
    description: string;
    createdAt: string;
    updatedAt: string;
    addresses: Address[];
    User: {
        name: string;
        picture: string;
    };
}

export default function Search() {
    const { user } = useAuth()
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patientId, setPatientId] = useState(0)
    const [activeAddressIndexes, setActiveAddressIndexes] = useState<number[]>([]);

    useEffect(() => {
        async function loadDoctors() {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
                console.log(response.data)
                const initialActiveIndexes = response.data.map(() => 0);
                setActiveAddressIndexes(initialActiveIndexes);
            } catch (error) {
                console.error("Erro ao buscar médicos:", error);
            }
        }
        loadDoctors();
    }, []);

    useEffect(() => {

        async function getPatientByUserId() {
            if (user && user.role === 'Patient') {
                const response = await api.get(`users/byUserId/${user.id}`)
                if (response.status) {
                    setPatientId(response.data.patient_id)
                }
            }

        }
        getPatientByUserId()
    }, [user])
    const handleAddressClick = (doctorIndex: number, addressIndex: number) => {
        const newActiveIndexes = [...activeAddressIndexes];
        newActiveIndexes[doctorIndex] = addressIndex; // Atualiza o endereço ativo para o médico específico
        setActiveAddressIndexes(newActiveIndexes);
    };

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const citySelect = form.elements.namedItem('city') as HTMLSelectElement;
        const searchQuery: string = citySelect.value || '';

        if(searchQuery === "Todos") {
            try {
                const response = await api.get(`/doctors/`);
                setDoctors(response.data);
                const initialActiveIndexes = response.data.map(() => 0);
                setActiveAddressIndexes(initialActiveIndexes);
            } catch (error) {
                setDoctors([]);
                console.error("Erro ao buscar médicos:", error);
            }
        } else {
            try {
                const response = await api.get(`/doctors/city/${searchQuery}`);
                setDoctors(response.data);
                const initialActiveIndexes = response.data.map(() => 0);
                setActiveAddressIndexes(initialActiveIndexes);
            } catch (error) {
                setDoctors([]);
                console.error("Erro ao buscar médicos:", error);
            }
        }

        
    };


    return (
        <main className={styles.formContainer}>
            <div className={styles.centralized}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputWrapper}>
                        <select
                            className={styles.searchSelect}
                            name="city"
                            required
                        >
                            <option value="">Selecione uma cidade</option>
                            <option value="Todos">Todos</option>
                            <option value="Recife">Recife</option>
                            <option value="Olinda">Olinda</option>
                            {/* Adicione mais opções conforme necessário */}
                        </select>
                        <button type="submit">Buscar</button>
                    </div>
                </form>
                <div className={styles.resultsList}>
                    <h1>Resultados da Pesquisa</h1>
                    {doctors.length > 0 ? (
                        doctors.map((doctor, doctorIndex) => (
                            <article key={doctor.doctor_id} className={styles.doctorBox}>
                                <div className={styles.doctorContent}>
                                    <div className={styles.doctorInfo}>
                                        <img src={doctor.User.picture || "/svg/notPicture.svg"} alt="Foto do Médico" />
                                        <div>
                                            <div className={styles.cardHeader}>
                                                <strong>{doctor.User.name}</strong>
                                                {' '}
                                                <span>{doctor.specialty}</span>
                                            </div>

                                            <p>{doctor.description || 'Esse médico não possui uma descrição'}</p>
                                            <a href={`feedbacks/${doctor.doctor_id}`} className={styles.feedbacksLink}>Feedbacks</a>
                                            {/* Outras informações do médico */}
                                        </div>
                                    </div>
                                    <div className={styles.doctorAddress}>
                                        {doctor.addresses.map((address, addressIndex) => (
                                            <button
                                                key={address.address_id}
                                                className={`${styles.addressButton} ${addressIndex === activeAddressIndexes[doctorIndex] ? styles.active : ''}`}
                                                onClick={() => handleAddressClick(doctorIndex, addressIndex)}
                                            >
                                                Endereço {addressIndex + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={styles.addressText}>
                                        <MapPinLine size={20} />
                                        <span>
                                            {activeAddressIndexes[doctorIndex] !== undefined && doctor.addresses[activeAddressIndexes[doctorIndex]] ?
                                                `${doctor.addresses[activeAddressIndexes[doctorIndex]].street}, ${doctor.addresses[activeAddressIndexes[doctorIndex]].street_number}, ${doctor.addresses[activeAddressIndexes[doctorIndex]].city}` : ''}
                                        </span>
                                    </div>
                                </div>
                                <AppointmentForm patientId={patientId} doctor={doctor} />
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