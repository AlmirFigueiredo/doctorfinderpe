import { Router } from 'express';
import { 
    getAllPatientsController, 
    createPatientController, 
    getPatientByIdController, 
    updatePatientController, 
    deletePatientController, 
    getPatientAppointmentsController,
} from '../controllers/patientController';

const router = Router();

router.get('/', getAllPatientsController);
router.post('/', createPatientController);
router.get('/:id', getPatientByIdController);
router.put('/:id', updatePatientController);
router.delete('/:id', deletePatientController);
router.get('/appointments/:id', getPatientAppointmentsController)

export default router;