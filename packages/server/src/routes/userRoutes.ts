import { Router } from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController';

const router = Router();

router.post('/', createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;