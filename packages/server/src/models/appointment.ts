import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Appointment extends Model {
    public appointment_id!: number;
    public doctor_id!: number;
    public patient_id!: number;
    public data!: string;
    public hour!: string;
    public status!: string;
}

Appointment.init(
    {
        appointment_id: {
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
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'appointment',
    }
);

export default Appointment;
