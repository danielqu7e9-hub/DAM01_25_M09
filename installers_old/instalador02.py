import os

# -------------------------------------------------------
# CONTENIDO HTML: DASHBOARD OSCURO (CARDS)
# -------------------------------------------------------

index_html = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript · M04 / M09 · DAM01</title>

  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="dark">
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo-area">
        <i class="fa-solid fa-code"></i>
        <span>JS<strong>Dashboard</strong></span>
      </div>

      <button class="btn-primary" onclick="location.href='editor.html'">
        <i class="fa-solid fa-pen-to-square"></i>
        Editor de archivos
      </button>

      <nav class="nav-links">
        <div class="nav-group-title">MÓDULOS</div>
        <div class="nav-item" onclick="document.getElementById('m04').scrollIntoView({behavior:'smooth'})">
          <i class="fa-solid fa-folder"></i> M04
        </div>
        <div class="nav-item" onclick="document.getElementById('m09').scrollIntoView({behavior:'smooth'})">
          <i class="fa-solid fa-folder"></i> M09
        </div>
      </nav>

      <div class="sidebar-bottom">
        <a href="https://classroom.google.com" target="_blank" class="btn-classroom">
          <i class="fa-solid fa-chalkboard-user"></i> Classroom
        </a>
      </div>
    </aside>

    <main class="content">
      <header class="top-header">
        <div class="header-text">
          <h1>JavaScript</h1>
          <p>M04 y M09 de DAM01 en el ITB con Alicia Vázquez.</p>
          <p class="small">Código realizado por <strong>Pepe Garcia</strong>.</p>
        </div>

        <div class="header-meta">
          <div class="author-card">
            <i class="fa-solid fa-user-gear"></i>
            <div>
              <span class="label">Programador</span>
              <span class="value">Pepe Garcia</span>
            </div>
          </div>
          <div class="author-card">
            <i class="fa-regular fa-envelope"></i>
            <div>
              <span class="label">Contacto</span>
              <span class="value">pepe.garcia@example.com</span>
            </div>
          </div>
        </div>
      </header>

      <section class="snippet-toolbar">
        <h2>Gestor de snippets</h2>
        <p class="snippet-info">
          Selecciona un lenguaje y guarda pequeños fragmentos de código.
        </p>
        <div class="snippet-select-row">
          <div class="select-wrapper">
            <i class="fa-solid fa-code"></i>
            <select id="language-select">
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="kotlin">Kotlin</option>
              <option value="swift">Swift</option>
              <option value="typescript">TypeScript</option>
              <option value="ruby">Ruby</option>
              <option value="r">R</option>
              <option value="scala">Scala</option>
              <option value="dart">Dart</option>
              <option value="matlab">MATLAB</option>
              <option value="sql">SQL</option>
              <option value="bash">Shell / Bash</option>
              <option value="perl">Perl</option>
            </select>
          </div>
          <button class="btn-outline" type="button" onclick="copySnippet()">
            <i class="fa-regular fa-clipboard"></i>
            Copiar snippet
          </button>
        </div>
        <textarea id="snippet-editor"
                  class="snippet-editor"
                  rows="4"
                  placeholder="Pega aquí tu código para este lenguaje..."></textarea>
      </section>

      <!-- CARDS M04 -->
      <section id="m04" class="card-section">
        <h2 class="section-title">M04 · Programación</h2>
        <div class="card-grid">
          <article class="topic-card" onclick="location.href='temas/m04/tema1.html'">
            <div class="card-image-wrapper">
              <img src="assets/img/m04_tema1.jpg" alt="Introducción a JavaScript">
              <span class="badge badge-m04">M04</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">Introducción a JavaScript</h3>
              <p class="card-subtitle">Sintaxis básica, variables y tipos</p>
              <p class="card-description">
                Primeros pasos con JavaScript y ejecución en el navegador.
              </p>
              <ul class="card-links">
                <li><a href="temas/m04/tema1.html#ejercicios"><i class="fa-solid fa-code"></i> Ejercicios</a></li>
                <li><a href="temas/m04/tema1.html#ejemplos"><i class="fa-solid fa-flask"></i> Ejemplos</a></li>
              </ul>
            </div>
            <footer class="card-footer">
              <a href="https://tu-enlace-apuntes-m04" class="card-footer-link" target="_blank">
                <i class="fa-solid fa-book"></i> Apuntes de clase
              </a>
              <a href="https://tu-git-m04" class="card-footer-link" target="_blank">
                <i class="fa-brands fa-git-alt"></i> Repo Git
              </a>
            </footer>
          </article>
        </div>
      </section>

      <!-- CARDS M09 -->
      <section id="m09" class="card-section">
        <h2 class="section-title">M09 · Desarrollo Web</h2>
        <div class="card-grid">
          <article class="topic-card" onclick="location.href='temas/m09/tema1.html'">
            <div class="card-image-wrapper">
              <img src="assets/img/m09_tema1.jpg" alt="DOM y eventos">
              <span class="badge badge-m09">M09</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">DOM y eventos</h3>
              <p class="card-subtitle">Interacción con la página</p>
              <p class="card-description">
                Manipulación del DOM, gestión de eventos y componentes dinámicos.
              </p>
              <ul class="card-links">
                <li><a href="temas/m09/tema1.html#ejercicios"><i class="fa-solid fa-code-branch"></i> Ejercicios</a></li>
                <li><a href="temas/m09/tema1.html#ejemplos"><i class="fa-solid fa-wand-magic-sparkles"></i> Ejemplos</a></li>
              </ul>
            </div>
            <footer class="card-footer">
              <a href="https://tu-enlace-apuntes-m09" class="card-footer-link" target="_blank">
                <i class="fa-solid fa-book-open"></i> Apuntes de clase
              </a>
              <a href="https://tu-git-m09" class="card-footer-link" target="_blank">
                <i class="fa-brands fa-github"></i> Repo Git
              </a>
            </footer>
          </article>
        </div>
      </section>

      <footer class="site-footer">
        <div class="footer-left">
          <span>Contacto: <strong>pepe.garcia@example.com</strong></span>
          <span>·</span>
          <span>Programador: Pepe Garcia</span>
        </div>
        <div class="footer-right">
          <span>
            <i class="fa-regular fa-copyright"></i>
            CC BY-NC-SA · Se respetan los derechos de autor de los materiales externos.
          </span>
        </div>
      </footer>
    </main>
  </div>

  <script>
    function copySnippet() {
      const textarea = document.getElementById('snippet-editor');
      textarea.select();
      document.execCommand('copy');
    }
  </script>
