import * as camisetesService from '../services/camisetes.services.js'
import { filtrarTalla, filtrarColor, filtrarTag, filtrarQ, aplicarSort } from '../services/camisetes.services.js'

// GET /api/camisetes
export function getAll(req, res) {
    let camisetes = camisetesService.getAll();

    camisetes = filtrarTalla(camisetes, req.query);
    camisetes = filtrarColor(camisetes, req.query);
    camisetes = filtrarTag(camisetes, req.query);
    camisetes = filtrarQ(camisetes, req.query);
    camisetes = aplicarSort(camisetes, req.query);

    if (camisetes.error) return res.status(400).json(camisetes.error);

    res.status(200).json(camisetes);
}

// GET /api/camisetes:id
export function getById(req, res) {
    const camiseta = camisetesService.getById(req.params.id);

    if (!camiseta || camiseta.length === 0) return res.status(404).json({ error: "Camiseta no encontrada" });
    
    res.json(camiseta);
}