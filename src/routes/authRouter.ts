import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import newUserSchema from '../schemas/newUserSchema';
import loginUserSchema from '../schemas/loginUserSchema';
import * as authController from '../controllers/authController';

const router = Router();

router.post("/register", validateSchemaMiddleware(newUserSchema), authController.register);
router.post("/login", validateSchemaMiddleware(loginUserSchema), authController.login);

export default router;