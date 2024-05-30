import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Doctor from './Doctor';
import Patient from './Patient';

class Feedback extends Model {
    public feedback_id!: number;
    public doctor_id!: number;
    public patient_id!: number;
    public comment!: string;
    public score!: number;
    public data!: string;
}

Feedback.init(
    {
        feedback_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', 
            references: {
                model: Doctor,
                key: 'doctor_id',
            },
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', 
            references: {
                model: Patient,
                key: 'patient_id',
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'feedback',
    }
);
Patient.hasMany(Feedback, { foreignKey: 'patient_id' });
Feedback.belongsTo(Patient, { foreignKey: 'patient_id' });

Doctor.hasMany(Feedback, { foreignKey: 'doctor_id' });
Feedback.belongsTo(Patient, { foreignKey: 'doctor_id' });

export default Feedback;
