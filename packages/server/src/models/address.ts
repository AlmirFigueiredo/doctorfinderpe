import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

import Doctor from './Doctor';

class address extends Model {
    public address_id !: number;
    public doctor_id !: number;
    public zip_code!: string;
    public local_number!: string;
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
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        local_number: {
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

address.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Doctor.hasMany(address, { foreignKey: 'doctor_id' });

export default address;