async function muestraProductos() {
  let contenedor = document.querySelector("main");
  contenedor.innerHTML = "";

  let filtres = "";
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
    filtres = "?" + arrayFiltres.join("&");
  }

  try {
    const response = await fetch('http://127.0.0.1:4000/api/camisetes' + filtres);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    data.forEach(element => {
      let articleActual = crearArticle(element);
      contenedor.appendChild(articleActual);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function crearArticle(producto) {
  let article = document.createElement("article");
  article.id = "articleDocument";

  const colorInicial = producto.colores[0];
  const imagenInicial = producto.imagenes[colorInicial];

  article.innerHTML = `
      <img src="${imagenInicial}" alt="${producto.nombre}">

      <div id="tag">
        <p>${producto.tags[0].toUpperCase()}</p>
      </div>

      <h2>${producto.nombre.toUpperCase()}</h2>
      <p>${producto.descripcion}</p>
      <p class="precio">${producto.precioBase.toFixed(2)} €</p>
      `;
  article.appendChild(crearBotonesTalla(producto.tallas));
  article.appendChild(crearBotonesColor(producto.colores));
  article.appendChild(crearQuantitat());
  article.appendChild(crearBotoAgregarCarrito(producto, article));

  return article;
}

function crearBotonesTalla(talles) {
  const div = document.createElement("div");
  div.id = "seleccionarTalles";

  talles.forEach((talla, i) => {
    const btn = document.createElement("button");
    btn.textContent = talla.toUpperCase();
    btn.id = `talla`;
    if (i === 0) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      div.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    div.appendChild(btn);
  });

  return div;
}

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

const coloresFoscos = new Set([
  "negre", "blau marí", "verd militar", "vermell", "burdeus", "terra",
  "gris fosc", "negre descolorit", "blau elèctric", "marró", "blau-verd", "morat-rosa"
]);

function crearBotonesColor(colores) {
  const div = document.createElement("div");
  div.id = "seleccionarColors";

  colores.forEach((color, i) => {
    const btn = document.createElement("button");
    btn.id = `colors`;
    const bg = colorMap[color] ?? color;
    if (bg.startsWith("linear-gradient")) {
      btn.style.backgroundImage = bg;
    } else {
      btn.style.backgroundColor = bg;
    }
    btn.style.color = coloresFoscos.has(color) ? "#fff" : "#111";
    btn.title = color;
    btn.setAttribute("aria-label", color);
    if (i === 0) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      div.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    div.appendChild(btn);
  });

  return div;
}

function crearQuantitat() {
  const div = document.createElement("div");
  div.id = "quantitat";

  const btnMenos = document.createElement("button");
  btnMenos.id = "qMenos";
  btnMenos.textContent = "−";

  const input = document.createElement("input");
  input.id = "qInput";
  input.type = "number";
  input.value = 1;
  input.min = 1;
  input.readOnly = true;

  const btnMes = document.createElement("button");
  btnMes.id = "qMes";
  btnMes.textContent = "+";

  btnMenos.addEventListener("click", () => { if (input.value > 1) input.value--; });
  btnMes.addEventListener("click", () => { input.value++; });

  div.appendChild(btnMenos);
  div.appendChild(input);
  div.appendChild(btnMes);
  return div;
}

function crearBotoAgregarCarrito(producto, article) {
  const btn = document.createElement("button");
  btn.id = "agregarCistella";
  btn.innerHTML = "Agregar";
  btn.addEventListener("click", () => {
    addToCart(producto, article);
  });
  return btn;
}

function addToCart(producto, article) {
  const talla = article.querySelector("#seleccionarTalles button.selected")?.textContent.toLowerCase();
    const color = article.querySelector("#seleccionarColors button.selected")?.getAttribute("aria-label");
    const cantidad = parseInt(article.querySelector("#qInput").value);

    const key = `${producto.id}_${color}_${talla}`;

    const productes = JSON.parse(localStorage.getItem("productes") ?? "{}");

    if (productes[key]) {
      productes[key].cantidad += cantidad;
    } else {
      productes[key] = { id: producto.id, color, talla, cantidad };
    }

    localStorage.setItem("productes", JSON.stringify(productes));
}

function saveCart() {
  
}

function loadCart() {

}

function renderCart() {
  
}

document.addEventListener("DOMContentLoaded", () => {
  muestraProductos();

  const toggleBtn = document.getElementById("toggle-filters");
  const filterPanel = document.getElementById("filter-panel");

  toggleBtn.addEventListener("click", () => {
    const isOpen = !filterPanel.classList.contains("hidden");
    filterPanel.classList.toggle("hidden", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  const colorSelect = document.getElementById("filter-color");
  Object.keys(colorMap).forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    colorSelect.appendChild(option);
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    document.getElementById("filter-talla").value = "";
    document.getElementById("filter-color").value = "";
    document.getElementById("filter-sort").value = "";
    document.getElementById("search-input").value = "";
    muestraProductos();
  });

  document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") muestraProductos();
  });

  document.getElementById("search-wrapper").addEventListener("click", (e) => {
    if (e.target.closest("svg")) muestraProductos();
  });
});
