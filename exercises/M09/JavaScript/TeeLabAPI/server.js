import express from "express";
import camisetesRouter from './routes/camisetes.routes.js';
import comandasRouter from './routes/comandas.routes.js'

const app = express();

const PORT = 4000;

app.use(express.json());

app.use((req, res, next) => {
 console.log(req.method, req.url);
 next();
});

app.use('/api/camisetas', camisetesRouter);
app.use('/api/comandas', comandasRouter);

app.use((err, req, res, next) => {
 console.error(err.message);
 res.status(500).json({ message: "Error intern" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
