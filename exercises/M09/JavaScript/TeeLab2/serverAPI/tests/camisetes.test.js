import request from 'supertest';
import app from '../server.js';

test('GET /api/camisetes → 200', async () => {
    const res = await request(app).get('/api/camisetes');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});

test('GET /api/camisetes/:id existent → 200', async () => {
    const res = await request(app).get('/api/camisetes/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
});

test('GET /api/camisetes/:id inexistent → 404', async () => {
    const res = await request(app).get('/api/camisetes/9999');
    expect(res.status).toBe(404);
});

test('GET /api/camisetes?sort=invalid → 400', async () => {
    const res = await request(app).get('/api/camisetes?sort=invalid');
    expect(res.status).toBe(400);
});