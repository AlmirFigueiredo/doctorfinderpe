import express from 'express';
import sequelize from './config/database';
import adminRoutes from './routes/adminRoutes';
import doctorRoutes from './routes/doctorRoutes';
import userRoutes from './routes/userRoutes';
import patientRoutes from './routes/patientRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import availabilityRoutes from './routes/avaliabilityRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import addressRoutes from './routes/addressRoutes';
import authRouter from './routes/authRouter'
import cors from 'cors';


import './models/User';
import './models/Doctor';
import './models/address';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware para processar JSON
app.use(express.json());

// Rota para a URL raiz
app.get('/', (req, res) => {
    res.send('Connected :D');
});

app.use('/auth', authRouter)
app.use('/Admins', adminRoutes); //http://localhost:3000/Admins
app.use('/Doctors', doctorRoutes); //http://localhost:3000/Doctors
app.use('/Users', userRoutes); //http://localhost:3000/Users
app.use('/Patients', patientRoutes); //http://localhost:3000/Patients
app.use('/Appointments', appointmentRoutes); //http://localhost:3000/Appointments
app.use('/Availabilities', availabilityRoutes); //http://localhost:3000/Availabilities
app.use('/Feedbacks', feedbackRoutes); //http://localhost:3000/Feedbacks
app.use('/Address', addressRoutes); //http://localhost:3000/Address

if (process.env.NODE_ENV !== 'test') {
    // Testar conexão com o banco de dados
    sequelize.authenticate()
        .then(() => {
            console.log('Database connected successfully.');
        })
        .catch((error: any) => {
            console.error('Unable to connect to the database:', error);
        });
        
    sequelize.sync({ alter: true })
        .then(() => {
            console.log('All models were synchronized successfully.');
        })
        .catch((error) => {
            console.error('Error synchronizing models:', error);
        });

    // Iniciar o servidor
    app.listen(port, () => {
        console.log("Server is running on port ${port}");
    });
}

export { app, sequelize };