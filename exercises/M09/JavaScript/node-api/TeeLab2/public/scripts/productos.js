// Variables
const colorMap = {
  "blanc": "#ffffff",
  "negre": "#1a1a1a",
  "gris": "#9e9e9e",
  "gris fosc": "#444444",
  "taronja": "#ff7043",
  "rosa": "#f48fb1",
  "blau marí": "#1a237e",
  "blau cel": "#4fc3f7",
  "blau elèctric": "#2979ff",
  "blau descolorit": "#7986cb",
  "blau-verd": "linear-gradient(135deg, #1565c0, #00897b)",
  "verd militar": "#558b2f",
  "verd menta": "#80cbc4",
  "vermell": "#e53935",
  "burdeus": "#6d1b2e",
  "terra": "#8d6e63",
  "sàlvia": "#8fa879",
  "crema": "#f5f0dc",
  "blanc trencat": "#f0ead6",
  "marró": "#6d4c41",
  "negre descolorit": "#5a5a5a",
  "morat-rosa": "linear-gradient(135deg, #7b1fa2, #e91e8c)",
  "taronja-groc": "linear-gradient(135deg, #ef6c00, #fdd835)",
};

const colorsFoscos = new Set([
  "negre", "blau marí", "verd militar", "vermell", "burdeus", "terra",
  "gris fosc", "negre descolorit", "blau elèctric", "marró", "blau-verd", "morat-rosa"
]);

//
function activarBotonCarrito() {
  const boto = document.getElementById("toCartButton");
  boto.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

function activarBotonTickets() {
  const boto = document.getElementById("toTicketsButton");
  boto.addEventListener("click", () => {
    window.location.href = "tickets.html";
  });
}

// Crear botons

// Boton talla
function crearBotonsTalla(talles) {
  const div = document.createElement("div");
  div.id = "seleccionarTalles";

  talles.forEach((talla, i) => {
    let botoActual = crearBotoTalla(talla, i);
    div.appendChild(botoActual);
  });

  return div;
}

function crearBotoTalla(talla, i) {
  const btn = document.createElement("button");
  btn.textContent = talla.toUpperCase();
  btn.id = `talla`;
  if (i === 0) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    btn.parentElement.querySelectorAll("button")
      .forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
  return btn;
}

// Botons colors
function crearBotonesColor(colores, imagenes, article) {
  const div = document.createElement("div");
  div.id = "seleccionarColors";

  colores.forEach((color, i) => {
    const botoActual = crearBotoColor(color, i, imagenes, article);
    div.appendChild(botoActual);
  });

  return div;
}

function crearBotoColor(color, i, imagenes, article) {
  const btn = document.createElement("button");
  btn.id = `colors`;

  configurarAtributsBoto(btn, color);

  if (i === 0) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    btn.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    const img = article.querySelector("img");
    if (img && imagenes[color]) {
      img.onerror = () => { img.src = 'img/default.jpg'; };
      img.src = imagenes[color].replace(/^\//, '');
    }
  });
  return btn;
}

function configurarAtributsBoto(btn, color) {
  const bg = colorMap[color] ?? color;

  if (bg.startsWith("linear-gradient")) {
    btn.style.backgroundImage = bg;
  } else {
    btn.style.backgroundColor = bg;
  }

  btn.style.color = colorsFoscos.has(color) ? "#fff" : "#111";
  btn.title = color;
  btn.setAttribute("aria-label", color);
}

// Boton & Config quantitat
function crearQuantitat() {
  const div = document.createElement("div");
  div.id = "quantitat";

  const btnMenos = crearBtnMenos();
  const input = crearInputQuantitat();
  const btnMes = crearBtnMes();

  btnMenos.addEventListener("click", () => { if (input.value > 1) input.value--; });
  btnMes.addEventListener("click", () => { input.value++; });

  div.appendChild(btnMenos);
  div.appendChild(input);
  div.appendChild(btnMes);
  return div;
}

function crearBtnMenos() {
  const btnMenos = document.createElement("button");
  btnMenos.id = "qMenos";
  btnMenos.textContent = "−";
  return btnMenos;
}

function crearInputQuantitat() {
  const input = document.createElement("input");
  input.id = "qInput";
  input.type = "number";
  input.value = 1;
  input.min = 1;
  input.readOnly = true;
  return input;
}

function crearBtnMes() {
  const btnMes = document.createElement("button");
  btnMes.id = "qMes";
  btnMes.textContent = "+";
  return btnMes;
}

//////////

function crearBotoAgregarCarrito(producte, article) {
  const btn = document.createElement("button");
  btn.id = "agregarCistella";
  btn.innerHTML = "Agregar";
  btn.addEventListener("click", () => {
    addToCart(producte, article);
    showToast("Producte afegit a la cistella!", "#27ae60");
  });
  return btn;
}

