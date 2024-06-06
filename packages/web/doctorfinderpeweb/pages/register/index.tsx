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
  specialty: string;
  crm: string;
  zip_code: string;
  local_number: string;
  street: string;
  neighborhood: string;
  complement: string;
  city: string;
  local_phone: string;
  street_number: string
};

export default function Login() {
  const [errorToConnect, setErrorToConnect] = useState(false)
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
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn])

  const [doctorFormData, setDoctorFormData] = useState<DoctorFormData>({
    specialty: "",
    crm: "",
    zip_code: "",
    local_number: "",
    street: "",
    neighborhood: "",
    complement: "",
    city: "",
    local_phone: "",
    street_number: ""
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
      const response = await api.post('/Users', formData);

      if (response.status) {
        console.log('Success');
        router.push('/login')
      } else {
        console.log('Account already created, I suppose');
      }
    } catch (error) {
      setErrorToConnect(true)
      console.log("Ocorreu um problema durante a criação da conta");
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
                    name="specialty"
                    value={doctorFormData.specialty}
                    required
                    onChange={handleDoctorChange}
                    type="text"
                    placeholder="specialty"
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    name="crm"
                    value={doctorFormData.crm}
                    required
                    onChange={handleDoctorChange}
                    type="text"
                    placeholder="crm"
                  />
                </div>
                <div className={styles.endereço}>
                  <div className={styles.formGroup}>
                    <input
                      name="zip_code"
                      value={doctorFormData.zip_code}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="cep"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="local_number"
                      value={doctorFormData.local_number}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="número"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="street"
                      value={doctorFormData.street}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Rua"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="complement"
                      value={doctorFormData.complement}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Complemento"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="neighborhood"
                      value={doctorFormData.neighborhood}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Bairro"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="city"
                      value={doctorFormData.city}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Cidade"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="local_phone"
                      value={doctorFormData.local_phone}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Número do consultório"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      name="street_number"
                      value={doctorFormData.street_number}
                      required
                      onChange={handleDoctorChange}
                      type="text"
                      placeholder="Número da rua"
                    />
                  </div>
                </div>
              </>
            )}
            {errorToConnect && (
              <p className={styles.loginError}>Ocorreu um problema durante a Criação da conta</p>
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
