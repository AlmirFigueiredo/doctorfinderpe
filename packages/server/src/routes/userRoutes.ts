import { Router } from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getUserByUsernameController,
} from '../controllers/userController';

const router = Router();

router.post('/', createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
router.get('/profile/:username', getUserByUsernameController);

export default router;