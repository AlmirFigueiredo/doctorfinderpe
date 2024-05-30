import { Router } from 'express';
import { registerController, loginController } from '../controllers/authController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);

export default router;