import { useEffect, useState } from 'react'
import { Post } from './Post'
import styles from './doctor.module.css'
import { SideBar } from './sidebar'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'



interface DoctorResponse {
    description: string
    User: User 
    Doctor: UserDetails;
    specialty: string
    address: Address[];
    doctor_id: number
}

interface Address {
    street: string;
    city: string;
    street_number: string;
}

interface UserDetails {
    user_id: number;
    User: User;
}

interface User {
    name: string;
    picture: string
}

export default function doctorId() {
    const [doctorInfo, setDoctorInfo] = useState<DoctorResponse>()
    const router = useRouter()
    const doctor_id = router.query.doctorId


    useEffect(() => {
        async function fetchDoctorInfo() {
            if (doctor_id) {
                const response = await api.get(`/doctors/${doctor_id}`)
                
                if (response.status) {
                    console.log(response.data)
                    setDoctorInfo(response.data)
                }
            }
        }
        fetchDoctorInfo()
    }, [doctor_id])

    return (

        <div className={styles.wrapper}>
            {doctorInfo && (
                <>
                    <SideBar picture={doctorInfo.User.picture} name={doctorInfo.User.name} description={doctorInfo.description} specialty={doctorInfo.specialty} />
                    <main>
                        <h1 className={styles.leaveYourFeedback}>Deixe seu feedback sobre o Doutor</h1>
                        <Post doctorId={doctorInfo.doctor_id} />
                        
                    </main>
                </>
            )}
        </div>
    )
}