</body>
</html>
"""

# -------------------------------------------------------
# EDITOR HTML: PÁGINA APARTE PARA EDITAR ARCHIVOS
# (la escritura real en disco la hace un script Python)
# -------------------------------------------------------

editor_html = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editor de archivos · JS Dashboard</title>
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="dark editor-body">
  <header class="editor-header">
    <h1><i class="fa-solid fa-pen-to-square"></i> Editor de archivos</h1>
    <button class="btn-outline" onclick="location.href='index.html'">
      <i class="fa-solid fa-arrow-left"></i> Volver al dashboard
    </button>
  </header>

  <main class="editor-main">
    <div class="editor-sidebar">
      <h2>Archivos de ejemplo</h2>
      <ul>
        <li><button onclick="loadFile('temas/m04/tema1.html')">M04 · tema1.html</button></li>
        <li><button onclick="loadFile('temas/m09/tema1.html')">M09 · tema1.html</button></li>
      </ul>
      <p class="note">
        Para guardar de verdad en disco, ejecuta el script
        <code>python3 guardar.py ruta fichero</code> desde tu entorno.
      </p>
    </div>

    <section class="editor-panel">
      <div class="editor-top-bar">
        <label>Ruta del archivo:</label>
        <input id="file-path" type="text" value="temas/m04/tema1.html">
        <button class="btn-outline" onclick="saveToLocal()">
          <i class="fa-regular fa-save"></i> Guardar en navegador
        </button>
      </div>
      <textarea id="file-content" class="editor-textarea"
                spellcheck="false"
                placeholder="Aquí se mostrará el contenido del archivo."></textarea>
      <p class="note">
        Este editor guarda en <code>localStorage</code>. Para volcar los cambios a disco
        usa un script Python que sobreescriba el archivo respetando la licencia y derechos de autor.
      </p>
    </section>
  </main>

  <script>
    function loadFile(path) {
      document.getElementById('file-path').value = path;
      const stored = localStorage.getItem('editor::' + path);
      if (stored !== null) {
        document.getElementById('file-content').value = stored;
      } else {
        document.getElementById('file-content').value =
          '<!-- Nuevo archivo ' + path + ' -->\\n';
      }
    }

    function saveToLocal() {
      const path = document.getElementById('file-path').value;
      const content = document.getElementById('file-content').value;
      localStorage.setItem('editor::' + path, content);
      alert('Guardado en localStorage. Usa Python para escribirlo en disco.');
    }

    // carga por defecto
    loadFile('temas/m04/tema1.html');
  </script>
</body>
</html>
"""

