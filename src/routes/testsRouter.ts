import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import validateToken from '../middlewares/validateToken';
import newTestSchema from '../schemas/newTestSchema';
import * as testsController from '../controllers/testsController';

const router = Router();

router.post("/tests/new", validateToken, validateSchemaMiddleware(newTestSchema), testsController.newTest);
router.get("/tests/disciplines", validateToken, testsController.getTestsByDisciplines);
router.get("/tests/teachers", validateToken, testsController.getTestsByTeachers);

export default router;