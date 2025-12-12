import os
import json

# -------------------------------------------------------------------------
# CONFIGURACIÓ DEL CONTINGUT DELS ARXIUS
# -------------------------------------------------------------------------

html_content = """<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Acadèmic</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="app-layout">
        <aside class="sidebar">
            <div class="logo-area">
                <i class="fa-brands fa-google"></i>
                <span>My<strong>Drive</strong> Acadèmic</span>
            </div>

            <button id="global-tree-btn" class="btn-primary">
                <i class="fa-solid fa-sitemap"></i> Veure Arbre Global
            </button>

            <nav class="nav-links">
                <div class="nav-group-title">MÒDULS</div>
                <div id="module-list">
                    </div>
                
                <div class="nav-group-title" style="margin-top: 20px;">SYSTEM</div>
                <div class="nav-item" onclick="navigateTo(['templates'])">
                    <i class="fa-solid fa-layer-group"></i> Templates
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
                <div id="breadcrumbs" class="breadcrumbs">
                    <span class="crumb-root"><i class="fa-solid fa-home"></i> Inici</span>
                </div>
                <div class="actions">
                    <div class="search-wrapper">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="search" placeholder="Cerca fitxers...">
                    </div>
                </div>
            </header>

            <div id="file-display" class="grid-container">
                </div>
        </main>
    </div>

    <div id="tree-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fa-solid fa-folder-tree"></i> Mapa del Lloc</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div id="full-tree-view" class="tree-structure"></div>
            </div>
        </div>
    </div>

    <script src="assets/js/app.js"></script>
</body>
</html>
"""

