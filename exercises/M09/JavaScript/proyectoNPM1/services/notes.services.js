import { nextId, notas } from '../data/notas.data.js';
import { students } from '../data/students.data.js';

export function getAll() {
    return notes;
}

export function getById(id) {
    return notes.filter( nota => nota.studentId === id );
}

export function create(notaNova) {
    if (!notaNova || typeof notaNova !== "object") return { error: "JSON Invalid", status: 400 };

    if (!notaNova.studentId || !notaNova.modulo || !notaNova.nota) return { error: "Falten camps obligatoris", status: 400 };

    if (!students.some(s => s.id === notaNova.studentId)) return { error: "ID Estudiant no existeix", status: 409 };

    notas.push({ id: nextId.valor, studentId: notaNova.studentId, modulo: notaNova.modulo, nota: notaNova.nota });
    nextId.valor++;

    return { data: notaNova };
}

export function update(id, notesUpdated) {
    const idx = notes.findIndex(n => n.id === id);

    if (idx === -1) return null;

    if (notesUpdated && typeof notesUpdated === "object") {
        if (notesUpdated !== undefined) {
            notes[idx].nota = notesUpdated.nota;
        }
    }

    return notes[idx];
}

export function remove(idNota) {
    const idx = notes.findIndex(n => n.id === idNota);

    if (idx === -1) return null;

    students.splice(idx, 1);

    return true
}