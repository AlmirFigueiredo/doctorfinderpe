import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config(); //Carregar as variaveis do .env, voce nao vai ver esse arquivo pq ta no gitignore, ent cria ai

const app = express();
const port = process.env.PORT || 3000; // => Porta padrao ta 3000, ent vai ser localhost:3000/

app.use(express.json());
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/admins', adminRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);   //Provavelmetne vai ocorrer isso, porque tu nao leu oq eu disse la em cima e nao adicionou o link do banco de dados pra testar, vai la no database.ts que ta explicado como
});


//Como que faz pra rodar essa aplicacao? yarn build e depois de buildar voce da um yarn start (TEM QUE ESTAR NO packages/server/)
//Se quiser fazer por enquanto um script que faz ambos, fica a vontade ai...
//OBS: se nao sabe oq esta fazendo, nao inventa, pergunta a alguem ou testa antes de dar commit