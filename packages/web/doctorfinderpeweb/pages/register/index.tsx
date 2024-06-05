"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./register.module.css";
import { api } from "@/lib/axios";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

type InitialFormData = {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  cpf: string;
  rg: string
};

type DoctorFormData = {
  speciality: string;
  CRM: string;
};

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter()
  const [initialFormData, setInitialFormData] = useState<InitialFormData>({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    cpf: "",
    rg: ""
  });

  useEffect(() => {
    if(isLoggedIn) {
      router.push('/')
    }
}, [isLoggedIn])

  const [doctorFormData, setDoctorFormData] = useState<DoctorFormData>({
    speciality: "",
    CRM: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDoctorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    let formData = { ...initialFormData };
    if (initialFormData.role === 'Doctor') {
      formData = { ...formData, ...doctorFormData };
    }
    
    try {
      const response = await api.post('/users', formData);
    
      if (response.status) {
        console.log('Success');
        router.push('/login')
      } else {
        console.log('Account already created, I suppose');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1>DoctorFinder</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.registerBox}>
          <h1>Crie sua conta agora</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                name="username"
                required
                value={initialFormData.username}
                onChange={handleChange}
                type="text"
                placeholder="Nome de Usuário"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="name"
                required
                value={initialFormData.name}
                onChange={handleChange}
                type="text"
                placeholder="Nome"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="email"
                required
                value={initialFormData.email}
                onChange={handleChange}
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="password"
                required
                value={initialFormData.password}
                onChange={handleChange}
                type="password"
                placeholder="Senha"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="cpf"
                required
                value={initialFormData.cpf}
                onChange={handleChange}
                type="text"
                placeholder="cpf"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="rg"
                required
                value={initialFormData.rg}
                onChange={handleChange}
                type="text"
                placeholder="rg"
              />
            </div>
            <div className={styles.formGroup}>
              <span>Você é paciente ou médico?</span>
              <div>
                <label htmlFor="Patient">Paciente</label>
                <input
                  value="Patient"
                  onChange={handleChange}
                  checked={initialFormData.role === "Patient"}
                  type="radio"
                  name="role"
                  id="Patient"
                />
              </div>
              <div>
                <label htmlFor="Doctor">Médico</label>
                <input
                  value="Doctor"
                  onChange={handleChange}
                  checked={initialFormData.role === "Doctor"}
                  type="radio"
                  name="role"
                  id="Doctor"
                />
              </div>
            </div>
            {initialFormData.role === "Doctor" && (
              <>
                <div className={styles.formGroup}>
                  <input
                    name="speciality"
                    value={doctorFormData.speciality}
                    required
                    onChange={handleDoctorChange}
                    type="text"
                    placeholder="speciality"
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    name="CRM"
                    value={doctorFormData.CRM}
                    required
                    onChange={handleDoctorChange}
                    type="text"
                    placeholder="CRM"
                  />
                </div>
              </>
            )}
            <button type="submit">Cria conta</button>
          </form>
          <div className={styles.createAccountLogin}>
            <span>Já tem uma conta?</span>
            <a href="./login"> Fazer login aqui!</a>
          </div>
        </div>
      </div>
    </>
  );
}
