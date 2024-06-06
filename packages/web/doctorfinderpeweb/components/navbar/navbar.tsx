"use client"
import styles from "./navbar.module.css"
import Link from "next/link"
import React, { useEffect } from 'react';
import { useAuth } from "@/context/authContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const { isLoggedIn, user, login, logout } = useAuth();

    function handleLogout() {
        logout()
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.center}>
                <div className={styles.logoAndLinks}>
                    <h1>
                        <Link href="/">DoctorFinderPE</Link>
                    </h1>
                    <ul>
                        <li>
                            <Link href="#">Trabalhe Conosco</Link>
                        </li>
                        <li>
                            <Link href="#">Perguntas Frequentes</Link>
                        </li>
                        <li>
                            <Link href="/search">Médicos</Link>
                        </li>
                    </ul>
                </div>
                {isLoggedIn ? (
                    <div className={styles.btn}>
                        <Link href={`/profile/${user.username}`} className={styles.signIn}>{user.name}</Link>
                        <button className={styles.signUp} onClick={handleLogout}>Sair</button>
                    </div>
                ) : <div className={styles.btn}>
                    <Link className={styles.signIn} href="/login">Entrar</Link>
                    <Link className={styles.signUp} href="/register">Registrar-se</Link>
                </div>
                }

                <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                        <ul>
                            <li>
                                <Link href="#">Trabalhe Conosco</Link>
                            </li>
                            <li>
                                <Link href="#">Perguntas Frequentes</Link>
                            </li>
                            <li>
                                <Link href="/search">Médicos</Link>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <span className={styles.signIn}>{user.name}</span>
                                    </li>
                                    <li>
                                        <button className={styles.signUp} onClick={logout}>Sair</button>
                                    </li>
                                </>
                            ) : <>
                                <li>
                                    <Link href="/login">Entrar</Link>
                                </li>
                                <li>
                                    <Link href="/register">Registrar-se</Link>
                                </li>
                            </>
                            }

                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}
