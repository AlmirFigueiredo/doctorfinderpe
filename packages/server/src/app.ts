import express from 'express';
import dotenv from 'dotenv'; // Adiciona dotenv
import sequelize from './config/database';
import adminRoutes from './routes/adminRoutes';
import doctorRoutes from './routes/doctorRoutes';
import userRoutes from './routes/userRoutes';
import patientRoutes from './routes/patientRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import availabilityRoutes from './routes/avaliabilityRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import authRoutes from './routes/authRoutes'; // Adiciona rotas de autenticação
import authMiddleware from './Middleware/authMiddleware'; // Adiciona middleware de autenticação

dotenv.config(); // Carrega variáveis de ambiente

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Rota para a URL raiz
app.get('/', (req, res) => {
    res.send('Connected :D');
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas protegidas por autenticação
app.use('/Admins', authMiddleware, adminRoutes); //http://localhost:3000/Admins
app.use('/Doctors', authMiddleware, doctorRoutes); //http://localhost:3000/Doctors
app.use('/Users', authMiddleware, userRoutes); //http://localhost:3000/Users
app.use('/Patients', authMiddleware, patientRoutes); //http://localhost:3000/Patients
app.use('/Appointments', authMiddleware, appointmentRoutes); //http://localhost:3000/Appointments
app.use('/Availabilities', authMiddleware, availabilityRoutes); //http://localhost:3000/Availabilities
app.use('/Feedbacks', authMiddleware, feedbackRoutes); //http://localhost:3000/Feedbacks

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
        console.log(`Server is running on port ${port}`);
    });
}

export { app, sequelize };
