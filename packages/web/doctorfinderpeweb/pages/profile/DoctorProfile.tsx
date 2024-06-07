'use client'

import { api } from "@/lib/axios";
import styles from './profile.module.css';

import { useState, useEffect } from "react";
import { UserDoctorResponse } from "./[name]";
import { Appointment } from "./appointment";
import { useAuth } from "@/context/authContext";
import { useRouter } from 'next/navigation'


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

interface UserProfileProps {
    userProfileInfo: UserDoctorResponse
}

export function DoctorProfile({ userProfileInfo }: UserProfileProps) {
    const router = useRouter()
    const { user, updateUsername } = useAuth()
    const [ownProfile, setOwnProfile] = useState(false)
    const [pictureURL, setPictureURL] = useState("")
    const [formData, setFormData] = useState<FormDataTypes>({
        username: userProfileInfo?.username,
        name: userProfileInfo?.name,
        description: userProfileInfo?.description ?? "",
        especialidade: userProfileInfo?.specialty,
        enderecos: []
    });
    const [tab, setTab] = useState(0)

    useEffect(() => {
        // Se userProfileInfo for definido, define os endereços
        if (userProfileInfo) {
            const addresses = userProfileInfo.addresses?.map((addr, index) => ({
                id: addr.id,
                endereco: `${addr.street}, ${addr.street_number}, ${addr.city}`
            })) || [];
            setFormData(prevData => ({ ...prevData, enderecos: addresses }));
            setPictureURL(userProfileInfo.picture ?? "")
        }
    }, [userProfileInfo]);

    useEffect(() => {
        if (userProfileInfo.user_id === user.id) {
            setOwnProfile(true)

        }
    }, [userProfileInfo, user])

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.put(`/doctors/${userProfileInfo.user_id}`, formData);
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

    async function handleUpdatePicture(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(pictureURL) {
            console.log(pictureURL)

            try {
                const response = await api.put(`/users/${userProfileInfo.user_id}`, {picture: pictureURL})

                if(response.status) {
                    console.log("atualizado")
                    router.refresh()
                }
            } catch (error) {
                throw new Error("Erro ao atualizar a foto de perfil")
            }
        }
        

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;

        if (name === 'endereco' && typeof index !== 'undefined') {
            const newAddresses = [...(formData.enderecos || [])];
            newAddresses[index] = { ...newAddresses[index], endereco: value }; 
            setFormData(prevData => ({ ...prevData, enderecos: newAddresses }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    return (
        <>
            <aside className={styles.sidebar}>
                <button onClick={() => setTab(0)} className={tab === 0 ? styles.active : ''}>Informações</button>
                {ownProfile && (
                        <button onClick={() => setTab(1)} className={tab === 1 ? styles.active : ''} >Agendamentos</button>
                    )}
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
                                <img src={userProfileInfo.picture || "/svg/notPicture.svg"} alt="" />
                                {ownProfile && (
                                    <form className={styles.updatePictureForm} onSubmit={handleUpdatePicture}>
                                        <input onChange={(e) => {setPictureURL(e.target.value)} } className={styles.uploadPicture} value={pictureURL} type="text" placeholder='Link da sua foto' />
                                        <button type="submit">Upload</button>
                                    </form>
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleUpdateProfile}>
                            <div className={styles.username}>
                                <span>Usuário</span>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        placeholder='marcelocoelho1'
                                        disabled={!ownProfile}
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
                                        disabled={!ownProfile}


                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Descrição</label>
                                    <textarea
                                        name="description"
                                        rows={6}
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        placeholder='description'
                                        disabled={!ownProfile}


                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="especialidade">Especialidade</label>
                                    <input
                                        type="text"
                                        name="especialidade"
                                        value={formData.especialidade || ''}
                                        onChange={handleChange}
                                        placeholder='nutritionist'
                                        disabled={true}


                                    />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="endereco">Endereço</label>
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
                                                disabled={true}


                                            />
                                        ))}
                                        {/* {[...Array(Math.max(1 - (formData.enderecos?.length || 0), 0))].map((_, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                name="endereco"
                                                value=""
                                                onChange={(e) => handleChange(e)}
                                                placeholder={`Address ${formData.enderecos ? formData.enderecos.length + index + 1 : index + 1}`}
                                                disabled={true}


                                            />
                                        ))} */}
                                    </section>
                                </div>
                                {ownProfile && (
                                    <div>
                                        <span>Atualizar perfil</span>
                                        <button type='submit'>Atualizar</button>
                                    </div>
                                )}

                            </div>
                        </form>
                    </>
                )}

                {ownProfile && tab === 1 &&  (
                    <Appointment role={userProfileInfo.role} userId={userProfileInfo.user_id} />

                )}

            </main>
        </>

    )
}