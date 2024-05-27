import { useRouter } from 'next/router'
import styles from './profile.module.css'

export default function Profile() {
    const router = useRouter()
    const perfilName = router.query.name;
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
                    <div className={styles.username}>
                        <span>Username</span>
                        <div>
                            <input type="text" placeholder='marcelocoelho1' />
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
    )

}