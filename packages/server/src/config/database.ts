import { Sequelize } from 'sequelize';  
import dotenv from 'dotenv';           

dotenv.config(); 
const databaseUrl = process.env.POSTGRES_URL || 'postgresql://postgres:postgres@localhost:5432/postgres' 
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize; 

