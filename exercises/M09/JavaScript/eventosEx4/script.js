let body = document.body;

let caixa = document.getElementById("caixa");
let contenedorMoviment = document.getElementById("contenedorMoviment");

caixa.addEventListener("mousemove", (event) => {
    if (event.clientX <= caixa.clientWidth - contenedorMoviment.clientWidth / 2 && event.clientX >= contenedorMoviment.clientWidth / 2 + 9) {
        contenedorMoviment.style.left = event.clientX - contenedorMoviment.clientWidth / 2 - 9;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter" || event.code == "Space") {
        let avionX = contenedorMoviment.offsetLeft + contenedorMoviment.clientWidth / 2 + 11;
        disparar(avionX - 6);
    }
});

document.addEventListener("click", (event) => {
        let avionX = contenedorMoviment.offsetLeft + contenedorMoviment.clientWidth / 2 + 11;
        disparar(avionX - 6);
});

function disparar(clientCoordsX) {
    let bala = document.createElement("div");
    bala.style.position = "absolute";
    bala.style.top = 690;
    bala.style.width = 8;
    bala.style.height = 20;
    bala.style.background = "linear-gradient(rgba(255,0,0,1), rgba(255,0,0,1), rgba(255, 0, 0, 0.47))";
    bala.style.left = clientCoordsX;

    caixa.appendChild(bala);

    const idInterval = setInterval(() => {
        let topActual = parseInt(bala.style.top);
        if (topActual <= -parseInt(bala.style.height)) {
            bala.remove();
            clearInterval(idInterval);
        } else {
            bala.style.top = topActual - 4;
        }
    }, 0.1
);
}