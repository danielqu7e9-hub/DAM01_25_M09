const tvSamsung = {
    nombre: `TV Samsung 42"`,
    categoria: `Televisores`,
    unidades: 4,
    precio: 345.95
};

function getImporte(unidades, precio) {
    return unidades * precio;
}

console.log(getImporte(tvSamsung.unidades, tvSamsung.precio) + `€`);

let jsonTVSamsung = JSON.stringify(tvSamsung);

console.log(jsonTVSamsung);