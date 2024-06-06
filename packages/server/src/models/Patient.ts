import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Patient extends Model {
    public patient_id!: number;
    public user_id!: number;
    public plan!: string;
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
        plan: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'patients',
        hooks: {
            beforeCreate: async (patient, options) => {
                const user = await User.findByPk(patient.user_id);
                if (!user) {
                    throw new Error('user_id not found');
                }
            },
        },
    }
);

if (process.env.NODE_ENV !== 'test') {
    Patient.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    
}

export default Patient;
