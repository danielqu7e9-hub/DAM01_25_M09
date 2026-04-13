// Importamos Express usando ES Modules
import express from "express";
import studentsRouter from './routes/students.routes.js';
import studentsNotes from './routes/notes.routes.js';

// Creamos la instancia de la aplicación Express
const app = express();

// Definimos el puerto en una constante para facilitar su configuración
const PORT = 3000;

// Utilitzar el middleware per aconseguir l'informació del request
app.use(express.json());

// Log mínimo
app.use((req, res, next) => {
 console.log(req.method, req.url);
 next();
});

// Rutes
app.use('/students', studentsRouter);
app.use('/notes', studentsNotes);

// Middleware de errores
app.use((err, req, res, next) => {
 console.error(err.message);
 res.status(500).json({ message: "Error intern" });
});

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
