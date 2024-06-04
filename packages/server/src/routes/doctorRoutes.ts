import { Router } from 'express';
import {
  createDoctorController,
  getAllDoctorsController,
  getDoctorByIdController,
  updateDoctorController,
  deleteDoctorController,
  getDoctorsByCityController
} from '../controllers/doctorController';

const router = Router();

router.post('/', createDoctorController);
router.get('/', getAllDoctorsController);
router.get('/:id', getDoctorByIdController);
router.put('/:id', updateDoctorController);
router.delete('/:id', deleteDoctorController);
router.get('/city/:city', getDoctorsByCityController)

export default router;