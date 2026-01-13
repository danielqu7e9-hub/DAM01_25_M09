let body = document.body;

/* Exercici 1 */
let a1 = document.querySelector(".a1");
let n1 = 10;
let n2 = 11;
a1.textContent = trobarMajor(n1, n2);

function trobarMajor(num1, num2) {
    let resposta = null;
    if (num1 > num2) resposta = num1; 
    else resposta = num2; 
    return resposta;
}

/* Exercici 2 */
let a2 = document.querySelector(".a2");
let n3 = 10;
let n4 = 11;
a2.textContent = multiplicacio(n3, n4);

function multiplicacio(num1, num2) {
    let resposta = 0;
    for (let index = 0; index < num2 ; index++) {
        resposta += num1
    }
    return resposta;
}

/* Exercici 3 */
let a3 = document.querySelector(".a3");
let n5 = 10;
let n6 = 11;
let n7 = 15;
a3.textContent = tripleMultiplicacio(n5, n6, n7);

function tripleMultiplicacio(num1, num2, num3) {
    let resposta = 0;
    resposta = multiplicacio(multiplicacio(num1, num2), num3);
    return resposta;
}

/* Exercici 4 */
let a4 = document.querySelector(".a4");
let n8 = 10;
let n9 = 11;
let n10 = 16;
a4.textContent = trobarMedia3Notes(n8, n9, n10);

function trobarMedia3Notes(num1, num2, num3) {
    let resposta = 0;
    resposta += num1 + num2 + num3;
    resposta /= 3;
    return resposta.toFixed(1)
}

/* Exercici 5 */
let a5 = document.querySelector(".a5");
a5.textContent = retornar100000();

function retornar100000() {
    let resposta = [];
    for (let index = 0; index <= 100000; index++) {
        let revisar = revisarIgual(index, calcularCub(index));
        if (revisar) {
            resposta.push(index);
        }
    }
    return resposta;
}

function calcularCub(num1) {
    let resposta = 0;
    let actualNum = String(num1).split("");
    for (let index = 0; index < actualNum.length ; index++) {
        resposta += actualNum[index] * actualNum[index] * actualNum[index];
    }
    return resposta;
}

function revisarIgual(num1, num2) {
    return num1==num2?true:false;
}