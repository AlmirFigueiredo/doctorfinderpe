import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Feedback extends Model {
    public feedback_id!: number;
    public medico_id!: number;
    public paciente_id!: number;
    public comentario!: string;
    public data!: string;
}

Feedback.init(
    {
        feedback_id: {
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
        comentario: {
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
        tableName: 'feedbacks',
    }
);

export default Feedback;
