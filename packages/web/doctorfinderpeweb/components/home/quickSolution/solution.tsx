import Image from 'next/legacy/image'
import styles from './solution.module.css'

export default function Solution() {

    return (
        <section className={styles.solution}>
            <header className={styles.header}>
                <h1>Solução prática para marcar consultas médicas</h1>
            </header>
            <div className={styles.centralized}>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>1</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/Doctor.svg' width={50} height={50} />
                        </div>
                        <h2>Buscar e Filtrar Médicos</h2>
                        <p>Encontre médicos por especialidade, localização e tipo de pagamento aceito.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>2</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/MedicalReport.svg' width={50} height={50} />
                        </div>
                        <h2>Agendar Consultas</h2>
                        <p>Selecione um médico e agende a consulta.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardNumber}>3</div>
                        <div className={styles.imageDiv}>
                            <Image src='/svg/MobileApps.svg' width={50} height={50} />
                        </div>
                        <h2>Gerenciar Consultas e Perfil</h2>
                        <p> Acesse e gerencie suas consultas e perfil facilmente</p>
                    </div>
                </div>
            </div>
        </section>
    )

}