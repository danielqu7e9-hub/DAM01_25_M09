import { Router } from 'express';
import * as camisetesController from '../controllers/camisetes.controllers.js';

const router = Router();

router.get("/", camisetesController.getAll);
router.get("/:id", camisetesController.getById);

export default router;