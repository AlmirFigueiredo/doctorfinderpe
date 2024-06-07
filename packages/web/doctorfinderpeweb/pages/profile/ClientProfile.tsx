'use client'
import { api } from "@/lib/axios";
import styles from './profile.module.css';

import { useEffect, useState } from "react";
import { UserPatientResponse } from "./[name]";
import { useAuth } from "@/context/authContext";
import { Appointment } from "./appointment";
import { useRouter } from 'next/navigation'


interface FormDataTypes {
    username?: string;
    name?: string;
    cpf?: string;
    rg?: string;
    plan?: string;
}

interface UserProfileProps {
    userProfileInfo: UserPatientResponse
}

export function ClientProfile({ userProfileInfo }: UserProfileProps) {
    const { user, updateUsername } = useAuth()
    const [ownProfile, setOwnProfile] = useState(false)
    const [pictureURL, setPictureURL] = useState("")
    const [tab, setTab] = useState(0)
    const router = useRouter()


    const [formData, setFormData] = useState<FormDataTypes>({
        username: userProfileInfo.username,
        name: userProfileInfo.name,
        cpf: userProfileInfo.cpf,
        rg: userProfileInfo.rg,
        plan: userProfileInfo.plan ?? '',
    });


    useEffect(() => {
        if (userProfileInfo.user_id === user.id) {
            setOwnProfile(true)

        }
    }, [userProfileInfo, user])

    async function handleUpdatePicture(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (pictureURL) {
            console.log(pictureURL)

            try {
                const response = await api.put(`/users/${userProfileInfo.user_id}`, { picture: pictureURL })
                
                if (response.status) {
                    console.log("atualizado")
                    router.refresh()
                }
            } catch (error) {
                throw new Error("Erro ao atualizar a foto de perfil")
            }
        }


    }
    console.log(userProfileInfo)
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.put(`/users/${userProfileInfo.user_id}`, formData);
            if (response.status) {
                alert('Usuario atualizado com sucesso!');
                if (formData.username) {
                    updateUsername(formData.username); // Atualiza o contexto
                    router.push(`/profile/${formData.username}`); // Redireciona para o novo username
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    return (
        <>

            <aside className={styles.sidebar}>
                <button onClick={() => setTab(0)} className={tab === 0 ? styles.active : ''}>Informações</button>
                {
                    ownProfile && (
                        <button onClick={() => setTab(1)} className={tab === 1 ? styles.active : ''} >Agendamentos</button>
                    )
                }
            </aside>
            <main className={styles.main}>
                <header>
                    <strong>{userProfileInfo.username}</strong>
                </header>
                {tab === 0 && (
                    <>
                        <div className={styles.profileImage}>
                            <span>Imagem de Perfil</span>
                            <div className={styles.imageContent}>
                                <img src={userProfileInfo?.picture || "/svg/notPicture.svg"} alt="" />
                                {ownProfile && (
                                    <form className={styles.updatePictureForm} onSubmit={handleUpdatePicture}>
                                        <input onChange={(e) => { setPictureURL(e.target.value) }} className={styles.uploadPicture} value={pictureURL} type="text" placeholder='Link da sua foto' />
                                        <button type="submit">Upload</button>
                                    </form>
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleUpdateProfile}>
                            <div className={styles.username}>
                                <span>Nome de Usuário</span>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        placeholder='marcelocoelho1'
                                        disabled={!ownProfile} // Desativa a edição se não for o próprio perfil
                                    />
                                </div>
                            </div>
                            <div className={styles.userInfo}>
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        placeholder='Marcelo Henrique'
                                        disabled={!ownProfile} // Desativa a edição se não for o próprio perfil
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
                                        disabled={!ownProfile} // Desativa a edição se não for o próprio perfil
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
                                        disabled={!ownProfile} // Desativa a edição se não for o próprio perfil
                                    />
                                </div>

                                <div>
                                    <label htmlFor="plan">Plano</label>
                                    <input
                                        type="text"
                                        name="plan"
                                        value={formData.plan || ''}
                                        onChange={handleChange}
                                        placeholder='Seu Plano'
                                        disabled={!ownProfile} // Desativa a edição se não for o próprio perfil
                                    />
                                </div>

                                {ownProfile && ( // Mostra apenas se for o próprio perfil
                                    <div>
                                        <span>Atualizar Perfil</span>
                                        <button type='submit'>Atualizar</button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </>
                )}
                {ownProfile && tab === 1 && (
                    <Appointment role={userProfileInfo.role} userId={userProfileInfo.user_id} />
                )}

            </main>
        </>

    )
}
