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
        disponibilidade_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        medico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hora_inicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        hora_fim: {
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
