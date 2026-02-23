async function conectaAPI() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=4`);
        if (!res.ok) {
            mostrarEstatus(res.status);
            throw new Error(`Error HTTP ${res.status}`);
        }
        const json = await res.json();

        json.sort

        json.results.forEach(async (pokemon) => {
            try {
                const resPokemon = await fetch(pokemon.url);
                if (!resPokemon.ok) throw new Error(`Error HTTP ${resPokemon.status}`);
                const data = await resPokemon.json();
                buscadorPokemon(data.name, data.sprites.front_default, data.types, data.id);
            } catch (error) {
                console.error("Error fetching individual Pokémon:", error);
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

async function actualitzarAPI(busqueda) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
        if (!res.ok) {
            mostrarEstatus(res.status);
            throw new Error(`Error HTTP ${res.status}`);
        }
        const json = await res.json();
        buscadorPokemon(json.name, json.sprites.front_default, json.types, json.id);
    } catch (error) {
        console.error("Error:", error);
    }
}

/* ------------------------------------------------- */
/* -------------------- TREBALL -------------------- */
/* ------------------------------------------------- */

let pokedex = document.createElement("main");
document.body.appendChild(pokedex);

function clearPokedex() {
    pokedex.innerHTML = ""
}

function buscadorPokemon(nom, imgurl, types, id) {
    let articleActual = document.createElement("article");
    articleActual.className = "pokemonArticle";

    articleActual.innerHTML = `
        <p>Nombre: ${nom}</p>
        <img src="${imgurl}" alt="Imagen de ${nom}">
        <p>ID: ${id}</p>
    `;

    types.forEach(typeObj => {
        const typeName = typeObj.type.name;
        const p = document.createElement("p");
        p.textContent = `Tipo: ${typeName}`;
        articleActual.appendChild(p);
    });

    pokedex.appendChild(articleActual);
}

function mostrarEstatus(status) {
    document.body.innerHTML = `<p>Error HTTP: ${status}</p>`;
}

document.getElementById("btnBuscar").addEventListener("click", () => {
    let valorBusqueda = document.getElementById("inputBuscar").value;
    
    if (valorBusqueda == undefined) {
        conectaAPI;
    } else {
        clearPokedex();
        actualitzarAPI(valorBusqueda);
    }
});