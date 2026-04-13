import { Router } from 'express';
import * as comandesController from '../controllers/comandes.controllers.js';

const router = Router();

router.post("/", comandesController.create);
router.get("/", comandesController.getAll);
router.get("/:id", comandesController.getById);

export default router;