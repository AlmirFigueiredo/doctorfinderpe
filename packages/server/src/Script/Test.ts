import  sequelize  from '../config/database';
import Admin from '../models/Admin';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import User from '../models/User';


async function testAssociations() {
    try {
        // Sincronizar os modelos com o banco de dados
        await sequelize.sync({ force: true }); // Use { force: true } apenas em ambiente de desenvolvimento para recriar tabelas

        // Criar um usuário
        const user = await User.create({
            name: 'Marcelo Henrique',
            email: 'marcelo@example.com',
            password: 'securepassword',
            role: 'doctor'
        });
        const user2 = await User.create({
            name: 'Eu Henrique',
            email: 'zzzzz@example.com',
            password: 'securepassword',
            role: 'doctor'
        });
        const user3 = await User.create({
            name: 'admiro',
            email: 'admiro@example.com',
            password: 'admiro',
            role: 'admiro'
        });

        // Criar um paciente associado ao usuário
        const patient = await Patient.create({
            user_id: user.user_id
        });
        const doc = await Doctor.create({
            user_id: user2.user_id,
            address: "sacaadad da casa do filo",
            specialty: "sugada",
            accept_money: true,
            accept_plan:true 
        });
        const admiro = await Admin.create({
            user_id: user3.user_id,
            role: user3.role
        });

        // Verificar a associação
        const userWithPatient = await User.findOne({
            where: { user_id: user2.user_id },
            include: [{ model: Patient, as: 'Patient' }]
        });

        console.log(JSON.stringify(userWithPatient, null, 2));
    } catch (error) {
        console.error('Error testing associations:', error);
    } finally {
        await sequelize.close();
    }
}

testAssociations();