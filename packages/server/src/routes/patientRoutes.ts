import { Router } from 'express';
import { getAllPatientsController } from '../controllers/patientController';

const router = Router();

router.get('/', getAllPatientsController);
// Essa rota nao eh eficiente, porque ela retorna tudo, faz as rotas para o CRUD por usuario -> Create, Read, Update and Delete

export default router;
