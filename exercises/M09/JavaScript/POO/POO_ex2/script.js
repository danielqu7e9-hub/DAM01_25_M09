class FiguraGeometrica {
    nombre;

    constructor(nombre) {
        this.nombre = nombre;
    }

    calcularArea() {
        return "Error: Aquesta funció te que se implementada";
    };
}

class Rectangulo extends FiguraGeometrica {
    horizontal;
    vertical;

    constructor(horizontal, vertical, nom) {
        super(nom);
        this.horizontal = horizontal;
        this.vertical = vertical;
    }

    calcularArea() {
        return this.horizontal * this.vertical;
    }
}

class Triangulo extends FiguraGeometrica {
    altura;
    base;

    constructor(altura, base, nom) {
        super(nom);
        this.altura = altura;
        this.base = base;
    }

    calcularArea() {
        return (this.altura * this.base) / 2;
    }
}

class Circulo extends FiguraGeometrica {
    radi;

    constructor(radi, nom) {
        super(nom);
        this.radi = radi;
    }

    calcularArea() {
        return 3.14 * (this.radi * this.radi)
    }
}

console.log(new Rectangulo(10, 5, "Nom").calcularArea());