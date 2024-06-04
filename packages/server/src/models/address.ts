import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

import Doctor from './Doctor';

class address extends Model {
    public address_id !: number;
    public doctor_id !: number;
    public local_phone !: string;
    public zip_code !: string;
    public city !: string;
    public street_number!: string;
    public street!: string;
    public neighborhood!: string;
    public complement!: string;
}

address.init(
    {
        address_id: {
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
        local_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'address'
    }
);
if (process.env.NODE_ENV !== 'test') {
    address.belongsTo(Doctor, { foreignKey: 'doctor_id' });
    Doctor.hasMany(address, { foreignKey: 'doctor_id' });
}

export default address;