# -------------------------------------------------------
# CSS TEMA OSCURO (cards + layout + editor)
# -------------------------------------------------------

css_dark = """:root {
  --bg-body: #0f172a;
  --bg-panel: #020617;
  --bg-card: #020617;
  --bg-card-soft: #111827;
  --primary: #38bdf8;
  --primary-soft: rgba(56, 189, 248, 0.18);
  --accent: #fb923c;
  --text-main: #e5e7eb;
  --text-muted: #9ca3af;
  --border-soft: #1f2933;
  --shadow-soft: 0 20px 45px rgba(15, 23, 42, 0.7);
  --radius-lg: 18px;
  --radius-md: 12px;
  --radius-pill: 999px;
  --transition-fast: 0.18s ease-out;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body.dark {
  background: radial-gradient(circle at top, #1e293b 0, #020617 55%);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
}

/* LAYOUT PRINCIPAL ------------------------------------- */

.app-layout {
  display: flex;
  min-height: 100vh;
}

/* SIDEBAR --------------------------------------------- */

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #020617 0, #020617 40%, #030712 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-soft);
}

.logo-area {
  font-size: 1.2rem;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  color: var(--text-main);
}
.logo-area i {
  color: var(--primary);
}

.btn-primary {
  width: 100%;
  padding: 11px 14px;
  background: var(--primary);
  color: #020617;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 20px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.4);
  transform: translateY(-1px);
}

.nav-group-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  padding-left: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 999px;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  font-size: 0.9rem;
}
.nav-item:hover {
  background: rgba(15, 23, 42, 0.9);
  color: var(--primary);
  transform: translateX(2px);
}

.sidebar-bottom {
  margin-top: auto;
}
.btn-classroom {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: transparent;
  border: 1px solid #16a34a;
  color: #bbf7d0;
  text-decoration: none;
  border-radius: 999px;
  transition: 0.3s;
  justify-content: center;
  font-size: 0.88rem;
}
.btn-classroom:hover {
  background: #16a34a;
  color: #f9fafb;
  box-shadow: 0 10px 25px rgba(22, 163, 74, 0.5);
}

/* CONTENIDO PRINCIPAL ---------------------------------- */

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* HEADER SUPERIOR -------------------------------------- */

.top-header {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-text h1 {
  margin: 0 0 4px;
  font-size: 1.7rem;
  letter-spacing: -0.03em;
}
.header-text p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.header-text .small {
  font-size: 0.85rem;
}

.header-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-pill);
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.3);
  font-size: 0.8rem;
}
.author-card i {
  color: var(--primary);
}
.author-card .label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
.author-card .value {
  font-weight: 600;
}

/* MAIN DENTRO DE CONTENT -------------------------------- */

.page-main {
  padding: 18px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* SNIPPETS BAR ----------------------------------------- */

.snippet-toolbar {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  padding: 1rem 1.2rem;
  background: radial-gradient(circle at top left,
    rgba(56, 189, 248, 0.12),
    rgba(15, 23, 42, 0.95));
}

.snippet-toolbar h2 {
  margin: 0 0 0.3rem;
  font-size: 1rem;
}
.snippet-info {
  margin: 0 0 0.7rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.snippet-select-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 0.6rem;
}

.select-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-pill);
  background: #020617;
  border: 1px solid var(--border-soft);
  color: var(--text-main);
}
.select-wrapper i {
  color: var(--primary);
}
.select-wrapper select {
  border: none;
  background: transparent;
  font-size: 0.86rem;
  padding-right: 0.2rem;
  outline: none;
  color: var(--text-main);
}

.btn-outline {
  border-radius: var(--radius-pill);
  border: 1px solid var(--primary);
  background: transparent;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: background-color var(--transition-fast),
              color var(--transition-fast),
              box-shadow var(--transition-fast),
              transform var(--transition-fast);
}
.btn-outline:hover {
  background: var(--primary);
  color: #020617;
  box-shadow: 0 10px 25px rgba(56, 189, 248, 0.5);
  transform: translateY(-1px);
}

.snippet-editor {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-soft);
  padding: 0.6rem 0.7rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 0.82rem;
  resize: vertical;
  min-height: 70px;
  background: #020617;
  color: var(--text-main);
}

/* SECCIONES Y GRID ------------------------------------- */

.card-section {
  margin-top: 0.4rem;
}
.section-title {
  margin: 0 0 0.8rem;
  font-size: 1rem;
  color: var(--text-main);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
}

/* CARD OSCURA ------------------------------------------ */

.topic-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast),
              box-shadow var(--transition-fast),
              border-color var(--transition-fast),
              background-color var(--transition-fast);
}
.topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.9);
  border-color: var(--primary-soft);
  background-color: var(--bg-card-soft);
}

.card-image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
  transition: transform 0.35s ease-out, filter 0.35s ease-out;
  filter: saturate(1.1);
}
.topic-card:hover .card-image-wrapper img {
  transform: scale(1.06);
  filter: saturate(1.25);
}

.badge {
  position: absolute;
  inset: 12px auto auto 12px;
  padding: 0.18rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: #020617;
}
.badge-m04 {
  background: var(--primary);
}
.badge-m09 {
  background: var(--accent);
}

/* CUERPO DE CARD */

.card-body {
  padding: 0.9rem 1rem 0.55rem;
}
.card-title {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}
.card-subtitle {
  margin: 0 0 0.4rem;
  font-size: 0.84rem;
  color: var(--text-muted);
}
.card-description {
  margin: 0 0 0.6rem;
  font-size: 0.88rem;
  color: var(--text-main);
}

/* ENLACES DENTRO DE CARD */

.card-links {
  list-style: none;
  padding: 0;
  margin: 0 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.card-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--primary);
  text-decoration: none;
  padding: 0.18rem 0;
  border-radius: 6px;
  transition: color var(--transition-fast),
              background-color var(--transition-fast),
              transform var(--transition-fast);
}
.card-links a i {
  font-size: 0.85rem;
}
.card-links a:hover {
  background-color: rgba(56, 189, 248, 0.12);
  color: #e0f2fe;
  transform: translateX(1px);
}

/* FOOTER DE CARD */

.card-footer {
  padding: 0.5rem 1rem 0.6rem;
  border-top: 1px solid var(--border-soft);
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}
.card-footer-link {
  flex: 1;
  font-size: 0.8rem;
  text-decoration: none;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.32rem 0.38rem;
  border-radius: 999px;
  background: #020617;
  border: 1px solid var(--border-soft);
  transition: background-color var(--transition-fast),
              border-color var(--transition-fast),
              transform var(--transition-fast),
              box-shadow var(--transition-fast);
}
.card-footer-link i {
  font-size: 0.85rem;
}
.card-footer-link:hover {
  background-color: rgba(56, 189, 248, 0.15);
  border-color: var(--primary);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  transform: translateY(-1px);
}

/* FOOTER GENERAL -------------------------------------- */

.site-footer {
  border-top: 1px solid var(--border-soft);
  padding: 0.8rem 0;
  margin: 14px 28px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.footer-left,
.footer-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
}

/* EDITOR PAGE ----------------------------------------- */

.editor-body {
  background: radial-gradient(circle at top, #020617 0, #000 60%);
  color: var(--text-main);
}

.editor-header {
  padding: 14px 24px;
  border-bottom: 1px solid var(--border-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(14px);
}
.editor-header h1 {
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.editor-main {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: calc(100vh - 60px);
}

.editor-sidebar {
  border-right: 1px solid var(--border-soft);
  padding: 16px 18px;
  background: #020617;
}
.editor-sidebar h2 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}
.editor-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0 0 10px;
}
.editor-sidebar li {
  margin-bottom: 4px;
}
.editor-sidebar button {
  width: 100%;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--border-soft);
  background: #020617;
  color: var(--text-main);
  font-size: 0.8rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.editor-sidebar button:hover {
  background: #111827;
}
.editor-sidebar .note {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.editor-panel {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.editor-top-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 0.8rem;
}
.editor-top-bar label {
  color: var(--text-muted);
}
.editor-top-bar input {
  flex: 1;
  min-width: 160px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border-soft);
  background: #020617;
  color: var(--text-main);
  font-size: 0.8rem;
}
.editor-textarea {
  flex: 1;
  width: 100%;
  min-height: 260px;
  border-radius: 10px;
  border: 1px solid var(--border-soft);
  padding: 0.6rem 0.7rem;
  background: #020617;
  color: var(--text-main);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 0.8rem;
  resize: vertical;
}
.editor-panel .note {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* RESPONSIVE ------------------------------------------ */

@media (max-width: 900px) {
  .app-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 10px 14px;
    gap: 12px;
  }
  .sidebar-bottom {
    display: none;
  }
  .nav-links {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .content {
    min-height: calc(100vh - 70px);
  }
  .editor-main {
    grid-template-columns: 1fr;
  }
  .editor-sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border-soft);
  }
}
"""

