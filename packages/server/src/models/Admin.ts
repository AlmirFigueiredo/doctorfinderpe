import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

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

export default Admin;
