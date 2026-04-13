import express from 'express';
import { fork } from 'child_process';

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

app.get('/jugar/:nombre', (req, res) => {
    const nom = req.params.nombre;

    const hijo = fork('./sorteo_tres.js');
    hijo.send({ comando: 'empezar_gambling', nombre: nom });

    hijo.on('message', (resultat) => {
        res.json(resultat);
    });
});