import { workerData, parentPort } from 'worker_threads';

console.log("Worker activo\n");

// Simula tarea pesada: bucle de 5 segundos
const inicio = Date.now();
while (Date.now() - inicio < 5000) {}  // bloquea SOLO este hilo

const resultado = Math.floor(Math.random() * 10) + 1;
parentPort.postMessage({ nombre: `${workerData.nombre}`, numero: resultado, premio: resultado == 7 ? "Has ganado 1000€!" :  "No has ganado nada" });