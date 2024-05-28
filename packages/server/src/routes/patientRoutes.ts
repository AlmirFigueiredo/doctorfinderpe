import { Router } from 'express';
import { 
    getAllPatientsController, 
    createPatientController, 
    getPatientByIdController, 
    updatePatientController, 
    deletePatientController 
} from '../controllers/patientController';

const router = Router();

router.get('/', getAllPatientsController);
router.post('/', createPatientController);
router.get('/:id', getPatientByIdController);
router.put('/:id', updatePatientController);
router.delete('/:id', deletePatientController);

export default router;