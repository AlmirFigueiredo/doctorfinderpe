import { Router } from 'express';
import { 
    getAllAvailabilitiesController, 
    createAvailabilityController, 
    getAvailabilityByIdController, 
    updateAvailabilityController, 
    deleteAvailabilityController 
} from '../controllers/availabilityController';

const router = Router();

router.get('/', getAllAvailabilitiesController);
router.post('/', createAvailabilityController);
router.get('/:id', getAvailabilityByIdController);
router.put('/:id', updateAvailabilityController);
router.delete('/:id', deleteAvailabilityController);

export default router;