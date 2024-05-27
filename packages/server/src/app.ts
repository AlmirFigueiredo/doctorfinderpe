import express from 'express';
import sequelize from './config/database';
//import Admin from './models/Admin';
import adminRoutes from './routes/adminRoutes';
import doctorRoutes from './routes/doctorRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Rota para a URL raiz
app.get('/', (req, res) => {
  res.send('Connected :D');
});

// Usar as rotas do adm
app.use('/Admins', adminRoutes); //http://localhost:3000/Admins
app.use('/Doctors', doctorRoutes); //http://localhost:3000/Doctors
app.use('/Users', userRoutes); //http://localhost:3000/Users

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