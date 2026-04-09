import express from 'express';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

/***************************************
 ************ CHILD PROCESS ************
 ***************************************/
/*
 import { execFile } from 'child_process';

app.get('/sumar', (req, res) => {
    const numeros = [1, 2, 3, 4, 5];

    console.log("Node hace GET")

    // Lanza el script en un proceso separado
    execFile('node', ['tarea-pesada.js', JSON.stringify(numeros)],
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: 'Falló el proceso' });
            }
            const datos = JSON.parse(stdout);
            res.json(datos); // → { resultado: 15 }
        }
    );
    // Mientras tanto, Node sigue atendiendo otras peticiones
});
*/



/***************************************
 ************ WORKER THREAD ************
 ***************************************/

 
import { Worker } from 'worker_threads';

app.get('/jugar/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    // Crea el worker y le pasa los datos
    const worker = new Worker('./worker.js', {
        workerData: { nombre }            // pasa objetos directamente (no solo strings)
    });

    // Escucha el resultado
    worker.on('message', (datos) => {
        res.json(datos);
    });

    // Gestiona errores
    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
});


app.get('/estado', (req, res) => {
    res.json({ servidor: "vivo" });
});


