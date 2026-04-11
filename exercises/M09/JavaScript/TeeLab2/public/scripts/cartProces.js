function saveCart(productes) {
    localStorage.setItem("productes", JSON.stringify(productes));
}

function loadCart() {
    document.getElementById("cart-tbody").innerHTML = null;
    renderCart(JSON.parse(localStorage.getItem("productes")));
}

async function renderCart(actualCart) {
    const taula = document.getElementById("cart-tbody");
    for (const [key, obj] of Object.entries(actualCart)) {
        const producte = await obtindreProducte(obj.id);
        const subtotal = (producte.precioBase * obj.quantitat).toFixed(2);
        const linea = crearTableFila(key, obj, producte, subtotal);
        taula.appendChild(linea);
    }
}

function crearTableFila(key, obj, producte, subtotal) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${producte.nombre}</td>
            <td>${obj.talla.toUpperCase()}</td>
            <td>${obj.color.charAt(0).toUpperCase() + obj.color.slice(1)}</td>
            <td>${obj.quantitat}</td>
            <td>${producte.precioBase.toFixed(2)} €</td>
            <td>${subtotal} €</td>
            <td id="eliminarProducte" onclick="eliminarItem('${key}')"><button>✕</button></td>`;
    return fila;
}

function eliminarItem(key) {
    const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");
    delete productes[key];
    saveCart(productes);
    revisarExistencia();
    showToast("Producte eliminat", "#ae2727");
}

function removeCart() {
    localStorage.removeItem("productes");
    revisarExistencia();
    showToast("Cistella buidada!", "#ae2727");
}

async function obtindreProducte(id) {
    try {
        const response = await fetch(`http://${window.location.hostname}:4000/api/camisetes/${id}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function noExisteixApartat() {
    return `<tr id="cart-empty-msg">
                <td colspan="7"><p>La cistella és buida.</p></td>
            </tr>`;
}

function revisarExistencia() {
    const productes = localStorage.getItem("productes");
    if (!productes || Object.keys(JSON.parse(productes)).length == 0) {
        document.getElementById("cart-total-value").innerHTML = (0).toFixed(2) + " €";
        document.getElementById("cart-tbody").innerHTML = noExisteixApartat();
    } else {
        loadCart();
    }
    actualitzarPreuTotal(JSON.parse(localStorage.getItem("productes") ?? "{}"));
    actualitzarEstatBotoComprar();
}

function activarBotoEliminarCarro() {
    const botoEliminar = document.getElementById("btn-vaciar");
    botoEliminar.addEventListener("click", removeCart);
}

function showToast(message, color) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.borderLeftColor = color;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-exit");
        toast.addEventListener("animationend", () => toast.remove());
    }, 2500);
}

async function actualitzarPreuTotal(actualCart) {
    let preuTotal = document.getElementById("cart-total-value");
    let totalPrice = 0;
    for (const [key, obj] of Object.entries(actualCart)) {
        const producte = await obtindreProducte(obj.id);
        const subtotal = (producte.precioBase * obj.quantitat);
        totalPrice += subtotal;
    }
    if (totalPrice != 0) {
        preuTotal.innerHTML = (totalPrice.toFixed(2)) + " €";
    }
}

function testMode(defaultMode = true) {
    if (defaultMode) {
        document.getElementById("client-nom").value = "Alicia Pan";
        document.getElementById("client-email").value = "panpanpan@gmail.com";
        document.getElementById("client-adreca").value = "Carrer del Pa, 75";
        document.getElementById("client-ciutat").value = "Barcelona";
        document.getElementById("client-cp").value = "08001";
    }
}

function actualitzarEstatBotoComprar() {
    const camps = ["client-nom", "client-email", "client-adreca", "client-ciutat", "client-cp"];
    const formulariOk = camps.every(id => document.getElementById(id).value.trim() !== "");
    const teItems = Object.keys(JSON.parse(localStorage.getItem("productes") ?? "{}")).length > 0;
    document.getElementById("btn-comprar").disabled = !(formulariOk && teItems);
}

function aconseguirItems(productes) {
    return Object.values(productes).map(obj => ({
        camisetaId: obj.id,
        cantidad: obj.quantitat,
        talla: obj.talla.toUpperCase(),
        color: obj.color
    }));
}

function finalitzarCompra() {
    const nom = document.getElementById("client-nom").value.trim();
    const email = document.getElementById("client-email").value.trim();
    const adreca = document.getElementById("client-adreca").value.trim();
    const ciutat = document.getElementById("client-ciutat").value.trim();
    const codiPostal = document.getElementById("client-cp").value.trim();

    const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");
    const items = aconseguirItems(productes);

    const finalJson = {
        cliente: { nombre: nom, email: email },
        direccion: `${adreca}, ${codiPostal} ${ciutat}`,
        items
    };

    enviarComanda(finalJson);
}

function guardarTicket(id) {
    const tickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");
    tickets.push(id);
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

async function enviarComanda(finalJson) {
    try {
        const response = await fetch(`http://${window.location.hostname}:4000/api/comandes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalJson)
        });
        const data = await response.json();
        guardarTicket(data.id);
        localStorage.removeItem("productes");
        window.location.href = `ticketDetail.html?id=${data.id}`;
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    testMode();
    revisarExistencia();
    activarBotoEliminarCarro();
    actualitzarEstatBotoComprar();
    ["client-nom", "client-email", "client-adreca", "client-ciutat", "client-cp"]
        .forEach(id => document
            .getElementById(id)
            .addEventListener("input", actualitzarEstatBotoComprar));
    document.getElementById("btn-comprar").addEventListener("click", finalitzarCompra);
});
