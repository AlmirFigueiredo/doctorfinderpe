import { Sequelize } from 'sequelize';  
import dotenv from 'dotenv';           

dotenv.config(); 
//console.log(process.env.POSTGRES_URL); 
const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    // Esse ssl eh so pra producao, se for testar local, pode tirar
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  }
});

export default sequelize; 
//p rodar: abre o cmd no server, bota:
//npm run dev
//abre no browser: 
//http://localhost:3000/
