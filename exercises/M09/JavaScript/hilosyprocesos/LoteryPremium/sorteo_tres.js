process.on('message', (mensaje) => {
    let victorias = 0;
  let resultat = Math.round(Math.random() * 10);
    // Verificamos qué orden nos ha dado el Jefe
    if (mensaje.comando === 'empezar_gambling') {
        if (resultat == 7) {
          console.log(`1- Victoria: ha tret ${resultat}`);
          victorias++
        } else console.log(`1- Perdidas: ha tret ${resultat}`);
        resultat = Math.round(Math.random() * 10);

        // Simulamos un trabajo de CPU muy pesado (contar millones de cosas)
        let total = 0;
        for (let i = 0; i < 5_000_000_000; i++) {
            total++;
        }

        if (resultat == 7) {
          console.log(`2- Victoria: ha tret ${resultat}`);
          victorias++
        } else console.log(`2- Perdidas: ha tret ${resultat}`);
        resultat = Math.round(Math.random() * 10);

        if (resultat == 7) {
          console.log(`3- Victoria: ha tret ${resultat}`);
          victorias++
        } else console.log(`3- Perdidas: ha tret ${resultat}`);

        // El trabajo terminó, avisamos al Jefe por el walkie-talkie
        process.send({
            estado: victorias > 0 ? `Victoria ${victorias} vez/veces` : '',
        });

        // Cerramos este proceso para no dejar cocineros "zombis" consumiendo RAM
        process.exit();
    }
});