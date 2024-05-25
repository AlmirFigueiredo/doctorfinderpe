import { MagnifyingGlass, MapPinLine } from 'phosphor-react';
import styles from './search.module.css';

export default function Search() {
    return (
        <main className={styles.formContainer}>
            <div className={styles.centralized}>
                <form>
                    <div className={styles.inputWrapper}>
                        <MagnifyingGlass size={20} className={styles.icon} />
                        <input list='search-suggestions' type="text" placeholder="specialty, disease or name" />
                        <datalist id='search-suggestions'>
                            <option value="projeto 1"></option>
                            <option value="projeto 2"></option>
                            <option value="projeto 3"></option>
                            <option value="projeto 4"></option>
                        </datalist>
                        <button type='submit'>search</button>
                    </div>
                </form>
                <div className={styles.resultsList}>
                    <h1>Search Results</h1>
                    <article className={styles.doctorBox}>
                        <div className={styles.doctorContent}>
                            <div className={styles.doctorInfo}>
                                <img src="https://github.com/IagoCarvalhoG.png" alt="" />
                                <div>
                                    <strong>Iago Carvalho</strong>
                                    <p>Nutricionista (Nutrição para diabetes, Nutrição nas doenças crônicas, Modulação intestinal, Nutrição autoimunes)</p>
                                    <span>feedbacks count: 10</span>
                                </div>
                            </div>
                            <div className={styles.doctorAddress}>
                                <div>
                                    <button className={styles.active}>Address 1</button>
                                    <button>Address 2</button>
                                </div>
                                <div className={styles.addressText}>
                                    <MapPinLine size={20}/>
                                    <span>Av. Eng. Domingos Ferreira, 636 - Loja 26</span>
                                </div>
                            </div>
                        </div>
                        <iframe className={styles.maps} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.4558560739238!2d-34.89033712588267!3d-8.054895491972536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18ea6e481ed1%3A0x2bd9d6c2a072628d!2sUniversidade%20Cat%C3%B3lica%20de%20Pernambuco%20-%20Polo%20Ead%20Unicap!5e0!3m2!1sen!2sbr!4v1716666395920!5m2!1sen!2sbr" width={500} height={300}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </article>
                    <article className={styles.doctorBox}>
                        <div className={styles.doctorContent}>
                            <div className={styles.doctorInfo}>
                                <img src="https://github.com/IagoCarvalhoG.png" alt="" />
                                <div>
                                    <strong>Iago Carvalho</strong>
                                    <p>Nutricionista (Nutrição para diabetes, Nutrição nas doenças crônicas, Modulação intestinal, Nutrição autoimunes)</p>
                                    <span>feedbacks count: 10</span>
                                </div>
                            </div>
                            <div className={styles.doctorAddress}>
                                <div>
                                    <button className={styles.active}>Address 1</button>
                                    <button>Address 2</button>
                                </div>
                                <div className={styles.addressText}>
                                    <MapPinLine size={20}/>
                                    <span>Av. Eng. Domingos Ferreira, 636 - Loja 26</span>
                                </div>
                            </div>
                        </div>
                        <iframe className={styles.maps} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.4558560739238!2d-34.89033712588267!3d-8.054895491972536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18ea6e481ed1%3A0x2bd9d6c2a072628d!2sUniversidade%20Cat%C3%B3lica%20de%20Pernambuco%20-%20Polo%20Ead%20Unicap!5e0!3m2!1sen!2sbr!4v1716666395920!5m2!1sen!2sbr" width={500} height={300}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </article>
                    <article className={styles.doctorBox}>
                        <div className={styles.doctorContent}>
                            <div className={styles.doctorInfo}>
                                <img src="https://github.com/IagoCarvalhoG.png" alt="" />
                                <div>
                                    <strong>Iago Carvalho</strong>
                                    <p>Nutricionista (Nutrição para diabetes, Nutrição nas doenças crônicas, Modulação intestinal, Nutrição autoimunes)</p>
                                    <span>feedbacks count: 10</span>
                                </div>
                            </div>
                            <div className={styles.doctorAddress}>
                                <div>
                                    <button className={styles.active}>Address 1</button>
                                    <button>Address 2</button>
                                </div>
                                <div className={styles.addressText}>
                                    <MapPinLine size={20}/>
                                    <span>Av. Eng. Domingos Ferreira, 636 - Loja 26</span>
                                </div>
                            </div>
                        </div>
                        <iframe className={styles.maps} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.4558560739238!2d-34.89033712588267!3d-8.054895491972536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18ea6e481ed1%3A0x2bd9d6c2a072628d!2sUniversidade%20Cat%C3%B3lica%20de%20Pernambuco%20-%20Polo%20Ead%20Unicap!5e0!3m2!1sen!2sbr!4v1716666395920!5m2!1sen!2sbr" width={500} height={300}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </article>
                </div>
            </div>

        </main>
    )
}
