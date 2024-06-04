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
                            <h1>Você é profissional de saúde? Comece a atrair novos pacientes!</h1>
                        </header>
                        <ul>
                            <li>Conecte-se com pacientes que procuram seus serviços na sua região. </li>
                            <li>Permita que os pacientes agendem consultas 24 horas por dia. Chega de esperar pelo horário de atendimento! </li>
                            <li>Fortaleça sua reputação online coletando avaliações verificadas. </li>
                        </ul>
                        <a href="#">Crie uma conta</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

