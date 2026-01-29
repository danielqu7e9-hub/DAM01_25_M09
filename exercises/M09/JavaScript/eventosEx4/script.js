let body = document.body;

let caixa = document.getElementById("caixa");
let contenedorMoviment = document.getElementById("contenedorMoviment");

caixa.addEventListener("mousemove", (event) => {
    if (event.clientX <= caixa.clientWidth - contenedorMoviment.clientWidth / 2 && event.clientX >= contenedorMoviment.clientWidth / 2 + 9) {
        contenedorMoviment.style.left = event.clientX - contenedorMoviment.clientWidth / 2 - 9;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        let avionX = contenedorMoviment.offsetLeft + contenedorMoviment.clientWidth / 2 + 11;
        disparar(avionX - 5);
    }
});

document.addEventListener("click", (event) => {
        let avionX = contenedorMoviment.offsetLeft + contenedorMoviment.clientWidth / 2 + 11;
        disparar(avionX - 5);
});

function disparar(clientCoordsX) {
    let bala = document.createElement("div");
    bala.style.position = "absolute";
    bala.style.top = 690;
    bala.style.width = 10;
    bala.style.height = 25;
    bala.style.backgroundColor = "red";
    bala.style.left = clientCoordsX;

    caixa.appendChild(bala);

    const idInterval = setInterval(() => {
        let topActual = parseInt(bala.style.top);
        if (topActual <= -25) {
            bala.remove();
            clearInterval(idInterval);
        } else {
            bala.style.top = topActual - 4;
        }
    }, 1
);
}