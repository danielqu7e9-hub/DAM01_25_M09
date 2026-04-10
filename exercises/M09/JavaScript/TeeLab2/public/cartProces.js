function saveCart() {

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
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producte.nombre}</td>
            <td>${obj.talla.toUpperCase()}</td>
            <td>${obj.color}</td>
            <td>${obj.quantitat}</td>
            <td>${producte.precioBase.toFixed(2)} €</td>
            <td>${subtotal} €</td>
            <td><button onclick="eliminarItem('${key}')">✕</button></td>
        `;
        taula.appendChild(tr);
    }
}

function eliminarItem(key) {
    const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");
    delete productes[key];
    localStorage.setItem("productes", JSON.stringify(productes));
    loadCart();
}

async function obtindreProducte(id) {
  try {
    const response = await fetch('http://127.0.0.1:4000/api/camisetes/' + `${id}`);
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

document.addEventListener("DOMContentLoaded", () => {
    revisarExistencia()
});