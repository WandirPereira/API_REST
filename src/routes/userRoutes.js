import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveria existir
router.get('/', loginRequired, userController.index); // Lista usuários
router.get('/:id', userController.show); // Lista usuário

router.post('/', userController.store);
// router.put('/:id', userController.update);
router.put('/', loginRequired, userController.update);

// router.delete('/:id', userController.delete);
router.delete('/', loginRequired, userController.delete);

export default router;