function createKey(prodid, color, talla) {
  return `${prodid}-${color}-${talla}`;
}

function addToCart(producte, article) {
  const talla = article.querySelector("#seleccionarTalles button.selected")?.textContent.toLowerCase();
  const color = article.querySelector("#seleccionarColors button.selected")?.getAttribute("aria-label");
  const quantitat = parseInt(article.querySelector("#qInput").value);

  const key = createKey(producte.id, color, talla);

  const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");

  if (productes[key]) productes[key].quantitat += quantitat;
  else productes[key] = { id: producte.id, color, talla, quantitat };

  localStorage.setItem("productes", JSON.stringify(productes));
}

// Logica de productes
function textInicialArticle(producte, imagenInicial) {
  return `<img src="${imagenInicial}" alt="${producte.nombre}" onerror="this.src='img/default.jpg'">

      <div id="tag">
        <p>${producte.tags[0].toUpperCase()}</p>
      </div>

      <h2>${producte.nombre.toUpperCase()}</h2>
      <p>${producte.descripcion}</p>
      <p class="precio">${producte.precioBase.toFixed(2)} €</p>`;
}

function crearArticle(producte) {
  let article = document.createElement("article");
  article.id = "articleDocument";

  const colorInicial = producte.colores[0];
  const imagenInicial = producte.imagenes[colorInicial].replace(/^\//, '');

  article.innerHTML = textInicialArticle(producte, imagenInicial);
  article.appendChild(crearBotonsTalla(producte.tallas));
  article.appendChild(crearBotonesColor(producte.colores, producte.imagenes, article));
  article.appendChild(crearQuantitat());
  article.appendChild(crearBotoAgregarCarrito(producte, article));

  return article;
}

// Mostrar productes
async function muestraProductes() {
  let contenedor = document.querySelector("main");
  contenedor.innerHTML = null;
  try {
    const response = await fetch(`http://${window.location.hostname}:4000/api/camisetes` + configurarFiltres());
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    data.forEach(element => {
      let articleActual = crearArticle(element);
      contenedor.appendChild(articleActual);
    });
  } catch (error) {
    console.error(error);
  }
}

// Retorna els filtres utilitzats
function configurarFiltres() {
  let arrayFiltres = [];

  const talla = document.getElementById("filter-talla").value;
  const color = document.getElementById("filter-color").value;
  const sort = document.getElementById("filter-sort").value;
  const search = document.getElementById("search-input").value;

  if (talla || color || sort || search) {
    if (talla) arrayFiltres.push(`talla=${talla}`);
    if (color) arrayFiltres.push(`color=${color}`);
    const sortMap = { "preu-asc": "precio_asc", "preu-desc": "precio_desc", "nom-asc": "nombre_asc", "nom-desc": "nombre_desc" };
    if (sort) arrayFiltres.push(`sort=${sortMap[sort] ?? sort}`);
    if (search) arrayFiltres.push(`q=${search}`);
  }
  return (arrayFiltres.length > 0 ? "?" : "") + arrayFiltres.join("&");
}

// Configuració filtres
function activarMenuFiltres() {
  const toggleBtn = document.getElementById("toggle-filters");
  const filterPanel = document.getElementById("filter-panel");

  toggleBtn.addEventListener("click", () => {
    const isOpen = !filterPanel.classList.contains("hidden");
    filterPanel.classList.toggle("hidden", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  });
}

function activarFiltrePerColors() {
  const colorSelect = document.getElementById("filter-color");
  Object.keys(colorMap).forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    colorSelect.appendChild(option);
  });
}

function esborrarFiltresActuals() {
  document.getElementById("clear-filters").addEventListener("click", () => {
    document.getElementById("filter-talla").value = "";
    document.getElementById("filter-color").value = "";
    document.getElementById("filter-sort").value = "";
    document.getElementById("search-input").value = "";
    muestraProductes();
  });
}

function configurarBuscador() {
  document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") muestraProductes();
  });

  document.getElementById("search-wrapper").addEventListener("click", (e) => {
    if (e.target.closest("svg")) muestraProductes();
  });
}

function activarFiltresAuto() {
  ["filter-talla", "filter-color", "filter-sort"].forEach(id =>
    document.getElementById(id).addEventListener("change", muestraProductes)
  );
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

document.addEventListener("DOMContentLoaded", () => {
  muestraProductes();
  activarBotonCarrito();
  activarBotonTickets();
  activarMenuFiltres();
  activarFiltrePerColors();
  esborrarFiltresActuals();
  configurarBuscador();
  activarFiltresAuto();
});
