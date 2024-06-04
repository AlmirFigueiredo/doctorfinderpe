import { useRouter } from 'next/router';
import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { DoctorProfile } from './DoctorProfile';
import { ClientProfile } from './ClientProfile';
import { Appointment } from './appointment';




export default function Profile() {
    const router = useRouter();
    const perfilName = router.query.name;
    const [tab, setTab] = useState(0)

    useEffect(() => {
        // Fetch and populate formData with real data from API or state
        const data = localStorage.getItem('data')

        async function getProfileData() {
            const response = await api.get(`/${perfilName}`)
        }
    }, []);


    return (
        <div className={styles.profile}>
            <header>
                <h1>Profile</h1>
            </header>
            <div className={styles.profileContainer}>
                <aside className={styles.sidebar}>
                    <button onClick={() => setTab(0)} className={tab === 0 ? styles.active : ''}>Informações</button>
                    <button onClick={() => setTab(1)} className={tab === 1 ? styles.active : ''} >Agendamentos</button>
                </aside>
                <main className={styles.main}>
                    {tab === 0 && (
                        <>
                            <header>
                                <strong>{perfilName}</strong>
                            </header>
                            <div className={styles.profileImage}>
                                <span>Imagem de Perfil</span>
                                <div className={styles.imageContent}>
                                    <img src="/svg/notPicture.svg" alt="" />
                                    <div>
                                        <input className={styles.uploadPicture} type="text" placeholder='Link da sua foto'/>
                                        <button>Upload</button>
                                    </div>
                                </div>
                            </div>
                            {/* <DoctorProfile /> */}
                            <ClientProfile />
                        </>
                    )}
                    {tab === 1 && (
                        <Appointment name={perfilName}/>
                    )}
                </main>
            </div>
        </div>
    );
}
