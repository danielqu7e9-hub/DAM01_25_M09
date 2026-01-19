let body = document.body;

let matriuVehicles = [
    ["seat", "Codoba", 1997, 10000],
    ["Kia", "Sorento", 1994, 1000],
    ["seat", "Todelo", 2000, 10000],
    ["Fiat", "Bravo", 2010, 10200],
    ["Fiat", "500", 2010, 10000],
    ["Mercedes", "Calse B", 2001, 39000],
    ["seat", "Ibiza", 1993, 10100],
    ["Alfa Romeo", "Julieta", 2002, 10000],
    ["Alfa Romeo", "159", 2002, 10400],
    ["Mercedes", "Calse C", 2001, 1000],
    ["Alfa Romeo", "147", 1990, 10500],
    ["Fiat", "Punto", 1990, 999],
    ["Citroen", "Saxo", 1980, 10300],
    ["Renault", "Superc 5", 1980, 12000],
    ["BWM", "M3", 2020, 1000],
    ["Kia", "Picanto", 1990, 1000],
    ["Alfa Romeo", "spider", 1970, 14500],
    ["Mercedes", "Calse A", 1994, 60100],
    ["Mercedes", "Calse D", 2011, 21221]
];

const ANYACTUAL = 2026;

/* act 1 */

let act1r = document.querySelector(".a1");

const matriuProcesat = matriuVehicles.filter(vehicle =>
    vehicle[0] !== "Alfa Romeo" &&
    vehicle[0] !== "Kia" &&
    (ANYACTUAL - vehicle[2]) > 20
).sort().map(vehicle => {
    return [
        vehicle[0],
        vehicle[1],
        vehicle[2],
        vehicle[3] * 0.8
    ]
});

let htmlTabla = `<div class="tabla-simples">
  <div class="fila header">
    <div class="celda">Marca</div>
    <div class="celda">Modelo</div>
    <div class="celda">Año</div>
    <div class="celda">Precio (€)</div>
  </div>`;

matriuProcesat.forEach(v => {
    htmlTabla += `<div class="fila">
        <div class="celda">${v[0]}</div>
        <div class="celda">${v[1]}</div>
        <div class="celda">${v[2]}</div>
        <div class="celda">${v[3]}</div>
    </div>`;
});

htmlTabla += `</div>`;

act1r.innerHTML = htmlTabla;