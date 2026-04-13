# README del servidor TEELAB DaniQ

## Per arrancar el servidor
· npm run start - Per el mode default
· npm run dev - Per el mode dev amb nodemon

· npm run test - Per correr tests automatics amb el Jest

## ENDPOINTS

### Camisetes
· GET /api/camisetes - Per obtindre totes les camisetes (És pot  filtrar)

· GET /api/camisetes/:id - Per obtindre la camiseta amb aquest id

----

### Comandes
· GET /api/comandes - Llistar totes les comandes

· GET /api/comandes/:id - Buscar una comanda per id

· POST /api/comandes - Crear una comanda amb el body