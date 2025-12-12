import os
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