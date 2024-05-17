import './config/dotenv'
import express, { Request, Response } from 'express';
import cors from 'cors';
import sequelize from './config/database'; 
import User from './models/user'; 

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  console.log('Home!');
  res.sendStatus(200);
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err: any) {
        return res.status(400).send(err);
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
    }
})();