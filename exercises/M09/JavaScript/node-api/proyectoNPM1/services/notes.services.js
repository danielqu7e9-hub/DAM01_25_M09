import { nextId, notas } from '../data/notas.data.js';
import { getById as sgetById } from '../services/students.services.js'

export function getAll() {
    return notas;
}

export function getById(id) {
    return notas.filter( nota => nota.studentId === id );
}

export function create(notaNova) {
    if (!notaNova || typeof notaNova !== "object") return { error: "JSON Invalid", status: 400 };

    if (!notaNova.studentId || !notaNova.modulo || !notaNova.nota) return { error: "Falten camps obligatoris", status: 400 };

    if (!sgetById(notaNova.studentId)) return { error: "ID Estudiant no existeix", status: 409 };

    notas.push({ id: nextId.valor, studentId: notaNova.studentId, modulo: notaNova.modulo, nota: notaNova.nota });
    nextId.valor++;

    return { data: notaNova };
}

export function update(id, notesUpdated) {
    const idx = notas.findIndex(n => n.id === id);

    if (idx === -1) return null;

    if (notesUpdated && typeof notesUpdated === "object") {
        if (notesUpdated !== undefined) {
            notas[idx].nota = notesUpdated.nota;
        }
    }

    return notas[idx];
}

export function remove(idNota) {
    const idx = notas.findIndex(n => n.id === idNota);

    if (idx === -1) return null;

    notas.splice(idx, 1);

    return true
}