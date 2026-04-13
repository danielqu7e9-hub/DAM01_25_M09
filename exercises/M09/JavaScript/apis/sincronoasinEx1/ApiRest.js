async function conectaAPI() {
   try {
       const res = await fetch("https://api.chucknorris.io/jokes/random");
       if (!res.ok) {
           throw new Error(`Error HTTP ${res.status}`);
       }
       const json = await res.json();
       muestraChiste(json.value);
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