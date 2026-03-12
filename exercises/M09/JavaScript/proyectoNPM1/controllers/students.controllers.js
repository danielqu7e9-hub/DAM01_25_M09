import { students } from '../data/students.data.js';

export function registerCRUD(app) {
// GET /students
app.get("/students", (req, res) => {
    return res.status(200).json(students);
})

// GET /students/:id
app.get("/students/:id", (req, res) => {

    // 1. Extraer id de la URL. Buscar alumno en el array
    const student = students.find(s => s.id === req.params.id);

    // 3. Si no existe → 404
    if (!student) return res.status(404).json({ message: "Not Found" })

    // Si existeix retornar
    res.json(student);
});

// DELETE /students/:id
app.delete("/students/:id", (req, res) => {
    // 1. Extraer id de la URL. Buscar alumno en el array
    const student = students.find(s => s.id === req.params.id);

    if (!student) return res.status(404).json({ message: "Not Found" })

    res.json(student)
    students = students.filter(s => s.id !== req.params.id);
});

// POST /students
app.post("/students", (req, res) => {
    try {
    let newStudent = req.body;

    // Revisar duplicitat ID
    if (students.some(s => s.id === newStudent.id)) return res.status(409).json({ message: "ID Estudiant ja existeix" });

    // Revisa si és un objecte
    if (!newStudent || typeof newStudent !== "object") return res.status(400).json({ message: "JSON Invalid" });

    // Revisa si te els camps
    if (!newStudent.id || !newStudent.nombre || !newStudent.curso) return res.status(400).json({ message: "Falten camps obligatoris" });

    // Agrega l'estudiant
    students.push({ id: newStudent.id, nombre: newStudent.nombre, curso: newStudent.curso });    

    return res.status(201).json({ message : "Estudiant agregat correctament" });

    } catch {
        return res.status(400).json({ message: "JSON invalid"});
    }

})

// PUT /students/:id
app.put("/students/:id", (req, res) => {
    try {
    // 1. Extraer id de la URL. Buscar alumno en el array
    const student = students.find(s => s.id === req.params.id);

    if (!student) return res.status(404).json({ message: "Not Found" })

    // Revisa si és un objecte
    if (!req.body || typeof req.body !== "object") return res.status(400).json({ message: "JSON Invalid" });

    // Revisa si te els camps
    if (!req.body.nombre || !req.body.curso) return res.status(400).json({ message: "Falten camps obligatoris" });

    student.nombre = req.body.nombre;
    student.curso = req.body.curso;

    return res.status(200).json({ message: "Alumne actualitzat" });
    } catch {
        return res.status(400).json({ message: "JSON invalid"});
    }
})
}