css_content = """:root {
    --bg-body: #121212;
    --bg-panel: #1e1e1e;
    --primary: #8ab4f8; 
    --classroom: #137333; 
    --text: #e8eaed;
    --text-sec: #9aa0a6;
    --border: #3c4043;
}

* { box-sizing: border-box; }
body { margin: 0; font-family: 'Roboto', 'Segoe UI', sans-serif; background: var(--bg-body); color: var(--text); overflow: hidden; }

.app-layout { display: flex; height: 100vh; }

/* SIDEBAR */
.sidebar { width: 260px; background: var(--bg-panel); padding: 20px; display: flex; flex-direction: column; border-right: 1px solid var(--border); transition: 0.3s; }
.logo-area { font-size: 1.2rem; margin-bottom: 30px; display: flex; align-items: center; gap: 10px; user-select: none; }

.btn-primary { width: 100%; padding: 12px; background: var(--primary); color: #000; border: none; border-radius: 24px; cursor: pointer; font-weight: bold; margin-bottom: 20px; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-primary:hover { opacity: 0.9; transform: scale(1.02); box-shadow: 0 4px 12px rgba(138, 180, 248, 0.3); }

.nav-group-title { font-size: 0.75rem; color: var(--text-sec); margin-bottom: 10px; padding-left: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
.nav-item { padding: 10px 15px; cursor: pointer; border-radius: 0 20px 20px 0; color: var(--text); display: flex; align-items: center; gap: 12px; transition: background 0.2s; margin-bottom: 2px; }
.nav-item:hover { background: rgba(138, 180, 248, 0.1); }
.nav-item.active { background: rgba(138, 180, 248, 0.2); color: var(--primary); }

.sidebar-bottom { margin-top: auto; }
.btn-classroom { display: flex; align-items: center; gap: 10px; padding: 12px; background: transparent; border: 1px solid var(--classroom); color: #81c995; text-decoration: none; border-radius: 8px; transition: 0.3s; justify-content: center; font-weight: 500; }
.btn-classroom:hover { background: var(--classroom); color: white; box-shadow: 0 4px 12px rgba(19, 115, 51, 0.3); }

/* MAIN CONTENT */
.content { flex: 1; display: flex; flex-direction: column; padding: 0; position: relative; }
.top-header { padding: 15px 30px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--bg-body); height: 70px; }
.breadcrumbs { display: flex; gap: 8px; color: var(--text-sec); align-items: center; font-size: 0.95rem; }
.crumb-item { color: var(--text); cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: 0.2s; }
.crumb-item:hover { background: rgba(255,255,255,0.1); }
.crumb-root { cursor: pointer; }

.search-wrapper { background: var(--bg-panel); padding: 10px 20px; border-radius: 24px; display: flex; align-items: center; gap: 10px; width: 350px; border: 1px solid transparent; transition: 0.3s; }
.search-wrapper:focus-within { background: var(--bg-body); border-color: var(--primary); box-shadow: 0 0 0 4px rgba(138, 180, 248, 0.1); }
.search-wrapper input { background: transparent; border: none; color: white; width: 100%; outline: none; font-size: 1rem; }

/* GRID FILES */
.grid-container { padding: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; overflow-y: auto; height: 100%; align-content: flex-start; scroll-behavior: smooth; }
/* Scrollbar personalitzada */
.grid-container::-webkit-scrollbar { width: 8px; }
.grid-container::-webkit-scrollbar-track { background: var(--bg-body); }
.grid-container::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.card { background: var(--bg-panel); border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); border: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; height: 150px; text-decoration: none; color: var(--text); position: relative; overflow: hidden; }
.card:hover { background: #2d2e30; border-color: var(--primary); transform: translateY(-4px); box-shadow: 0 6px 15px rgba(0,0,0,0.4); }
.card i { font-size: 3rem; margin-bottom: 15px; transition: 0.2s; }
.card:hover i { transform: scale(1.1); }
.card span { font-size: 0.9rem; word-break: break-word; line-height: 1.3; }

/* MODAL */
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; backdrop-filter: blur(5px); animation: fadeIn 0.2s; }
.modal-content { background: var(--bg-panel); margin: 5% auto; width: 60%; max-height: 80vh; border-radius: 16px; border: 1px solid var(--border); display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.modal-header { padding: 20px 30px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 400; }
.modal-body { padding: 30px; overflow-y: auto; }
.close-modal { font-size: 2rem; cursor: pointer; color: var(--text-sec); transition: 0.2s; }
.close-modal:hover { color: var(--text); }

/* Tree Styles */
.tree-node { margin-left: 15px; border-left: 1px solid #333; padding-left: 15px; margin-top: 8px; position: relative; }
.tree-label { cursor: pointer; padding: 6px 10px; display: inline-flex; align-items: center; gap: 8px; border-radius: 6px; transition: 0.2s; width: max-content; }
.tree-label:hover { background: rgba(138, 180, 248, 0.1); color: var(--primary); }
.tree-label i { width: 20px; text-align: center; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Responsive */
@media (max-width: 768px) {
    .app-layout { flex-direction: column; }
    .sidebar { width: 100%; height: auto; flex-direction: row; align-items: center; padding: 10px; overflow-x: auto; border-bottom: 1px solid var(--border); border-right: none; }
    .sidebar-bottom { display: none; } /* Amagar classroom en mobil per espai */
    .logo-area { margin-bottom: 0; margin-right: 20px; font-size: 1rem; }
    .btn-primary { width: auto; margin-bottom: 0; padding: 8px 15px; font-size: 0.8rem; }
    .nav-links { display: flex; flex-direction: row; gap: 10px; align-items: center; }
    .nav-group-title { display: none; }
    .nav-item { border-radius: 8px; margin-bottom: 0; white-space: nowrap; }
    .search-wrapper { width: 200px; }
}
"""

