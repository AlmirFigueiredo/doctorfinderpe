import { Router } from 'express';
import { getAllAdminsController } from '../controllers/adminController';

const router = Router();


router.get('/', getAllAdminsController); // Rota exemplo -> n eh eficiente ter uma rota que retorna todo mundo
// rotas para o CRUD -> Create, Read, Update e Delete -> Fazer por pessoa e nao para todos de uma vez 

export default router;
