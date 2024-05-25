import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Admin extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public birthday!: Date;
  public username!: string;
  public password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    AdmName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'admins'
  }
);

export default Admin;
