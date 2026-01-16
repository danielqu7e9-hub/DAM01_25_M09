let body = document.body;
let button = document.getElementById("calcularBtn");

let numAleatorio = Math.floor(Math.random() * 100);
let resultado = document.getElementById("resultat");

button.addEventListener('click', encontrarNumeros);

function encontrarNumeros() {
    let num = parseInt(document.getElementById("num").value);
    if (!isNaN(num)) {
    if (numAleatorio == num) resultado.textContent = "Correcte";
    else if (numAleatorio > num) resultado.textContent = "El nombre és més gran";
    else resultado.textContent = "El nombre és més petit";
    }

}