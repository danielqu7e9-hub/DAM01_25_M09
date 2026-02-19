async function conectaAPI() {
   try {
       const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
       if (!res.ok) {
           throw new Error(`Error HTTP ${res.status}`);
       }
       const json = await res.json();
       muestraChiste(json.id);
   } catch (error) {
       console.error("Error:", error);
   }
}

function muestraChiste(chiste) {
    let frase = document.createElement("p");
    frase.textContent = chiste;
    document.getElementById("chistes").appendChild(frase);
}

document.getElementById("masChistes").addEventListener("click", conectaAPI);