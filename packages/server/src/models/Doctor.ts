import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

import User from './User';

class Doctor extends Model {
    public doctor_id!: number;
    public user_id!: number;
    public address!: string;
    public crm!: String;
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

            references: {
                model: User,
                key: 'user_id',
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crm: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: false,
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

User.hasOne(Doctor, { foreignKey: 'user_id' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });

Doctor.beforeCreate(async (doctor, options) => {
    const user = await User.findByPk(doctor.user_id);
    if (!user) {
        throw new Error('user_id não encontrado na tabela users');
    }
});

export default Doctor;