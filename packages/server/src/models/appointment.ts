import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Appointment extends Model {
    public agendamento_id!: number;
    public medico_id!: number;
    public paciente_id!: number;
    public data!: string;
    public hora!: string;
    public status!: string;
}

Appointment.init(
    {
        agendamento_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        medico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hora: {
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
        tableName: 'agendamentos',
    }
);

export default Appointment;
