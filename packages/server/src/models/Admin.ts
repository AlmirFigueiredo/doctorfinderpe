import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

import User from './User';

class Admin extends Model {
    public admin_id!: number;
    public user_id!: number;
    public role!: string;
}

Admin.init(
    {
        admin_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: User,
                key: 'user_id',
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'admins'
    }
);
Admin.hasOne(User, { foreignKey: 'user_id' });
User.belongsTo(Admin, { foreignKey: 'user_id' });


export default Admin;