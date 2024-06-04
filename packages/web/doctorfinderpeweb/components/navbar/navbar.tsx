"use client"
import styles from "./navbar.module.css"
import Link from "next/link"
import React from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.center}>
                <div className={styles.logoAndLinks}>
                    <h1>DoctorFinderPE</h1>
                    <ul>
                        <li>
                            <Link href="#">Trabalhe Conosco</Link>
                        </li>
                        <li>
                            <Link href="#">Perguntas Frequentes</Link>
                        </li>
                        <li>
                            <Link href="#">Médicos</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.btn}>
                    <Link className={styles.signIn} href="/login">Entrar</Link>
                    <Link className={styles.signUp} href="/register">Registrar-se</Link>
                </div>
                <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                        <ul>
                            <li>
                                <Link href="#">Work with us</Link>
                            </li>
                            <li>
                                <Link href="#">FAQ</Link>
                            </li>
                            <li>
                                <Link href="#">Doctors</Link>
                            </li>
                            <li>
                                <Link href="/login">Sign in</Link>
                            </li>
                            <li>
                                <Link href="/register">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}
