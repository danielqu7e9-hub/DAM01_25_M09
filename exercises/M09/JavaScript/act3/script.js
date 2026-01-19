let body = document.body;

let nombreAct1 = document.getElementById("nom");
let saludoAct1 = document.getElementById("saludo");

let botoNom = document.getElementById("botoNom");
botoNom.addEventListener('click', () => {
    if (saludoAct1.value == "") {
        saludar(nombreAct1.value);
    } else {
        saludar(nombreAct1.value, saludoAct1.value);
    }
});

function saludar(nombre, saludo = "Hola") {
    let text = document.querySelector(".a1");
    text.textContent = `${saludo}, ${nombre}`;
}