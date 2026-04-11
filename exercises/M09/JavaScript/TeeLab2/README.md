**Arrancar el backend**

S'arranca entrant en la carpeta de server API, obrir una terminal en aquesta carpeta i fer la següent comanda: ```npm run start```

**Arrancar el frontend**

S'arranca entrant en la carpeta del public i obrir amb rightclick i seleccionar FiveServer

**Endpoints utilitzats**

Hem utilitzat el `GET /api/camisetes` per obtindre totes les camises en productes, també tenim el + config que hem utilitzat amb params opcionals pels filtres i ordenar utilitzant lo que ja tenim en el servidor :D

També s'ha utilitzat el `GET /api/camisetes/:id` en la cesta per obtindre informació de cada objecte ja que el localStorage solament guarda uns quants parametres pero no guarda el preu.

A continuació s'ha utilitzat el `POST /api/comandes` per guardar les comandes en el servidor

I per acabar s'ha utilitzat el `GET /api/comandes/:id` per veure els que teniem enmagatzemats el id en el localStorage i també per visualitzar els tickets més comodament.