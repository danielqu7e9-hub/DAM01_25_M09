let body = document.body;

let caixa = document.getElementById("caixa");
let contenedorMoviment = document.getElementById("contenedorMoviment");

caixa.addEventListener("mousemove", (event) => {
    if (event.clientX <= caixa.clientWidth - contenedorMoviment.clientWidth / 2 && event.clientX >= contenedorMoviment.clientWidth / 2 + 9) {
        contenedorMoviment.style.left = event.clientX - contenedorMoviment.clientWidth / 2 - 9;
    }
});

