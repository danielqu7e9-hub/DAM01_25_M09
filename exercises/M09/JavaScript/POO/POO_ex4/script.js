class Personaje {
    nombre;
    nivel;
    puntosDeVida;
    arma;

    constructor(nombre, nivel, puntosDeVida, arma) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.puntosDeVida = puntosDeVida;
        this.arma = arma;
    }

    atacar() {
        return this.arma.atacar();
    }

    equiparArma(arma) {
        this.arma = arma;
    }

    toString() {
        return `${this.constructor.name}(nombre='${this.nombre}', nivel=${this.nivel}, puntosDeVida=${this.puntosDeVida}, arma=${this.arma.nom})`;
    }

    valueOf() {
        return this.nivel;
    }

    canviarArma(cofre, nombreArma) {
        const armaNova = cofre.obtindreArma(nombreArma);
        if (armaNova) {
            this.arma = armaNova;
            console.log(`${this.nombre} ha equipado ${armaNova.nom}`);
        } else {
            console.log(`${this.nombre} mantiene su arma actual`);
        }
    }
}


class Arma {
    tipus;
    poder;
    nom;

    constructor(tipus, poder, nom) {
        this.tipus = tipus;
        this.poder = poder;
        this.nom = nom;
    }

    toString() {
        return `Arma(tipus='${this.tipus}', poder=${this.poder}, nom='${this.nom}')`;
    }

    atacar() {
        return this.poder;
    }
}

class Guerrero extends Personaje {
    fuerza;

    constructor(fuerza, nombre, nivel, puntosDeVida, arma) {
        super(nombre, nivel, puntosDeVida, arma);
        this.fuerza = fuerza;
    }

    atacar() {
        let dano = this.arma.atacar() * this.fuerza * this.nivel;
        console.log(`${this.nombre} ataca con ${this.arma.nom} y causa ${dano} de daño`);
    }

    toString() {
        return `Guerrero(nombre='${this.nombre}', nivel=${this.nivel}, puntosDeVida=${this.puntosDeVida}, fuerza=${this.fuerza}, arma=${this.arma})`;
    }
}

class Mago extends Personaje {
    mana;

    constructor(mana, nombre, nivel, puntosDeVida, arma) {
        super(nombre, nivel, puntosDeVida, arma);
        this.mana = mana;
    }

    atacar() {
        let dano = this.arma.atacar() * this.mana * this.nivel;
        console.log(`${this.nombre} lanza un hechizo con ${this.arma.nom} y causa ${dano} de daño`);
    }

    toString() {
        return `Mago(nombre='${this.nombre}', nivel=${this.nivel}, puntosDeVida=${this.puntosDeVida}, mana=${this.mana}, arma=${this.arma})`;
    }
}

class Cofre {
    llistatArmes;

    constructor(llistatArmes) {
        this.llistatArmes = llistatArmes;
    }

    obtindreArma(nombre) {
        const arma = this.llistatArmes.find(a => a.nom === nombre);
        if (arma) {
            return arma;
        } else {
            console.log("Arma innexistent");
            return null;
        }
    }
}

let defaultArma = new Arma("fisico", 20, "SinArma");

// Personatges
let guerrero1 = new Guerrero(150, "Juan", 11, 2101, defaultArma);
let guerrero2 = new Guerrero(340, "Oriol", 5, 2320, defaultArma);
let guerrero3 = new Guerrero(120, "Xin xu lin", 8, 1952, defaultArma);
let guerrero4 = new Guerrero(730, "Panadero", 13, 1982, defaultArma);

let mago1 = new Mago(210, "Noelium", 10, 1700, defaultArma);
let mago2 = new Mago(310, "Elium", 13, 1750, defaultArma);
let mago3 = new Mago(270, "Ium", 19, 2300, defaultArma);
let mago4 = new Mago(240, "Eli", 17, 2000, defaultArma);

let arrayNoms = [guerrero1, guerrero2, guerrero3, guerrero4, mago1, mago2, mago3, mago4];

// Armes
let metralleta = new Arma("estadounidense", 9999, "Metralleta");
let hacha = new Arma("fisico", 220, "Hacha");
let katana = new Arma("fisico", 200, "Katana");
let mandoble = new Arma("fisico", 300, "Mandoble");

let baston = new Arma("magico", 400, "Bastón");
let orbe = new Arma("magico", 350, "Orbe");
let grimorio = new Arma("magico", 500, "Grimorio");
let varita = new Arma("magico", 420, "Varita");

// Cofre
let cofre = new Cofre([metralleta, hacha, katana, mandoble, baston, orbe, grimorio, varita]);

guerrero1.canviarArma(cofre, "Espada");
guerrero2.canviarArma(cofre, "Hacha");
guerrero3.canviarArma(cofre, "Katana");
guerrero4.canviarArma(cofre, "Mandoble");

mago1.canviarArma(cofre, "Bastón");
mago2.canviarArma(cofre, "Orbe");
mago3.canviarArma(cofre, "Grimorio");
mago4.canviarArma(cofre, "Varita");

arrayNoms.forEach(personajeActual => {
    personajeActual.atacar();
});

arrayNoms.sort((a, b) => a - b).forEach(personajeActual => {
    console.log(personajeActual.toString());
});

console.log(guerrero1 - guerrero2);