js_content = """document.addEventListener('DOMContentLoaded', () => {
    let fileSystem = {};
    let currentPath = [];
    const display = document.getElementById('file-display');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const modal = document.getElementById('tree-modal');
    const treeView = document.getElementById('full-tree-view');
    const searchInput = document.getElementById('search');

    // 1. Carregar dades
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            fileSystem = data;
            init();
        })
        .catch(err => {
            display.innerHTML = `<div style="text-align:center; padding:50px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size:3rem; color:#f0ad4e;"></i>
                <p>No s'ha trobat data.json. Executa <code>python3 gestor.py</code>!</p>
            </div>`;
        });

    function init() {
        renderSidebar();
        loadLocationFromHash();
        window.onpopstate = loadLocationFromHash;
    }

    // 2. Navegació
    function navigateTo(pathArray) {
        currentPath = pathArray;
        const hash = pathArray.length > 0 ? '#' + pathArray.join('/') : '#';
        // Només fem pushState si l'hash és diferent (per evitar bucles)
        if(window.location.hash !== hash) {
            history.pushState(null, null, hash);
        }
        updateBreadcrumbs();
        
        let currentFolder = fileSystem;
        pathArray.forEach(key => {
            if (currentFolder[key] && currentFolder[key].children) {
                currentFolder = currentFolder[key].children;
            }
        });

        renderGrid(currentFolder);
    }

    // Exposem navigateTo globalment
    window.navigateTo = navigateTo;

    function renderGrid(folderContent) {
        display.innerHTML = '';
        
        if (currentPath.length > 0) {
            const back = document.createElement('div');
            back.className = 'card';
            back.innerHTML = `<i class="fa-solid fa-arrow-turn-up" style="color:var(--primary)"></i><span>Enrere</span>`;
            back.onclick = () => {
                const newPath = [...currentPath];
                newPath.pop();
                navigateTo(newPath);
            };
            display.appendChild(back);
        }

        const keys = Object.keys(folderContent).sort((a,b) => {
            // Primer carpetes, després fitxers
            const typeA = folderContent[a].type;
            const typeB = folderContent[b].type;
            if(typeA === typeB) return a.localeCompare(b);
            return typeA === 'folder' ? -1 : 1;
        });

        keys.forEach((key, index) => {
            const item = folderContent[key];
            const el = document.createElement(item.type === 'folder' ? 'div' : 'a');
            el.className = 'card';
            el.style.animation = `fadeIn 0.3s ease forwards ${index * 0.05}s`;
            el.style.opacity = '0'; // Per l'animació

            let icon = 'fa-file';
            let color = '#9aa0a6';
            
            if(item.type === 'folder') { 
                icon = 'fa-folder'; color = '#8ab4f8'; 
                if(key.includes('img')) { icon = 'fa-images'; color = '#f28b82'; }
            }
            else {
                const ext = key.split('.').pop().toLowerCase();
                if(ext === 'html') { icon = 'fa-html5'; color = '#e34f26'; }
                else if(ext === 'css') { icon = 'fa-css3-alt'; color = '#264de4'; }
                else if(ext === 'js') { icon = 'fa-js'; color = '#f7df1e'; }
                else if(ext === 'py') { icon = 'fa-python'; color = '#ffd43b'; }
                else if(ext.match(/(jpg|jpeg|png|gif|svg)/)) { icon = 'fa-image'; color = '#c39bd3'; }
                else if(ext === 'pdf') { icon = 'fa-file-pdf'; color = '#e2574c'; }
            }

            el.innerHTML = `<i class="fa-solid ${icon}" style="color:${color}"></i><span>${key}</span>`;

            if (item.type === 'folder') {
                el.onclick = () => navigateTo([...currentPath, key]);
            } else {
                el.href = item.path;
                el.target = "_blank";
            }
            display.appendChild(el);
        });
    }

    function renderSidebar() {
        const list = document.getElementById('module-list');
        list.innerHTML = '';
        Object.keys(fileSystem).forEach(key => {
            // Filtrem carpetes de sistema
            if (fileSystem[key].type === 'folder' && !['assets', 'templates'].includes(key)) {
                const div = document.createElement('div');
                div.className = 'nav-item';
                div.innerHTML = `<i class="fa-solid fa-folder"></i> ${key}`;
                div.onclick = () => navigateTo([key]);
                list.appendChild(div);
            }
        });
    }

    function updateBreadcrumbs() {
        breadcrumbs.innerHTML = `<span class="crumb-root" onclick="navigateTo([])"><i class="fa-solid fa-home"></i> Inici</span>`;
        let pathAccum = [];
        currentPath.forEach(p => {
            pathAccum.push(p);
            const clickPath = [...pathAccum]; 
            const span = document.createElement('span');
            span.innerHTML = ` <span style="color:#666">/</span> <span class="crumb-item">${p}</span>`;
            span.querySelector('.crumb-item').onclick = () => navigateTo(clickPath);
            breadcrumbs.appendChild(span);
        });
    }

    function loadLocationFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Decodifiquem URL (espais, etc)
            const decoded = decodeURIComponent(hash);
            navigateTo(decoded.split('/'));
        } else {
            navigateTo([]);
        }
    }

    // Modal
    document.getElementById('global-tree-btn').onclick = () => {
        modal.style.display = 'block';
        treeView.innerHTML = '';
        renderTreeRecursive(fileSystem, treeView);
    };
    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

    function renderTreeRecursive(data, container) {
        Object.keys(data).forEach(key => {
            const item = data[key];
            const node = document.createElement('div');
            node.className = 'tree-node';
            
            const label = document.createElement('div');
            label.className = 'tree-label';
            const icon = item.type === 'folder' ? 'fa-folder' : 'fa-file';
            label.innerHTML = `<i class="fa-solid ${icon}" style="color:${item.type==='folder'?'#8ab4f8':'#9aa0a6'}"></i> ${key}`;
            
            if(item.type === 'file') {
                label.onclick = () => window.open(item.path, '_blank');
            }
            
            node.appendChild(label);
            container.appendChild(node);

            if (item.children) {
                renderTreeRecursive(item.children, node);
            }
        });
    }

    // Cerca
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const txt = card.innerText.toLowerCase();
            card.style.display = txt.includes(val) ? 'flex' : 'none';
        });
    });
});
"""

