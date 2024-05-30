import { useRouter } from 'next/router';
import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { DoctorProfile } from './DoctorProfile';
import { ClientProfile } from './ClientProfile';



export default function Profile() {
    const router = useRouter();
    const perfilName = router.query.name;

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
                    {/* <DoctorProfile /> */}
                    <ClientProfile />
                </main>
            </div>
        </div>
    );
}
