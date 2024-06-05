import { useRouter } from 'next/router';
import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { DoctorProfile } from './DoctorProfile';
import { ClientProfile } from './ClientProfile';
import { Appointment } from './appointment';


export interface UserPatientResponse {
    user_id: number;
    name: string;
    username: string;
    picture: string | null;
    email: string;
    cpf: string;
    rg: string;
    role: "Patient";
    patient_id: number;
    plan: string | null;
}

export interface UserDoctorResponse {
    user_id: number;
    name: string;
    username: string;
    picture: string | null;
    email: string;
    cpf: string;
    rg: string;
    role: "Doctor";
    doctor_id: number;
    crm: string;
    specialty: string;
    accept_money: boolean;
    accept_plan: boolean;
    description: string;
    addresses: Address[];
}

export interface Address {
    address_id: number,
    local_phone: string,
    zip_code: string,
    city: string,
    street_number: string,
    street: string,
    neighborhood: string,
    complement: string,
}

export default function Profile() {
    const router = useRouter();
    const perfilName = router.query.name;
    const [userProfileInfo, setUserProfileInfo] = useState<UserPatientResponse | UserDoctorResponse>()

    async function fetchUserData() {

        const response = await api.get(`/users/profile/${perfilName}`)
        console.log(response.data)
        if (response.status) {
            setUserProfileInfo(response.data)
        }
    }

    useEffect(() => {
        if (perfilName) {
            fetchUserData()

        }

    }, [perfilName]);

    return (
        <div className={styles.profile}>
            <header>
                <h1>Profile</h1>
            </header>
            <div className={styles.profileContainer}>
                
                {
                    userProfileInfo && userProfileInfo.role === "Doctor" && (<DoctorProfile userProfileInfo={userProfileInfo} />)
                }
                {
                    userProfileInfo && userProfileInfo.role === "Patient" && (<ClientProfile userProfileInfo={userProfileInfo} />)
                }
            </div>
        </div>
    );
}
