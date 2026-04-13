import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

let CLIENTS = 0;

app.get('/entreno/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const peso = req.query.peso;
    const altura = req.query.altura;

    CLIENTS += 1;

    const worker = new Worker('./calcular-entreno.js', {
        workerData: { nombre, peso, altura }
    });

    worker.on('message', (resultat) => {
        res.json(resultat);
        CLIENTS -= 1;
    });
});

app.get('/ping', (req, res) => {
    res.json({ servidor: "vivo" });
});

app.get('/usuarios-activos', (req, res) => {
    res.json({ enCurs: CLIENTS });
});
