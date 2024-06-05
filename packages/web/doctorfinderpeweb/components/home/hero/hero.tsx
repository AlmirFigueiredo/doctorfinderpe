import styles from "./hero.module.css";
import Image from 'next/legacy/image'
import Link from "next/link";

export default function Hero() {
  return (
    <>
        <main className={styles.main}>
          <div className={styles.centralized}>
            <div>
              <h1>Encontre Seu Médico Ideal e Marque Consultas com Facilidade</h1>
              <p>Vamos conectá-lo a mais de 5.000 médicos qualificados e treinados para suas consultas e diagnósticos.</p>
              <div className={styles.btns}>
                <Link className={styles.bookBtn} href="/search">Procurar um Médico</Link>
                <Link className={styles.learnBtn} href="#">Saiba Mais</Link>
              </div>
            </div>
            <div>
                <Image src="/medicine.svg" width={529} height={436} alt="doctor"/>
            </div>
          </div>
        </main>
    </>
  );
}
