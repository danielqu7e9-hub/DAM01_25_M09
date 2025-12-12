document.addEventListener('DOMContentLoaded', () => {
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