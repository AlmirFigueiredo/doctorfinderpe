"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./register.module.css";
import { api } from "@/lib/axios";

type InitialFormData = {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

type DoctorFormData = {
  speciality: string;
  CRM: string;
};

export default function Login() {
  const [initialFormData, setInitialFormData] = useState<InitialFormData>({
    username: "",
    name: "",
    email: "",
    password: "",
    role: ""
  });

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
    if (initialFormData.role === 'doctor') {
      formData = { ...formData, ...doctorFormData };
    }
    
    
    try {
      const response = await api.post('/users', formData);
      if (response.status) {
        console.log(response.data)
        console.log('Success');
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
          <h1>Create Your Account here</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                name="username"
                required
                value={initialFormData.username}
                onChange={handleChange}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                name="name"
                required
                value={initialFormData.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
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
                placeholder="Password"
              />
            </div>
            <div className={styles.formGroup}>
              <span>Select Your Role</span>
              <div>
                <label htmlFor="client">Client</label>
                <input
                  value="client"
                  onChange={handleChange}
                  checked={initialFormData.role === "client"}
                  type="radio"
                  name="role"
                  id="client"
                />
              </div>
              <div>
                <label htmlFor="doctor">Doctor</label>
                <input
                  value="doctor"
                  onChange={handleChange}
                  checked={initialFormData.role === "doctor"}
                  type="radio"
                  name="role"
                  id="doctor"
                />
              </div>
            </div>
            {initialFormData.role === "doctor" && (
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
            <button type="submit">Register</button>
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
