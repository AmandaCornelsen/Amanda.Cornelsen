# Portfólio — Amanda Cornelsen

Portfólio pessoal feito com HTML5, CSS3 e JavaScript puro, sem frameworks e sem etapa de build.

## Estrutura

```
portfolio/
├── index.html            Estrutura e conteúdo fixo das seções
├── css/
│   ├── style.css         Variáveis (cores, tipografia, espaços), base e seções
│   ├── components.css    Botões, filtros, mapa, cards, telas demonstrativas e modal
│   └── responsive.css    Ajustes para notebook, tablet e celular
├── js/
│   ├── config.js         E-mail e links de contato
│   ├── projects.js       Projetos, experiência e competências (todo o conteúdo editável)
│   ├── visuals.js        Telas demonstrativas de cada projeto, desenhadas em HTML/SVG
│   ├── interactions.js   Mapa de áreas do topo e estado do cabeçalho
│   └── main.js           Navegação, filtros, cards, modal, contato
└── assets/
    ├── icons/favicon.svg
    ├── images/           Livre para fotos e capturas reais
    └── projects/         Livre para screenshots dos projetos
```

## Como executar

Abra `index.html` no navegador. Não há dependências.

Para testar como em produção, rode um servidor local na pasta:

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

## Como personalizar

**Contato** — edite `js/config.js`. Preencha a URL do LinkedIn (está vazia de propósito). Links vazios não aparecem no site.

**Projetos** — edite `js/projects.js`. Cada projeto tem:

| Campo | Para que serve |
|---|---|
| `id` | Identificador único; também abre o projeto direto pelo endereço (`index.html#cortex`) |
| `categories` | Filtros em que o projeto aparece: `dev`, `ia`, `dados`, `automacao`, `seguranca`, `iot` |
| `featured` | `true` coloca o projeto na frente do carrossel, com card maior |
| `status` | Texto do selo e tom: `live`, `progress`, `academic` ou `concept` |
| `visual` | Qual tela demonstrativa usar (ver `js/visuals.js`) |
| `problem`, `summary`, `role`, `highlights`, `stack` | Textos do card e dos detalhes |
| `disclaimer` | Aviso opcional (ex.: projeto conceitual) |
| `links` | Botões de demonstração ou repositório: `{ label, url }` |

**Competências** — no fim de `js/projects.js`, cada item é `['Nome', nível]`, com nível 3 (uso no dia a dia), 2 (aplicado em projetos) ou 1 (fundamentos).

**Cores e fontes** — variáveis no início de `css/style.css`.

**Usar screenshots reais** — salve a imagem em `assets/projects/` e, em `js/visuals.js`, crie um renderizador que devolva por exemplo
`<img src="assets/projects/cortex.png" alt="Tela do Cortex" loading="lazy" width="1200" height="750">`. Use `.webp` com até ~200 KB.

## Como publicar

**GitHub Pages**
1. Crie um repositório e envie o conteúdo da pasta `portfolio/` para a raiz dele (o `index.html` precisa estar na raiz).
2. Em *Settings → Pages*, escolha a branch `main` e a pasta `/ (root)`.

**Vercel ou Netlify**
1. Importe o repositório.
2. Não há comando de build; diretório de saída é a raiz.

## Acessibilidade e desempenho

- Navegação por teclado em todo o site, incluindo o mapa de áreas e o modal (Esc fecha).
- `prefers-reduced-motion` desliga a animação do mapa e as transições.
- Sem imagens pesadas: as telas dos projetos são HTML e SVG.
- Única dependência externa: Google Fonts (Bricolage Grotesque e Instrument Sans), com fallback para fontes do sistema.
