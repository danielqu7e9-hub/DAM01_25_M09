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
        const tr = crearTableRow(key, obj, producte, subtotal);
        taula.appendChild(tr);
    }
}

function crearTableRow(key, obj, producte, subtotal) {
    const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producte.nombre}</td>
            <td>${obj.talla.toUpperCase()}</td>
            <td>${obj.color.charAt(0).toUpperCase() + obj.color.slice(1)}</td>
            <td>${obj.quantitat}</td>
            <td>${producte.precioBase.toFixed(2)} €</td>
            <td>${subtotal} €</td>
            <td id="eliminarProducte" onclick="eliminarItem('${key}')"><button>✕</button></td>
        `;
    return tr;
}

function eliminarItem(key) {
    const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");
    delete productes[key];
    saveCart(productes);
    revisarExistencia();
}

function removeCart() {
    localStorage.removeItem("productes");
    revisarExistencia();
}

async function obtindreProducte(id) {
  try {
    const response = await fetch(`http://${window.location.hostname}:4000/api/camisetes/${id}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function noExisteixApartat() {
    return `<tr id="cart-empty-msg">
                <td colspan="7"><p>La cistella és buida.</p></td>
            </tr>`
}

function revisarExistencia() {
    const productes = localStorage.getItem("productes");
    if (!productes || Object.keys(JSON.parse(productes)).length == 0) {
        document.getElementById("cart-tbody").innerHTML = noExisteixApartat();
    } else {
        loadCart();
    }
}

function activarBotoEliminarCarro() {
    const botoEliminar = document.getElementById("btn-vaciar");
    botoEliminar.addEventListener("click", removeCart);
}

document.addEventListener("DOMContentLoaded", () => {
    revisarExistencia();
    activarBotoEliminarCarro();
});