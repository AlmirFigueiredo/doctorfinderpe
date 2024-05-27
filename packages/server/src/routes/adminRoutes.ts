import express from 'express';
import { 
    getAllAdminsController, 
    createAdminController, 
    getAdminByIdController, 
    updateAdminController, 
    deleteAdminController 
} from '../controllers/adminController';

const router = express.Router();

router.get('/', getAllAdminsController);
router.post('/', createAdminController);
router.get('/:id', getAdminByIdController);
router.put('/:id', updateAdminController);
router.delete('/:id', deleteAdminController);

export default router;