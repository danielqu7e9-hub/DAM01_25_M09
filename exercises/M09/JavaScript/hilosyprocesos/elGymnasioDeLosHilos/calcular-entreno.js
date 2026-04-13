import { workerData, parentPort } from 'worker_threads';

console.log(`Calculant entreno per ${workerData.nombre}`);

const inicio = Date.now();
while (Date.now() - inicio < 6000) {};

const resultado = workerData.peso / ((workerData.altura / 100) ** 2);

let calorias;
let plan;
if (resultado < 18.5) {
  plan = "Volumen";
  calorias = "+400";
} else if (resultado < 25) {
  plan = "Mantenimiento";
  calorias = "0";
} else {
  plan = "Definición";
  calorias = "-400";
}

parentPort.postMessage({ nombre: workerData.nombre, imc: resultado, plan, calorias: calorias });
