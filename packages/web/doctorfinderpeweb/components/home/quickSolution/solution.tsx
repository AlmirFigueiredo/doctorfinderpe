import Image from 'next/legacy/image'
import styles from './solution.module.css'

export default function Solution() {

    return (
        <section className={styles.solution}>
            <header className={styles.header}>
                <h1>Quick solution for scheduling with doctor</h1>
            </header>
            <div className={styles.centralized}>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>1</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/Doctor.svg' width={50} height={50} />
                        </div>
                        <h2>Find a Doctor</h2>
                        <p>Health core systems are meet the health needs of targeted populations to organizations</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>2</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/MedicalReport.svg' width={50} height={50} />
                        </div>
                        <h2>Get your solution</h2>
                        <p>Health core systems are meet the health needs of targeted populations to organizations</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>3</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/MobileApps.svg' width={50} height={50} />
                        </div>
                        <h2>Schedule appointment</h2>
                        <p>Health core systems are meet the health needs of targeted populations to organizations</p>
                    </div>
                </div>
            </div>
        </section>
    )

}