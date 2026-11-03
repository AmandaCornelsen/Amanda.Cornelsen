"""Gera dist/portfolio.html: uma versão em arquivo único (CSS e JS embutidos).
Uso: python tools/build-single.py   (rode na pasta portfolio)
As imagens de assets/projects são embutidas no próprio HTML.
"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text(encoding='utf-8')
css = ''.join((root / f'css/{n}.css').read_text(encoding='utf-8') + '\n' for n in ['style', 'components', 'responsive'])
html = re.sub(r'\s*<link rel="stylesheet" href="css/style.css">\s*<link rel="stylesheet" href="css/components.css">\s*<link rel="stylesheet" href="css/responsive.css">',
              lambda m: '\n  <style>\n' + css + '  </style>', html)
js = ''.join((root / f'js/{n}.js').read_text(encoding='utf-8') + '\n' for n in ['config', 'projects', 'visuals', 'interactions', 'main'])
html = re.sub(r'\s*<script src="js/config.js"></script>.*?<script src="js/main.js"></script>',
              lambda m: '\n  <script>\n' + js.replace('</script', '<\\/script') + '  </script>', html, flags=re.S)
import base64
# Imagens dos projetos viram data URIs para o arquivo único funcionar sozinho.
images = {f.stem: 'data:image/webp;base64,' + base64.b64encode(f.read_bytes()).decode() for f in (root / 'assets/projects').glob('*.webp')}
html = html.replace('const img = (file, alt, caption) => ({ src: `assets/projects/${file}.webp`, alt, caption });',
                    'const IMAGES = ' + __import__('json').dumps(images) + ';\n  const img = (file, alt, caption) => ({ src: IMAGES[file] || `assets/projects/${file}.webp`, alt, caption });')
fav = (root / 'assets/icons/favicon.svg').read_text().strip().replace('#', '%23').replace('"', "'")
html = html.replace('href="assets/icons/favicon.svg"', 'href="data:image/svg+xml,' + fav + '"')
out = root / 'dist'
out.mkdir(exist_ok=True)
(out / 'portfolio.html').write_text(html, encoding='utf-8')
print('Gerado:', out / 'portfolio.html')
