import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Feedback extends Model {
    public feedback_id!: number;
    public doctor_id!: number;
    public patient_id!: number;
    public comment!: string;
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
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
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

export default Feedback;
