import { students } from '../data/students.data.js';

export function getAll() {
    return students;
}

export function getById(id) {
    return students.find(s => s.id === id);
}

export function create(alumneNou) {
    // Revisa si és un objecte
    if (!alumneNou || typeof alumneNou !== "object") return { error: "JSON Invalid", status: 400 };

    // Revisa si te els camps
    if (!alumneNou.id || !alumneNou.nombre || !alumneNou.curso) return { error: "Falten camps obligatoris", status: 400 };

    // Revisar duplicitat ID
    if (students.some(s => s.id === alumneNou.id)) return { error: "ID Estudiant ja existeix", status: 409 };

    // Agrega l'estudiant
    students.push({ id: alumneNou.id, nombre: alumneNou.nombre, curso: alumneNou.curso });

    return { data: alumneNou };
}

export function update(id, alumneUpdate) {
    const idx = students.findIndex(s => s.id === id);

    if (idx === -1) return null;

    if (alumneUpdate && typeof alumneUpdate === "object") {
        if (alumneUpdate.nombre !== undefined && alumneUpdate.curso !== undefined) {
            students[idx].nombre = alumneUpdate.nombre;
            students[idx].curso = alumneUpdate.curso;
        }
    }

    return students[idx];
}

export function remove(id) {
    const idx = students.findIndex(s => s.id === id);

    if (idx === -1) return null;

    students.splice(idx, 1);
    return true;
}