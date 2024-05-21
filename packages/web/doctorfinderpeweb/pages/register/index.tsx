"use client"
import React from "react"
import styles from "./register.module.css"


export default function Login() {
    const [initialFormData, setInitialinitialFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        role: ""
    })

    const [doctorInitialFormData, setDoctorinitialFormData] = React.useState({
        license: "",
        CRM: ""
    })
    

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setInitialinitialFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleDoctorChange = (e: any) => {
        const {name, value} = e.target;
        setDoctorinitialFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        let formData = initialFormData;
        if(initialFormData.role === 'doctor') {
            formData = {
                ...formData,
                ...doctorInitialFormData
            }
        }
        const serializedBody = JSON.stringify(initialFormData);
        const fetchOptions = {
            method: 'post',
            body: serializedBody,
            headers: { 'Content-Type': 'application/json' }
        };
        
        try {
            const response = await fetch('/api', fetchOptions);

            if(response.ok) {
                console.log('success');
            } else {
                console.log('account already created i supose');
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
                <div className={styles.registerBox}>
                    <h1>Create Your Account here</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input name="username" required value={initialFormData.username} onChange={handleChange} type="text" placeholder="Username"/>
                        </div>
                        <div className={styles.formGroup}>
                            <input name="email" required value={initialFormData.email} onChange={handleChange} type="text" placeholder="E-mail"/>
                        </div>
                        <div className={styles.formGroup}>
                            <input name="password" required value={initialFormData.password} onChange={handleChange} type="password" placeholder="password"/>
                        </div>
                        <div className={styles.formGroup}>
                            <span>Select Your Role</span>
                            <div>
                                <label htmlFor="client">Client</label>
                                <input value="client" required onChange={handleChange} checked={initialFormData.role === "client"} type="radio" name="role" id="client" />
                            </div>
                            <div>
                                <label htmlFor="doctor">Doctor</label>
                                <input value="doctor" required onChange={handleChange} checked={initialFormData.role === "doctor"} type="radio" name="role" id="doctor" />
                            </div>
                        </div>
                        {
                            initialFormData.role === "doctor" ? <>
                                <div className={styles.formGroup}>
                                    <input name="license" value={doctorInitialFormData.license} required onChange={handleDoctorChange} type="text" placeholder="license"/>
                                </div>
                                <div className={styles.formGroup}>
                                    <input name="CRM" value={doctorInitialFormData.CRM} required onChange={handleDoctorChange} type="text" placeholder="CRM"/>
                                </div>
                            </> : ""
                        }
                        <button>Register</button>
                    </form>
                    
                    <div className={styles.createAccountLogin}>
                        <span>Já tem uma conta?</span>
                        <a href="#"> Fazer login aqui!</a>
                    </div>
                </div>
            </div>
            
        </>
    )
}