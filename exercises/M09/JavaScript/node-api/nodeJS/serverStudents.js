const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// Devuelve JSON
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {

  console.log(req.method, req.url);

  // GET /students
  if (req.method === "GET" && req.url === "/students") {
    return sendJson(res, 200, students);
  }

  // TODO 1: GET /students/:id
  //Buscamos la info de un alumno completo.
  if (req.method === "GET" && req.url.startsWith("/students/")) {

    // 1. Extraer id de la URL
    let code = req.url.split("/").at(-1);

    // 2. Buscar alumno en el array
    const position = students.findIndex(estudiant => estudiant.id == code);

    // 3. Si no existe → 404
    if (position === -1) {
      return sendJson(res, 404, { message: "Not Found" });
    }

    // 4. Si existe → devolver 200 + alumno
    return sendJson(res, 200, students[position]);
  }

  // TODO 2: DELETE /students/:id
  if (req.method === "DELETE" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    let code = req.url.split("/").at(-1);

    // 2. Comprobar si existe
    const position = students.findIndex(estudiant => estudiant.id == code);
    
    // 4. Si no existe → 404
    if (position === -1) {
      return sendJson(res, 404, { message: "Not Found" });
    }

    // 3. Eliminarlo del array
    students.splice(position, 1);

    
    // 5. Si se elimina → 204 (sin body)
    return sendJson(res, 204, { message: "" })

  }
  // TODO 3: POST /students
  if (req.method === "POST" && req.url === "/students") {

    // 1. Leer el body con readBody() --> Es donde esta toda la info del nuevo alumno.
    return (async () => {
      try {
        const alumneNou = await readBody(req);

        // 2. Validar que tenga id, nombre y curso
        if (!alumneNou.id || !alumneNou.nombre || !alumneNou.curso) {
          return sendJson(res, 400, { message: "Falten camps" });
        }

        // 3. Comprobar que el id no esté repetido
        if (students.some(estudiant => estudiant.id === alumneNou.id)) {
          return sendJson(res, 409, { message: "ID ja existent" });
        }

        // 4. Añadir al array students
        students.push(alumneNou);

        // 5. Devolver 201 + alumno creado
        return sendJson(res, 201, alumneNou);

      } catch (err) {
        return sendJson(res, 400, { message: "Json no valid" });
      }
    })();
  }

  // TODO 4: PUT /students/:id
  if (req.method === "PUT" && req.url.startsWith("/students/")) {

    return (async () => {
      try {

        // 1. Extraer id
        let code = req.url.split("/").at(-1);

        // 2. Buscar alumno
        const position = students.findIndex(estudiant => estudiant.id == code);

        // 3. Si no existe → 404
        if (position === -1) {
          return sendJson(res, 404, { message: "Not Found" });
        }

        // 4. Leer body con readBody() --> Ahora será otra callback!!!
        const canviis = await readBody(req);
        
        // 5. Actualizar campos enviados
        if (canviis.nombre) {
          students[position].nombre = canviis.nombre;
        }

        if (canviis.curso) {
          students[position].curso = canviis.curso;
        }

        // 6. Devolver 200 + alumno actualizado
        return sendJson(res, 200, { message: "alumno actualizado" });

      } catch (err) {
        return sendJson(res, 400, { message: "Json no valid" });
      }
    })();

  }

  // Si no coincide ningún endpoint
  sendJson(res, 404, { message: "Not Found" });
});

/* TODO: Crear función que lea el body y devuelva el JSON parseado
En Node puro, el body no viene empaquetado.
Llega en trozos.
Tenemos que montarlo nosotros.*/
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});