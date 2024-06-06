import { Router } from 'express';
import User from '../models/User';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import jwt from 'jsonwebtoken';

const router = Router();
const secretKey = 'muitosecreto';

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Account does not exist!' });
        }


        const passwordMatch = password === user.password;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }

        let additionalData = {};
        
        if (user.role === 'Doctor') {
            const doctor = await Doctor.findOne({ where: { user_id: user.user_id } });
            additionalData = { doctor_id: doctor ? doctor.doctor_id : null };
        } else if (user.role === 'Patient') {
            const patient = await Patient.findOne({ where: { user_id: user.user_id } });
            additionalData = { patient_id: patient ? patient.patient_id : null };
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                username: user.username,
                name: user.name,
                role: user.role,
                ...additionalData
            },
            secretKey,
            { expiresIn: '2h' }
        );


        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Unknown internal server error' });
        }
    }
});

export default router;
