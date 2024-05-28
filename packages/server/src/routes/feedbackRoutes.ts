import { Router } from 'express';
import { 
    getAllFeedbacksController, 
    createFeedbackController, 
    getFeedbackByIdController, 
    updateFeedbackController, 
    deleteFeedbackController 
} from '../controllers/feedbackController';

const router = Router();

router.get('/', getAllFeedbacksController);
router.post('/', createFeedbackController);
router.get('/:id', getFeedbackByIdController);
router.put('/:id', updateFeedbackController);
router.delete('/:id', deleteFeedbackController);

export default router;