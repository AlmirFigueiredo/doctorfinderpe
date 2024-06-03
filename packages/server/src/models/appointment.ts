import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Doctor from './Doctor';
import Patient from './Patient';
import Address from './address';

class Appointment extends Model {
    public appointment_id!: number;
    public doctor_id!: number;
    public patient_id!: number;
    public address_id!: number;
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
            onDelete: 'CASCADE', 
            references: {
                model: Doctor,
                key: 'doctor_id',
            },
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE', 
            references: {
                model: Address,
                key: 'address_id',
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
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    
    {
        sequelize,
        tableName: 'appointment',
    }
);
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

Address.hasMany(Appointment, { foreignKey: 'address_id' });
Appointment.belongsTo(Address, { foreignKey: 'address_id' });


export default Appointment;
