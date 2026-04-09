import request from 'supertest';
import app from '../server.js';

const comandaOK = {
    cliente: { nombre: "Ana Garcia", email: "ana@mail.com" },
    direccion: { calle: "Carrer Major 1", cp: "08400", ciudad: "Granollers" },
    items: [{ camisetaId: 1, talla: "M", color: "negre", cantidad: 2 }]
};

test('POST comanda OK → 201', async () => {
    const res = await request(app).post('/api/comandes').send(comandaOK);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.total).toBeGreaterThan(0);
});

test('POST comanda amb camisetaId inválid → 400', async () => {
    const res = await request(app).post('/api/comandes').send({
        ...comandaOK,
        items: [{ camisetaId: 9999, talla: "M", color: "negre", cantidad: 1 }]
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
});

test('GET comanda inexistent → 404', async () => {
    const res = await request(app).get('/api/comandes/ORD-9999');
    expect(res.status).toBe(404);
});