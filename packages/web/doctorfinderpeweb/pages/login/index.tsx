"use client"
import React from "react";
import styles from "./login.module.css";

type FormData = {
    email: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = React.useState<FormData>({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serializedBody = JSON.stringify(formData);
        const fetchOptions: RequestInit = {
            method: 'POST',
            body: serializedBody,
            headers: { 'Content-Type': 'application/json' }
        };

        try {
            const response = await fetch('/api', fetchOptions);

            if (response.ok) {
                console.log('success');
            } else {
                console.log('account already created I suppose');
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                        <button>Entrar</button>
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
