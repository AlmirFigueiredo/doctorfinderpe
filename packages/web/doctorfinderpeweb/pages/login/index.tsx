"use client"
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { api } from "@/lib/axios";
import { useRouter } from 'next/router'
import { useAuth } from "@/context/authContext";

type FormData = {
    email: string;
    password: string;
}

export default function Login() {
    const { isLoggedIn, login } = useAuth();
    const [errorToConnect, setErrorToConnect] = useState(false)
    const router = useRouter()
    const [formData, setFormData] = React.useState<FormData>({
        email: "",
        password: ""
    });

    useEffect(() => {
        if(isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            
            if (response.status) {
                console.log('logged');
                localStorage.setItem('auth-token-doctorfinderpe', JSON.stringify(response.data.token))
                login()
                router.push('/')

            } else {
                console.log('account already created I suppose');
            }
        } catch (error) {
            setErrorToConnect(true)
            console.log("Ocorreu um problema durante a Autenticação");
        }
    }
    console.log(errorToConnect)
    return (
        <>
            <header className={styles.header}>
                <h1>DoctorFinder</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <h1>Faça login em sua conta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="E-mail" />
                        </div>
                        <div className={styles.formGroup}>
                            <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Senha" />
                        </div>
                        {errorToConnect && (
                            <p className={styles.loginError}>Ocorreu um problema durante a Autenticação</p>
                        )}
                        <button onClick={handleSubmit}>Entrar</button>
                    </form>
                    <div className={styles.forgetPassword}>
                        <a href="#">Esqueceu sua senha?</a>
                    </div>
                    <div className={styles.createAccountLogin}>
                        <span>Ainda não tem uma conta?</span>
                        <a href="./register"> Faça seu cadastro!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
