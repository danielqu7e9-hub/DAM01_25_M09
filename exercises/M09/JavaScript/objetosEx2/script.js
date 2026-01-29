const tvSamsung = {
    nombre: `TV Samsung 42"`,
    categoria: `Televisores`,
    unidades: 4,
    precio: 345.95,
    getImporte: function (unidades, precio) {
    return unidades * precio;
    }
};

console.log(tvSamsung.getImporte(tvSamsung.unidades, tvSamsung.precio) + `€`);

let jsonTVSamsung = JSON.stringify(tvSamsung);

console.log(jsonTVSamsung);