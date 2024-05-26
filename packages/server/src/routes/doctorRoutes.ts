import express from 'express';
import {
  createDoctorController,
  getAllDoctorsController,
  getDoctorByIdController,
  updateDoctorController,
  deleteDoctorController
} from '../controllers/doctorController';

const router = express.Router();

router.post('/', createDoctorController);
router.get('/', getAllDoctorsController);
router.get('/:id', getDoctorByIdController);
router.put('/:id', updateDoctorController);
router.delete('/:id', deleteDoctorController);

export default router;