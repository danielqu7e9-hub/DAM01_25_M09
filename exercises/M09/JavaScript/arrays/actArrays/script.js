let body = document.body;

/* act 1 */
let arrayNombres = [2, 5, 7, 8, 1, 2, 4, 5, 6, 9, 12, 2];

let respostaA1 = sumarPares(arrayNombres);

document.querySelector(".a1").textContent = respostaA1;

function sumarPares(arrayAmbNombres) {
    total = 0;
    for (let index = 0; index < arrayAmbNombres.length; index++) {
        if (arrayAmbNombres[index] % 2 == 0) total += arrayAmbNombres[index];
    }
    return total;
}

/* act 2 */

const arrayRegistreAlumne = ["Rodriguez", "8", 9, '5',4, 'Clara'];

const arrayOrdenat = (arrayRegistreAlumne) => {
    arrayRegistreAlumne.unshift(arrayRegistreAlumne[5]);
    arrayRegistreAlumne.pop()
    let media = 0;
    let quantitatObjectes = 0;
    for (let index = 2; index < arrayRegistreAlumne.length; index++) {
        quantitatObjectes++;
        media += Number(arrayRegistreAlumne[index]);
    }
    media /= quantitatObjectes;
    arrayRegistreAlumne.push(media.toFixed(1));
    return arrayRegistreAlumne
}

document.querySelector(".a2").textContent = arrayOrdenat(arrayRegistreAlumne);

/* act 3 */

let arrayNomsCoses = ["Bob", "Alex", "Zoello", "León", "Zebra", "Gacela"];

document.querySelector(".a3").textContent = filterWordsZ(arrayNomsCoses);

function filterWordsZ(arrayDeNoms) {
    let arrayFiltrat = [];
    for (let index = 0; index < arrayDeNoms.length; index++) {
        if (arrayDeNoms[index][0] != 'Z') arrayFiltrat.push(arrayDeNoms[index]);
    }
    return arrayFiltrat;
}