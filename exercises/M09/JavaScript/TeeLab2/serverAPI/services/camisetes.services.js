import { camisetes } from '../data/camisetes.data.js';

export function getAll() {
    return camisetes;
}

export function getById(id) {
    return camisetes.find(c => c.id === Number(id));
}

export function filtrarTalla(camisetes, query) {
    if (query.talla == undefined) return camisetes;
    return camisetes.filter(c => c.tallas.includes(query.talla));
}

export function filtrarColor(camisetes, query) {
    if (query.color == undefined) return camisetes;
    return camisetes.filter(c => c.colores.includes(query.color));
}

export function filtrarTag(camisetes, query) {
    if (query.tag == undefined) return camisetes;
    return camisetes.filter(c => c.tags.includes(query.tag));
}

export function filtrarQ(camisetes, query) {
    if (query.q == undefined) return camisetes;
    const q = query.q.toLowerCase();
    return camisetes.filter(c => c.nombre.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q));
}

export function aplicarSort(camisetes, query) {
    if (query.sort == undefined) return camisetes;
    if (query.sort == "precio_asc") return camisetes.sort((a, b) => a.precioBase - b.precioBase);
    if (query.sort == "precio_desc") return camisetes.sort((a, b) => b.precioBase - a.precioBase);
    if (query.sort == "nombre_asc") return camisetes.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (query.sort == "nombre_desc") return camisetes.sort((a, b) => b.nombre.localeCompare(a.nombre));
    return { error: "sort no existent" };
}