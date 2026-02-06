class TarjetaCredito {
    #IBAN;
    #dinersActuals;
    #nomPropietari;
    #CVV;
    #PIN;
    #dataCaducitat;
    #estatTargeta;

    constructor(
        IBAN = 0,
        dinersActuals = 1000,
        nomPropietari = "Anonim",
        CVV = 111,
        PIN = 1234,
        dataCaducitat = "12-27",
        estatTargeta = true,
    ) {
        this.#IBAN = IBAN;
        this.#dinersActuals = dinersActuals;
        this.#nomPropietari = nomPropietari;
        this.#CVV = CVV;
        this.#PIN = PIN;
        this.#dataCaducitat = dataCaducitat;
        this.#estatTargeta = estatTargeta;
    }

    get IBAN() 
    { return this.#IBAN; }

    set IBAN(newIBAN) 
    { this.#IBAN = newIBAN; }

    get dinersActuals() 
    { return this.#dinersActuals; }

    set dinersActuals(actualitzacioDiners) 
    { this.#dinersActuals = actualitzacioDiners; }

    get nomPropietari() 
    { return this.#nomPropietari; }

    get CVV() 
    { return this.#CVV; }

    set CVV(newCVV) 
    { this.#CVV = newCVV; }

    get PIN() 
    { return this.#PIN; }

    set PIN(newPin) 
    { this.#PIN = newPin; }
    
    get dataCaducitat() 
    { return this.#dataCaducitat; }

    set dataCaducitat(novaData)
    { this.#dataCaducitat = novaData; }

    get estatTargeta()
    { return this.#estatTargeta; }

    set estatTargeta(newEstat)
    { this.#estatTargeta = newEstat; }

    activar() {
        this.estatTargeta = true;
    }

    anular() {
        this.estatTargeta = false;
    }

    pagar(diners) {
        if (this.dinersActuals - diners < 0) {
            console.log("Sald insuficient");
        } else {
            this.#dinersActuals -= diners;
        }
    }

    canviarPin(pinActual, nouPin) {
        if (pinActual === this.PIN) {
            this.PIN = nouPin;
        }
    }

    
}

let targeta1 = new TarjetaCredito()
let targeta2 = new TarjetaCredito()
let targeta3 = new TarjetaCredito()

targeta1.pagar(1001);
targeta1.anular();
targeta2.pagar(999);
targeta2.anular();
targeta3.anular();
targeta3.activar();
targeta3.canviarPin(1234, 5102);
console.log(targeta3.PIN);
console.log(targeta1.IBAN);
console.log(targeta1);
console.log(targeta2);
console.log(targeta3);