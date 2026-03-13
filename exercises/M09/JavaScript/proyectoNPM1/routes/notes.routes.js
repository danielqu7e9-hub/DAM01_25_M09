import { Router } from 'express';
import * as notesController from '../controllers/notes.controllers.js';

const router = Router();

router.get("/", notesController.getAll);
router.get("/:id", notesController.getById);
router.post("/", notesController.create);
router.put("/:id", notesController.update);
router.delete("/:id", notesController.remove);

export default router;