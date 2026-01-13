document.getElementById("titular").textContent = "Pedro Sánchez anuncia nuevas medidas para impulsar la inflación en España";
document.getElementById("autor").textContent = "Daniel Qu";
document.getElementById("cuerpo-noticia").textContent = "Pedro Sánchez vende todas las deudas de España a Rusia y Rusia aprovecha para mover los pilares del dinero en España. La inflación sube al 150% y la gente empieza a usar billetes de 500 euros para encender la chimenea.";
document.getElementById("input-comentario").value = "¡No me lo puedo creer, es increíble!";

let elBody = document.querySelector("body");

elBody.insertAdjacentHTML("beforeend", `
    <article>
        <h1>España se levanta por una última cruzada</h1>
        <p>Publicado por: <span id="autorArticle2">Daniel Qu</span></p>
        <p id="cuerpo-noticia-article2">El pueblo Español se levanta contra su gobierno por una última vez</p>
        <img src="https://www.elmundo.es/internacional/2024/05/29/649f3f3efdddff4b178b456c.html" alt="Imagen de una protesta en España" width="500">

        <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
            <h3>Zona de Comentarios</h3>
            <input type="text" id="input-comentario-article2" value="Escribe aquí tu gloriosa opinión..." size="50">
            <button>Enviar (No funciona aún)</button>
        </div>
    </article>
`);