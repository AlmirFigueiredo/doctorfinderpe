import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

import User from './User';

class Patient extends Model {
    public patient_id!: number;
    public user_id!: number;
}

Patient.init(
    {
        patient_id: {
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
    },
    {
        sequelize,
        tableName: 'patients',
    }
);

Patient.hasOne(User, { foreignKey: 'user_id' });
User.belongsTo(Patient, { foreignKey: 'user_id' });


export default Patient;