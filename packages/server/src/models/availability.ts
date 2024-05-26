import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Availability extends Model {
    public disponibilidade_id!: number;
    public medico_id!: number;
    public dia!: string;
    public hora_inicio!: string;
    public hora_fim!: string;
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
        tableName: 'disponibilidade',
    }
);

export default Availability;
