import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Doctor extends Model {
    public medico_id!: number;
    public user_id!: number;
    public endereco!: string;
    public especialidade!: string;
    public aceita_dinheiro!: boolean;
    public aceita_plano!: boolean;
}

Doctor.init(
    {
        medico_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        especialidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aceita_dinheiro: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        aceita_plano: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'medicos',
    }
);

export default Doctor;
