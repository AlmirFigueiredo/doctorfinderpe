import { useRouter } from 'next/router'
import styles from './profile.module.css'
import { useState } from 'react';

interface Address {
    endereco: string;
}

interface FormDataTypes {
    username?: string;
    name?: string;
    description?: string;
    specialty?: string;
    address?: Address[];

}

export default function Profile() {
    const router = useRouter()
    const perfilName = router.query.name;

    const [formData, setFormData] = useState<FormDataTypes>({})

    function handleUpdateProfile() {
        
    }

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
                    <form action="">
                        <div className={styles.username}>
                            <span>Username</span>
                            <div>
                                <input type="text" value="marcelocoelho1" placeholder='marcelocoelho1' />
                            </div>
                        </div>
                        <div className={styles.userInfo}>
                            <div>
                                <label htmlFor="">Name</label>
                                <input type="text" value="Marcelo Henrique" placeholder='Marcelo Henrique' />
                            </div>
                            <div>
                                <label htmlFor="">Description</label>
                                <textarea name="" rows={6} placeholder='description' id=""></textarea>
                            </div>
                            <div>
                                <label htmlFor="">specialty</label>
                                <input type="text" value="nutritionist" placeholder='nutritionist' />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="">address</label>
                                </div>
                                <section>
                                    <input type="text" value="Rua xavier de brito" />
                                    <input type="text" value="Rua xavier de brito" />
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
    )

}