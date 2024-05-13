import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database'; 

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: number; 
  declare user_name: string;
}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING
  }
}, {
  sequelize, 
  tableName: 'users',
  timestamps: false
});

export default User; 
