import { Router } from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController';
import authMiddleware from '../Middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createUserController);
router.get('/', authMiddleware, getAllUsersController);
router.get('/:id', authMiddleware, getUserByIdController);
router.put('/:id', authMiddleware, updateUserController);
router.delete('/:id', authMiddleware, deleteUserController);

export default router;