# -------------------------------------------------------
# HTML BASE PARA PÁGINAS DE TEMAS
# -------------------------------------------------------

tema_template = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titulo}</title>
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body class="dark">
  <main class="editor-panel" style="min-height:100vh;">
    <a href="../../index.html" class="btn-outline" style="margin-bottom:12px; width:max-content;">
      <i class="fa-solid fa-arrow-left"></i> Volver al dashboard
    </a>

    <h1>{titulo}</h1>
    <p><strong>Módulo:</strong> {modulo}</p>

    <h2 id="ejercicios">Ejercicios</h2>
    <p>Añade aquí los enlaces o código de los ejercicios.</p>

    <h2 id="ejemplos">Ejemplos</h2>
    <p>Añade aquí ejemplos de código, capturas, etc.</p>
  </main>
</body>
</html>
"""

# -------------------------------------------------------
# FUNCIONES DE INSTALACIÓN
# -------------------------------------------------------

def create_file(path: str, content: str) -> None:
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"✅ Creado: {path}")

def main() -> None:
    print("📦 Instalando dashboard oscuro JS M04/M09 con editor...")

    # Rutas necesarias
    create_file("index.html", index_html)
    create_file("editor.html", editor_html)
    create_file("assets/css/style.css", css_dark)

    # Imágenes de ejemplo (vacías para evitar 404)
    open("assets/img/m04_tema1.jpg", "ab").close()
    open("assets/img/m09_tema1.jpg", "ab").close()

    # Páginas de temas
    create_file("temas/m04/tema1.html",
                tema_template.format(titulo="M04 · Tema 1 · Introducción a JavaScript",
                                     modulo="M04"))
    create_file("temas/m09/tema1.html",
                tema_template.format(titulo="M09 · Tema 1 · DOM y eventos",
                                     modulo="M09"))

    print("\n🎉 Instalación completada.")
    print("Abre 'index.html' en tu navegador para ver las cards en tema oscuro.")
    print("Abre 'editor.html' para probar el editor básico (usa localStorage).")
    print("Para escribir cambios en disco usa un script Python que abra el archivo y lo sobrescriba de forma segura, respetando los derechos de autor de cualquier contenido externo.")

if __name__ == "__main__":
    main()
