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
    const { name, surname, birthday, username, password } = req.body;

    // Verificação simples dos dados recebidos
    if ( !name || !surname || !birthday || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Criação de um novo administrador
    const newAdmin = await Admin.create({
      name,
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

app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

app.put('/admins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, birthday, username, password } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.name = name || admin.name;
    admin.surname = surname || admin.surname;
    admin.birthday = birthday || admin.birthday;
    admin.username = username || admin.username;
    admin.password = password || admin.password;

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

app.delete('/admins/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
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