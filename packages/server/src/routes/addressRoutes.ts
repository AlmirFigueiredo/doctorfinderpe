import { Router } from 'express';
import { 
    getAllAddressController, 
    createAddressController, 
    getAddressByIdController, 
    updateAddressController, 
    deleteAddressController 
} from '../controllers/addressController';

const router = Router();

router.get('/', getAllAddressController);
router.post('/', createAddressController);
router.get('/:id', getAddressByIdController);
router.put('/:id', updateAddressController);
router.delete('/:id', deleteAddressController);

export default router;