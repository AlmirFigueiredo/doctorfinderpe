import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Doctor extends Model {
    public doctor_id!: number;
    public user_id!: number;
    public address_id!: string;
    public crm!: string;
    public specialty!: string;
    public accept_money!: boolean;
    public accept_plan!: boolean;
    public description!: string;
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
        crm: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accept_money: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        accept_plan: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'doctors',
        hooks: {
            beforeCreate: async (doctor, options) => {
                const user = await User.findByPk(doctor.user_id);
                if (!user) {
                    throw new Error('user_id not found');
                }
            },
            beforeBulkCreate: async (doctors, options) => {
                const userIds = doctors.map(doctor => doctor.user_id);
                const users = await User.findAll({
                    where: {
                        user_id: userIds,
                    },
                });
                const existingUserIds = users.map(user => user.user_id);
                doctors.forEach(doctor => {
                    if (!existingUserIds.includes(doctor.user_id)) {
                        throw new Error(`user_id ${doctor.user_id} not found`);
                    }
                });
            },
        },
    }
);

if (process.env.NODE_ENV !== 'test') {
    User.hasOne(Doctor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Doctor.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
}

export default Doctor;
