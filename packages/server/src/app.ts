import express from 'express';
import sequelize from './config/database';
import Admin from './models/Admin';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Rota para a URL raiz
app.get('/', (req, res) => {
  res.send('Connected :D');
});

app.post('/createAdmin', async (req, res) => {
  try {
    const { id, admName, surname, birthday, username, password } = req.body;

    // Verificação simples dos dados recebidos
    if (!id || !admName || !surname || !birthday || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Criação de um novo administrador
    const newAdmin = await Admin.create({
      admName,
      surname,
      birthday,
      username,
      password,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Testar conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});