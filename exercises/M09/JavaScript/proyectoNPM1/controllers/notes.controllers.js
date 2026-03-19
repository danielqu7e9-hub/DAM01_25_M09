import * as notasService from '../services/notes.services.js'

// GET /notas
export function getAll(req, res) {
    res.status(200).json(notasService.getAll());
}

// GET /notas/:id
export function getById(req, res) {
    const notesAlumne = notasService.getById(req.params.id);

    if (!notesAlumne || notesAlumne.length === 0) return res.status(404).json({ message: "Not Found" });
    
    res.json(notesAlumne);
}

// CREATE /notas
export function create(req, res) {
    const newNota = notasService.create(req.body);

    if (newNota.error) {
        const status = newNota.status || 400;
        return res.status(status).json({ message: newNota.error });
    }

    res.status(201).json({ message: "Created", nota: newNota.data });
}

// PUT /notas/:id
export function update(req, res) {
    const notaUpdate = notasService.update(Number(req.params.id), req.body);

    if (!notaUpdate) return res.status(404).json({ message: "Not Found" });
    res.json(notaUpdate);
}

// DELETE /notas/:id
export function remove(req, res) {
    const notaRemove = notasService.remove(Number(req.params.id));

    if (!notaRemove) return res.status(404).json({ message: "Not Found" });
    res.sendStatus(204);
}