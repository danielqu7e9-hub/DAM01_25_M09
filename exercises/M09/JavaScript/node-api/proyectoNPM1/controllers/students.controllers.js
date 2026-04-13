import * as studentsService from '../services/students.services.js'

// GET /students
export function getAll(req, res) {
    res.status(200).json(studentsService.getAll());
}

// GET /students/:id
export function getById(req, res) {
    // 1. Extraer id de la URL. Buscar alumno en el array
    const student = studentsService.getById(req.params.id);

    // 3. Si no existe → 404
    if (!student) return res.status(404).json({ message: "Not Found" })
    
    // Si existeix retornar
    res.json(student);
}

// CREATE /students
export function create(req, res) {
    const newStudent = studentsService.create(req.body);

    if (newStudent.error) {
        const status = newStudent.status || 400;
        return res.status(status).json( { message: newStudent.error } );
    }

    res.status(201).json( { message: "Created", student: newStudent.data } );
}

// POST /students/:id
export function update(req, res) {
    const studentUpdate = studentsService.update(req.params.id, req.body);

    if (!studentUpdate) return res.status(404).json( { message: "Not Found" } );
    res.json(studentUpdate);
}

// DELETE /students/:id
export function remove(req, res) {
    const studentRemove = studentsService.remove(req.params.id);

    if (!studentRemove) return res.status(404).json( { message: "Not Found" } );
    res.sendStatus(204);
}