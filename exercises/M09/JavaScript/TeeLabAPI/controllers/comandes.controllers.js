import * as comandesService from '../services/comandes.services.js'

// GET /api/comandes
export function getAll(req, res) {
    let comandes = comandesService.getAll();
    res.status(200).json(comandes);
}

// GET /api/comandes:id
export function getById(req, res) {
    let comanda = comandesService.getById(req.params.id);

    if (!comanda || comanda.length === 0) return res.status(404).json({ error: "Comanda innexistent" });

    res.json(comanda);
}

// POST /api/comandes
export function create(req, res) {
    const comanda = comandesService.create(req.body);

    if (comanda.error) {
        return res.status(400).json( { error : comanda.error } )
    }

    res.status(201).json( comanda );
}