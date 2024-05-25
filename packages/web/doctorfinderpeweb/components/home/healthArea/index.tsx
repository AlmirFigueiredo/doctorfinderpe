import styles from './healthArea.module.css'
import Image from 'next/legacy/image'


export function HealthArea() {
    return (
        <section className={styles.healthArea}>
            <div className={styles.centralized}>
                <div className={styles.box}>
                    <Image src="/analysis.svg" width={460} height={258} />
                    <div className={styles.body}>
                        <header>
                            <h1>Do you work in healthcare? Start attracting new patients! </h1>
                        </header>
                        <ul>
                            <li>Connect with patients looking for your service in your region. </li>
                            <li>Let patients book 24 hours a day. No more waiting for office hours! </li>
                            <li>Strengthen your online reputation by collecting verified reviews. </li>
                        </ul>
                        <a href="#">Create an account</a>
                    </div>
                </div>
            </div>
        </section>
    )
}