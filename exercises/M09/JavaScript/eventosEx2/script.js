let body = document.body;

let botonMensaje = document.getElementById("botonMensaje");

botonMensaje.addEventListener("click", mensajeHola);

function mensajeHola() {
    let nombreUsuario = prompt("Como te llamas?");
    confirm(`Hola ${nombreUsuario}`);
}

let botonAlerta = document.getElementById("alerta");

botonAlerta.addEventListener("dblclick", () => {
    alert("Double clickkkkkkk!!!! :D");
});

let llocCoords = document.getElementById("posicio");

llocCoords.addEventListener("mousemove", (event) => {
    console.log(`${event.clientX} ${event.clientY}`);
});

document.addEventListener("keydown", (event) => {
    if(event.key == "Enter") {
        alert("Enter clickeado");
    }
});