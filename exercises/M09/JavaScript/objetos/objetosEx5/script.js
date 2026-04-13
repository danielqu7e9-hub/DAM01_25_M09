let body = document.body;

let contenedor = document.createElement("div");
body.appendChild(contenedor);

let coche = {
    marca: "Toyota",
    modelo: "Corolla",
    any: 2020,
    encendido: false,
    kilometraje: 0,

    arrancar: function () {
        if (this.encendido === false) {
            this.encendido = true;
            console.log("Vehicle encés");
        } else {
            console.log("Vehicle ja estava encés");
        }
    },

    apagar: function () {
        if (this.encendido === true) {
            this.encendido = false;
            console.log("Vehicle apagat");
        } else {
            console.log("Vehicle ja estava apagat");
        }
    },

    recorrer: function (km) {
        this.kilometraje += km;
    }
};

coche.arrancar();
coche.apagar();

coche.recorrer(50);
console.log(coche.kilometraje);
