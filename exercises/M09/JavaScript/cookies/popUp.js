function setCookie(name, value, days) {
    document.cookie = `${name}=${value};Max-age=${days * 24 * 60 * 60} ; path=/`;
}

function saveConfig() {
    setCookie("backgroundColor", document.getElementById("background-color").value, 7);
    setCookie("fontColor", document.getElementById("font-color").value, 7);
    setCookie("visited", true, 7);

    // Avisamos a la ventana padre ANTES de cerrar
    if (window.opener) {
        window.opener.postMessage("config_actualizada", "*");
    }
    
    window.close();
}

document.getElementById("config-form").addEventListener("submit", function (event) {
    event.preventDefault();
    saveConfig();
});