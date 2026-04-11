async function aconseguirTicket(id) {
    try {
        const res = await fetch(`http://${window.location.hostname}:4000/api/comandes/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

function reformarData(informacioTemps) {
    return new Date(informacioTemps).toLocaleDateString('ca-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Omplir valors de les capceleres
function omplirCapcalera(ticket) {
    document.getElementById("ticket-id").textContent = ticket.id;
    document.getElementById("ticket-estado").textContent = ticket.estado;
    document.getElementById("ticket-fecha").textContent = reformarData(ticket.fecha);
    document.getElementById("ticket-cliente").textContent =
        `${ticket.cliente.nombre} (${ticket.cliente.email})`;
    document.getElementById("ticket-direccio").textContent = ticket.direccion;
    document.getElementById("ticket-total").textContent =
        ticket.total.toFixed(2) + " €";
}

function innerDefault(item) {
    return `
        <td><strong>${item.nombre}</strong></td>
        <td>${item.talla}</td>
        <td>${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</td>
        <td>${item.cantidad}</td>
        <td>${item.precioUnitario.toFixed(2)} €</td>
        <td><strong>${item.subtotal.toFixed(2)} €</strong></td>
    `;
}

function crearFilaItem(item) {
    const fila = document.createElement("tr");
    fila.innerHTML = innerDefault(item);
    return fila;
}

function renderTicket(ticket) {
    omplirCapcalera(ticket);
    const cosTaula = document.getElementById("ticket-items-tbody");
    ticket.items.forEach(item => cosTaula.appendChild(crearFilaItem(item)));
}

async function activarTicket() {
    const id = new URLSearchParams(window.location.search).get("id");
    const ticket = await aconseguirTicket(id);
    renderTicket(ticket);
}

document.addEventListener("DOMContentLoaded", () => {
    activarTicket()
});
