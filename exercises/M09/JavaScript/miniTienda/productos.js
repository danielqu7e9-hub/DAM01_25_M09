const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]
`;

const productosJSONParse = JSON.parse(productosJSON);

function muestraProductos() {
  let contenedor = document.createElement("main");
  document.body.appendChild(contenedor);
  productosJSONParse.forEach(element => {
    let articleActual = crearArticle(element);
    contenedor.appendChild(articleActual);
  });
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
  article.appendChild(crearBotoAgregarCarrito());

  return article;
}

function crearBotonesTalla(talles) {
  const div = document.createElement("div");
  div.id = "seleccionarTalles";
  
  talles.forEach(talla => {
    const btn = document.createElement("button");
    btn.textContent = talla.toUpperCase();
    btn.id = `talla`;
    div.appendChild(btn);
  });

  return div;
}

function crearBotonesColor(colores) {
  const div = document.createElement("div");
  div.id = "seleccionarColors";

  colores.forEach(color => {
    const btn = document.createElement("button");
    btn.id = `colors`;
    btn.textContent = color;
    div.appendChild(btn);
  });

  return div;
}

function crearBotoAgregarCarrito() {
  const btn = document.createElement("button");
  btn.id = "agregarCistella";
  btn.innerHTML = "🛒 Agregar al la cistella 🛒";
  return btn
}