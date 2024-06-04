import { Router } from 'express';
import { 
    getAllFeedbacksController, 
    createFeedbackController, 
    getFeedbackByIdController, 
    updateFeedbackController, 
    deleteFeedbackController, 
    getAllDoctorsFeedbacksController
} from '../controllers/feedbackController';

const router = Router();

router.get('/', getAllFeedbacksController);
router.post('/', createFeedbackController);
router.get('/:id', getFeedbackByIdController);
router.put('/:id', updateFeedbackController);
router.delete('/:id', deleteFeedbackController);
router.get('/doctor/:doctor_id', getAllDoctorsFeedbacksController);

export default router;