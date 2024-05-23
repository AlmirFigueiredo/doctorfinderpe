import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Admin extends Model {
    public id!: number;
    //atributos
    //Ta com duvida de que saos os atributos? Ve la no banco de dados 
}

Admin.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    //Outros atributos
  },
  {
    sequelize,
    tableName: ''//Coloca o nome da tabela qui dentro,
  }
);

export default Admin;
