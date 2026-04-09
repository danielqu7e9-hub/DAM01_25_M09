import express from "express";
import camisetesRouter from './routes/camisetes.routes.js';
import comandesRouter from './routes/comandes.routes.js';
import cors from 'cors';

const app = express();

const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
 console.log(req.method, req.url);
 next();
});

app.use('/api/camisetes', camisetesRouter);
app.use('/api/comandes', comandesRouter);

app.use((err, req, res, next) => {
 console.error(err.message);
 res.status(500).json({ message: "Error intern" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;