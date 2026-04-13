let body = document.body;

let contenedor = document.createElement("div");
body.append(contenedor);

let tvSamsung = {
    nombre: `TV Samsung 42"`,
    categoria: `Televisores`,
    unidades: 4,
    precio: 345.95,
    getImporte: function () {
        return this.unidades * this.precio;
    }
};

let novesPropietats = ['colorPlastico', 'energia', 'resolucio'];

novesPropietats.forEach(prop => {
    tvSamsung[prop] = prompt(`Introduce el valor de ${prop}`);
});

let propietatsNecesaris = [
    'colorPlastic',
    'marca'
];

propietatsNecesaris.forEach(prop => {
    if (!tvSamsung.hasOwnProperty(prop)) {
        tvSamsung[prop] = undefined;
    }
});

for (let attrb in tvSamsung) {
    if (typeof tvSamsung[attrb] !== 'function') {
        contenedor.innerHTML += `<p>${attrb}: ${tvSamsung[attrb]}</p>`;
    }
}