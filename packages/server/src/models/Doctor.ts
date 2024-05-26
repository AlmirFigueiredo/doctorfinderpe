import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Doctor extends Model {
    public doctor_id!: number;
    public user_id!: number;
    public address!: string;
    public specialty!: string;
    public accept_money!: boolean;
    public accept_plan!: boolean;
}

Doctor.init(
    {
        doctor_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accept_money: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        accept_plan: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'doctor',
    }
);

export default Doctor;
