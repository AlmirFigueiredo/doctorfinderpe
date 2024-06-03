import { Sequelize } from 'sequelize';  
import dotenv from 'dotenv';           

dotenv.config(); 
const databaseUrl = 'postgresql://docker:docker@localhost:5432/doctorfinder' 
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
});

export default sequelize; 

