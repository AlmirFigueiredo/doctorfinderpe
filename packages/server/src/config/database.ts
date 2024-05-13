import { Sequelize } from 'sequelize';  
import dotenv from 'dotenv';           

dotenv.config(); 

const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize; 
