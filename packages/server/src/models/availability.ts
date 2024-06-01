import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Doctor from './Doctor';

class Availability extends Model {
    public availability_id!: number;
    public doctor_id!: number;
    public day!: string;
    public start_time!: string;
    public end_time!: string;
}

Availability.init(
    {
        availability_id: {
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
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'availability',
    }
);

Doctor.hasMany(Availability, { foreignKey: 'doctor_id' });
Availability.belongsTo(Doctor, { foreignKey: 'doctor_id' });
export default Availability;
