import styles from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <>
        <main className={styles.main}>
          <div className={styles.centralized}>
            <div>
              <h1>Get Access to Qualified Doctors Around the World</h1>
              <p>Let's connect you to over 5,000 qualified and trained doctors for your inquiries and diagnosis</p>
              <div className={styles.btns}>
                <a className={styles.bookBtn} href="#">Search a Doctor</a>
                <a className={styles.learnBtn} href="#">Learn More</a>
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
