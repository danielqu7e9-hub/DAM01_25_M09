async function aconseguirTicket(id) {
    try {
        const res = await fetch(`http://${window.location.hostname}:4000/api/comandes/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`Error carregant ticket ${id}:`, err);
        return null;
    }
}

function reformarData(informacioTemps) {
    return new Date(informacioTemps).toLocaleDateString('ca-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function innerTicketNormal(ticket, numItems) {
    return `
        <td><strong>${ticket.id}</strong></td>
        <td>${reformarData(ticket.fecha)}</td>
        <td>${numItems}</td>
        <td><strong>${ticket.total.toFixed(2)} €</strong></td>
        <td><span class="ticket-estat">${ticket.estado}</span></td>
        <td><span class="ticket-arrow">→</span></td>
    `;
}

function crearFilaTicket(ticketActual) {
    const fila = document.createElement("tr");
    const numItems = ticketActual.items.reduce((total, quantitatActualItems) => total + quantitatActualItems.cantidad, 0);

    fila.innerHTML = innerTicketNormal(ticketActual, numItems);
    fila.addEventListener("click", () => {
        window.location.href = `ticketDetail.html?id=${ticketActual.id}`;
    });
    return fila;
}

function mostrarBuit() {
    document.getElementById("tickets-tbody").innerHTML =
        `<tr class="ticket-empty"><td colspan="6">No hi ha cap ticket guardat.</td></tr>`;
}

async function carregarTickets() {
    const ids = JSON.parse(localStorage.getItem("tickets") ?? "[]");
    if (ids.length === 0) { 
        mostrarBuit(); 
        return
    }

    const tbody = document.getElementById("tickets-tbody");

    // Crear cada fila de tots els tickets d'aquí
    for (const id of ids) {
        const ticket = await aconseguirTicket(id);
        if (ticket) tbody.appendChild(crearFilaTicket(ticket));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTickets();
});