gestor_py_content = """import os
import json

ROOT = '.'
OUTPUT = 'data.json'
# Arxius a ignorar
IGNORE = ['.git', '__pycache__', 'gestor.py', 'data.json', 'index.html', 'instalador.py', '.vscode']

def scan_dir(path):
    tree = {}
    try:
        items = sorted(os.listdir(path))
        for item in items:
            if item in IGNORE or item.startswith('.'):
                continue
            
            full_path = os.path.join(path, item)
            web_path = full_path.replace(os.sep, '/')
            if web_path.startswith('./'): web_path = web_path[2:]

            node = { "path": web_path }

            if os.path.isdir(full_path):
                node["type"] = "folder"
                node["children"] = scan_dir(full_path)
                tree[item] = node
            else:
                node["type"] = "file"
                tree[item] = node
                
    except PermissionError:
        print(f"🚫 Sense permisos: {path}")

    return tree

if __name__ == "__main__":
    print("🚀 Generant mapa del lloc...")
    data = scan_dir(ROOT)
    
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    
    print("✅ data.json creat correctament!")
"""

template_content = """<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plantilla Pràctica</title>
    <style>
        body { font-family: sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; color: #333; line-height: 1.6; }
        h1 { border-bottom: 2px solid #ddd; padding-bottom: 0.5rem; color: #444; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 4px; }
        img { max-width: 100%; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 1rem 0; }
        .back-link { display: inline-block; margin-bottom: 1rem; text-decoration: none; color: #0066cc; font-weight: bold; }
    </style>
</head>
<body>
    <a href="../../index.html" class="back-link">← Tornar al Dashboard</a>
    
    <header>
        <h1>Títol de la Pràctica</h1>
        <p><strong>Autor:</strong> El teu nom | <strong>Mòdul:</strong> MXX</p>
    </header>

    <main>
        <h2>Introducció</h2>
        <p>Aquesta és una pàgina generada des de la plantilla.</p>
        
        <h2>Exemple d'Imatge</h2>
        <img src="../../assets/img_repo/placeholder.png" alt="Placeholder">
    </main>
</body>
</html>
"""

# -------------------------------------------------------------------------
# FUNCIONS D'INSTAL·LACIÓ
# -------------------------------------------------------------------------

def create_file(path, content):
    # Assegurar que el directori existeix
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"✅ Creat: {path}")

def main():
    print("📦 Iniciant instal·lació del Dashboard...")

    # 1. Crear estructura i arxius
    create_file('index.html', html_content)
    create_file('gestor.py', gestor_py_content)
    create_file('assets/css/style.css', css_content)
    create_file('assets/js/app.js', js_content)
    create_file('templates/base_template.html', template_content)

    # 2. Crear carpetes buides addicionals
    os.makedirs('assets/img_repo', exist_ok=True)
    os.makedirs('modules/M04', exist_ok=True)
    os.makedirs('modules/M09', exist_ok=True)
    print("✅ Carpetes creades: modules/M04, modules/M09, assets/img_repo")

    # 3. Crear arxius de prova
    create_file('modules/M04/exemple_apunts.txt', "Això és un arxiu de prova dins del Mòdul 04.")
    
    # Intentar crear una imatge placeholder buida (opcional)
    try:
        with open('assets/img_repo/placeholder.png', 'wb') as f:
            f.write(b'') # Arxiu buit, només perquè no doni error 404
        print("✅ Creat placeholder d'imatge buit.")
    except:
        pass

    # 4. Executar el gestor.py per generar el primer JSON
    print("\n🔄 Executant gestor.py per indexar contingut...")
    os.system('python3 gestor.py')

    print("\n🎉 INSTAL·LACIÓ COMPLETADA! 🎉")
    print("Obre 'index.html' al teu navegador per veure el resultat.")

if __name__ == "__main__":
    main()