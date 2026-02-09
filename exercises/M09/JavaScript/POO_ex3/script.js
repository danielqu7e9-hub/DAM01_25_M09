class Personaje {
    nombre;
    nivel;
    puntosDeVida;

    constructor(nombre, nivel, puntosDeVida) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.puntosDeVida = puntosDeVida;
    }

    ataque() {
        console.log("Ataque invalido, personaje sin clase");
    }
}

class Guerrero extends Personaje {
    fuerza;

    constructor(fuerza, nombre, nivel, puntosDeVida) {
        super(nombre, nivel, puntosDeVida);
        this.fuerza = fuerza;
    }

    ataque() {
        console.log(`Ataque del guerrero de ${(this.fuerza * (0.5 * this.nivel)) * 500}`);
    }

    toString() {
        return `Guerrero(nombre='${this.nombre}', nivel=${this.nivel}, puntosDeVida=${this.puntosDeVida}, fuerza=${this.fuerza})`;
    }

    valueOf() {
        return this.nivel;
    }
}

class Mago extends Personaje {
    mana;

    constructor(mana, nombre, nivel, puntosDeVida) {
        super(nombre, nivel, puntosDeVida);
        this.mana = mana;
    }

    ataque() {
        console.log(`Ataque del mago de ${(this.mana * (0.8 * this.nivel)) * 500}`);
    }

    toString() {
        return `Mago(nombre='${this.nombre}', nivel=${this.nivel}, puntosDeVida=${this.puntosDeVida}, mana=${this.mana})`;
    }

    valueOf() {
        return this.nivel;
    }
}

let guerrero1 = new Guerrero(150, "Juan", 11, 2101);
let guerrero2 = new Guerrero(340, "Oriol", 5, 2320);
let guerrero3 = new Guerrero(120, "Xin xu lin", 8, 1952);
let guerrero4 = new Guerrero(730, "Panadero", 13, 1982);

let mago1 = new Mago(210, "Noelium", 10, 1700);
let mago2 = new Mago(310, "Elium", 13, 1750);
let mago3 = new Mago(270, "Ium", 19, 2300);
let mago4 = new Mago(240, "Eli", 17, 2000);

let arrayNoms = [guerrero1, guerrero2, guerrero3, guerrero4, mago1, mago2, mago3, mago4];

arrayNoms.forEach( personatgeActual => {
    personatgeActual.ataque();
});

arrayNoms.sort(function (a, b) { return a.nivel - b.nivel; }).forEach( personajeActual => {
    console.log(personajeActual);
});

console.log(guerrero1 - guerrero2);