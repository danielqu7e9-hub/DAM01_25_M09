import { comandes, nextId } from '../data/comandes.data.js';
import { getById as getCamisetaById } from './camisetes.services.js';

export function getAll() {
    return comandes
}

export function getById(id) {
    return comandes.find(c => c.id === id);
}

export function create(body) {
    // Falta objecte client
    if (!body.cliente) {
        return { error: "Falta el client" };
    }
    
    // Revisa l'existencia del nom del client
    if (!body.cliente.nombre || body.cliente.nombre.length < 2) {
        return { error: "Falta el nom del client o format del nom incorrecte" };
    }

    // Revisa el email del client
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.cliente.email || !emailRegex.test(body.cliente.email)) {
        return { error: "Falta el email del client o format incorrecte" };
    }

    // Revisa que items existeixi i tingui almenys 1 element
    if (!body.items || body.items.length < 1) {
        return { error: "Ha d'haver almenys 1 item" };
    }

    // No hi ha direcció
    if (!body.direccion) {
        return { error: "Ha d'haver direcció d'enví" }
    }

    // Revisa cada item
    for (const item of body.items) {

        // Revisa que la quantitat sigui un enter >= 1
        if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
            return { error: `La quantitat de l'item ${item.nombre} ha de ser un enter >= 1` };
        }

        // Revisa que la camiseta existeixi al catàleg
        const camiseta = getCamisetaById(item.camisetaId);

        if (!camiseta) {
            return { error: `La camiseta ${item.camisetaId} no existeix` };
        }

        // Revisa que la talla estigui dins de les talles de la camiseta
        if (!camiseta.tallas.includes(item.talla)) {
            return { error: `La talla ${item.talla} no és vàlida per a la camiseta ${item.camisetaId}` };
        }

        // Revisa que el color estigui dins dels colors de la camiseta
        if (!camiseta.colores.includes(item.color)) {
            return { error: `El color ${item.color} no és vàlid per a la camiseta ${item.camisetaId}` };
        }
    }

    const id = `ORD-${String(nextId.valor).padStart(4, '0')}`;
    nextId.valor++;

    const itemsCalculats = body.items.map(item => {
        const camiseta = getCamisetaById(item.camisetaId);
        const preuUnitario = camiseta.precioBase;
        const subtotal = preuUnitario * item.cantidad;
        return {
            camisetaId: item.camisetaId,
            nombre: camiseta.nombre,
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad,
            precioUnitario: preuUnitario,
            subtotal
        };
    });

    const total = itemsCalculats.reduce((acc, item) => acc + item.subtotal, 0);

    const comanda = {
        id,
        fecha: new Date().toISOString(),
        estado: "recibida",
        cliente: body.cliente,
        direccion: body.direccion,
        items: itemsCalculats,
        total
    };

    comandes.push(comanda);

    return comanda;
}