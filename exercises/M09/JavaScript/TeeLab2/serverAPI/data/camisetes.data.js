export let camisetes = [
  {
    id: 1,
    nombre: "Clàssica Barcelona",
    descripcion: "Camiseta de cotó 100% amb disseny minimalista inspirat en la ciutat de Barcelona.",
    precioBase: 19.99,
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    colores: ["blanc", "negre", "gris"],
    imagenes: {
      blanc: "/img/camisetes/classica-barcelona-blanc.jpg",
      negre: "/img/camisetes/classica-barcelona-negre.jpg",
      gris: "/img/camisetes/classica-barcelona-gris.jpg"
    },
    tags: ["bàsica", "minimalista", "cotó", "unisex"]
  },
  {
    id: 2,
    nombre: "Retro Sunset",
    descripcion: "Camiseta de tall regular amb estampat retro de posta de sol en colors vibrants.",
    precioBase: 24.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["taronja", "rosa", "blau marí"],
    imagenes: {
      taronja: "/img/camisetes/retro-sunset-taronja.jpg",
      rosa: "/img/camisetes/retro-sunset-rosa.jpg",
      "blau marí": "/img/camisetes/retro-sunset-blau-mari.jpg"
    },
    tags: ["retro", "estampat", "estiu", "colors"]
  },
  {
    id: 3,
    nombre: "Urban Street",
    descripcion: "Camiseta oversize d'estètica urbana amb gràfic de gran format al davant.",
    precioBase: 29.99,
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["negre", "blanc trencat", "verd militar"],
    imagenes: {
      negre: "/img/camisetes/urban-street-negre.jpg",
      "blanc trencat": "/img/camisetes/urban-street-blanc-trencat.jpg",
      "verd militar": "/img/camisetes/urban-street-verd-militar.jpg"
    },
    tags: ["oversize", "streetwear", "gràfic", "urban"]
  },
  {
    id: 4,
    nombre: "Eco Natural",
    descripcion: "Camiseta fabricada amb cotó orgànic certificat GOTS, tenyida amb pigments naturals.",
    precioBase: 34.99,
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: ["terra", "sàlvia", "crema"],
    imagenes: {
      terra: "/img/camisetes/eco-natural-terra.jpg",
      salvia: "/img/camisetes/eco-natural-salvia.jpg",
      crema: "/img/camisetes/eco-natural-crema.jpg"
    },
    tags: ["ecològic", "orgànic", "sostenible", "natural"]
  },
  {
    id: 5,
    nombre: "Sport Performance",
    descripcion: "Camiseta tècnica de teixit transpirable amb tecnologia de gestió de la humitat per a esport.",
    precioBase: 39.99,
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["negre", "blau elèctric", "vermell"],
    imagenes: {
      negre: "/img/camisetes/sport-performance-negre.jpg",
      "blau elèctric": "/img/camisetes/sport-performance-blau-electric.jpg",
      vermell: "/img/camisetes/sport-performance-vermell.jpg"
    },
    tags: ["esport", "tècnica", "transpirable", "fitness"]
  },
  {
    id: 6,
    nombre: "Vintage Washed",
    descripcion: "Camiseta amb acabat rentada vintage que li dóna un aspecte desgastat i autentic.",
    precioBase: 27.99,
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: ["blau descolorit", "negre descolorit", "burdeus"],
    imagenes: {
      "blau descolorit": "/img/camisetes/vintage-washed-blau.jpg",
      "negre descolorit": "/img/camisetes/vintage-washed-negre.jpg",
      burdeus: "/img/camisetes/vintage-washed-burdeus.jpg"
    },
    tags: ["vintage", "rentat", "casual", "retro"]
  },
  {
    id: 7,
    nombre: "Pocket Logo",
    descripcion: "Camiseta essencial amb petit logotip brodats al pit, confeccionada en cotó piqué.",
    precioBase: 22.99,
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    colores: ["blanc", "negre", "blau cel", "verd menta"],
    imagenes: {
      blanc: "/img/camisetes/pocket-logo-blanc.jpg",
      negre: "/img/camisetes/pocket-logo-negre.jpg",
      "blau cel": "/img/camisetes/pocket-logo-blau-cel.jpg",
      "verd menta": "/img/camisetes/pocket-logo-verd-menta.jpg"
    },
    tags: ["bàsica", "brodat", "piqué", "clàssic"]
  },
  {
    id: 8,
    nombre: "Tie-Dye Festival",
    descripcion: "Camiseta amb estampat tie-dye fet a mà, cada peça és única i irrepetible.",
    precioBase: 32.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["morat-rosa", "blau-verd", "taronja-groc"],
    imagenes: {
      "morat-rosa": "/img/camisetes/tiedye-morat-rosa.jpg",
      "blau-verd": "/img/camisetes/tiedye-blau-verd.jpg",
      "taronja-groc": "/img/camisetes/tiedye-taronja-groc.jpg"
    },
    tags: ["tie-dye", "festival", "artesanal", "únic", "color"]
  },
  {
    id: 9,
    nombre: "Long Sleeve Basic",
    descripcion: "Camiseta de màniga llarga en cotó penat de qualitat premium, ideal per a entretempo.",
    precioBase: 26.99,
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    colores: ["negre", "blanc", "gris fosc", "marró"],
    imagenes: {
      negre: "/img/camisetes/long-sleeve-negre.jpg",
      blanc: "/img/camisetes/long-sleeve-blanc.jpg",
      "gris fosc": "/img/camisetes/long-sleeve-gris-fosc.jpg",
      marro: "/img/camisetes/long-sleeve-marro.jpg"
    },
    tags: ["màniga llarga", "entretempo", "premium", "bàsica"]
  },
  {
    id: 10,
    nombre: "Graphic Art Print",
    descripcion: "Camiseta d'edició limitada amb obra d'art d'artista local impresa en alta qualitat.",
    precioBase: 44.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanc", "negre"],
    imagenes: {
      blanc: "/img/camisetes/graphic-art-blanc.jpg",
      negre: "/img/camisetes/graphic-art-negre.jpg"
    },
    tags: ["art", "edició limitada", "col·leccionable", "disseny", "exclusiu"]
  }
];

export let nextId = { valor: 11 };