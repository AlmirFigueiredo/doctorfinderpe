import { Sequelize } from 'sequelize';  
import dotenv from 'dotenv';           

dotenv.config(); 
console.log(process.env.POSTGRES_URL); 
/*
Seguinte, ta vendo que coloquei um console log pra printar aqui, isso aqui eh pra tu verificar se teu .env ta retornando
nao sabe oq eh um .env? da um google ent
tu vai ter que criar esse .env no server/
e colocar POSTGRES_URL = ai tu coloca aqui o link do teu postgres localhost
"Eu nao sei qual eh o link do meu banco local..."
- Da um google ou chatgpt!
*/
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
