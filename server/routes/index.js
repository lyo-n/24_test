import {Router} from 'express';
import accRouter from '../controllers/accController.js';
const router = new Router();

router.post('/accountsNew', accRouter.create);
router.get('/accounts', accRouter.getAll);
router.get('/accounts/filter', accRouter.getCompanies);
router.get('/:_id', accRouter.updateAcc)
router.delete('/:_id', accRouter.delete) 


export default router