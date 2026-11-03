(function (Portfolio) {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function el(name, attrs) {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  }

  function initGraph(onSelect) {
    const svg = document.querySelector('[data-graph]');
    if (!svg) return;

    const W = 560;
    const H = 520;
    const cx = W / 2;
    const cy = H / 2;
    const areas = Portfolio.categories.filter((c) => c.id !== 'all');
    const shortLabels = { ia: 'IA', dev: 'Desenvolvimento', dados: 'Dados', automacao: 'Automação', seguranca: 'Segurança', negocios: 'Negócios', iot: 'IoT' };

    const defs = el('defs');
    const grad = el('linearGradient', { id: 'core-gradient', x1: '0', y1: '0', x2: '1', y2: '1' });
    [['0', '#3A2EE8'], ['0.55', '#7C4DFF'], ['1', '#F43F5E']].forEach(([o, c]) => grad.appendChild(el('stop', { offset: o, 'stop-color': c })));
    defs.appendChild(grad);
    svg.appendChild(defs);

    const layer = { edges: el('g', { class: 'graph__edges' }), leaves: el('g', { class: 'graph__leaves' }), nodes: el('g', { class: 'graph__nodes' }) };
    Object.values(layer).forEach((g) => svg.appendChild(g));

    const areaNodes = areas.map((area, i) => {
      const angle = (i / areas.length) * Math.PI * 2 - Math.PI / 2 + (i % 2 ? 0.12 : -0.08);
      const r = i % 2 ? 170 : 195;
      return {
        area,
        x: cx + Math.cos(angle) * r * 1.05,
        y: cy + Math.sin(angle) * r * 0.92,
        angle,
        phase: i * 1.7,
        count: Portfolio.projects.filter((p) => p.categories.includes(area.id)).length
      };
    });
    const byId = Object.fromEntries(areaNodes.map((n) => [n.area.id, n]));

    const leaves = Portfolio.projects.map((project, i) => {
      const home = byId[project.categories[0]];
      const siblings = Portfolio.projects.filter((p) => p.categories[0] === project.categories[0]);
      const k = siblings.indexOf(project);
      const spread = 0.55;
      const a = home.angle + (k - (siblings.length - 1) / 2) * spread;
      return {
        project,
        home,
        dx: Math.cos(a) * 58,
        dy: Math.sin(a) * 58,
        line: layer.leaves.appendChild(el('line', { class: 'graph__leaf-line' })),
        dot: layer.leaves.appendChild(el('circle', { class: 'graph__leaf', r: project.cover && (project.size === 'xl' || project.size === 'lg') ? 7 : 4.5, style: `--c:${Portfolio.areaColors[project.categories[0]]}` })),
        others: project.categories.slice(1).map((cid) => ({ target: byId[cid], line: layer.edges.appendChild(el('line', { class: 'graph__cross' })) })),
        i
      };
    });

    areaNodes.forEach((n) => {
      n.spoke = layer.edges.appendChild(el('line', { class: 'graph__spoke' }));
    });

    const core = el('g', { class: 'graph__core', transform: `translate(${cx} ${cy})` });
    core.appendChild(el('circle', { r: 44 }));
    const coreText = el('text', { 'text-anchor': 'middle', dy: '0.35em' });
    coreText.textContent = 'Amanda';
    core.appendChild(coreText);
    layer.nodes.appendChild(core);

    areaNodes.forEach((n) => {
      const g = el('g', { class: 'graph__area', tabindex: '0', role: 'button', 'data-area': n.area.id, 'aria-label': `${n.area.label}: ${n.count} projetos. Filtrar.`, style: `--c:${Portfolio.areaColors[n.area.id]}` });
      const label = shortLabels[n.area.id] || n.area.label;
      const width = Math.max(64, label.length * 9.2 + 40);
      g.appendChild(el('rect', { x: -width / 2, y: -19, width, height: 38, rx: 19 }));
      const t = el('text', { 'text-anchor': 'middle', dy: '0.35em', x: -7 });
      t.textContent = label;
      const c = el('text', { class: 'graph__count', 'text-anchor': 'middle', dy: '0.35em', x: width / 2 - 16 });
      c.textContent = n.count;
      g.append(t, c);
      layer.nodes.appendChild(g);
      n.g = g;

      const activate = () => onSelect(n.area.id);
      g.addEventListener('click', activate);
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
      const highlight = (on) => svg.classList.toggle(`is-focus-${n.area.id}`, on);
      g.addEventListener('mouseenter', () => highlight(true));
      g.addEventListener('mouseleave', () => highlight(false));
      g.addEventListener('focus', () => highlight(true));
      g.addEventListener('blur', () => highlight(false));
    });

    leaves.forEach((leaf) => {
      const cats = leaf.project.categories.map((c) => `of-${c}`).join(' ');
      [leaf.dot, leaf.line, ...leaf.others.map((o) => o.line)].forEach((node) => node.classList.add(...cats.split(' ')));
    });

    function draw(t) {
      const time = t / 1000;
      areaNodes.forEach((n) => {
        const ox = Math.sin(time * 0.5 + n.phase) * 5;
        const oy = Math.cos(time * 0.4 + n.phase) * 5;
        n.cx = n.x + ox;
        n.cy = n.y + oy;
        n.g.setAttribute('transform', `translate(${n.cx.toFixed(1)} ${n.cy.toFixed(1)})`);
        setLine(n.spoke, cx, cy, n.cx, n.cy);
      });
      leaves.forEach((leaf) => {
        const lx = leaf.home.cx + leaf.dx + Math.sin(time * 0.8 + leaf.i) * 3;
        const ly = leaf.home.cy + leaf.dy + Math.cos(time * 0.7 + leaf.i) * 3;
        leaf.dot.setAttribute('cx', lx.toFixed(1));
        leaf.dot.setAttribute('cy', ly.toFixed(1));
        setLine(leaf.line, leaf.home.cx, leaf.home.cy, lx, ly);
        leaf.others.forEach((o) => setLine(o.line, lx, ly, o.target.cx, o.target.cy));
      });
    }

    function setLine(line, x1, y1, x2, y2) {
      line.setAttribute('x1', x1.toFixed(1));
      line.setAttribute('y1', y1.toFixed(1));
      line.setAttribute('x2', x2.toFixed(1));
      line.setAttribute('y2', y2.toFixed(1));
    }

    let frame = null;
    let visible = true;
    function loop(t) {
      draw(t);
      frame = requestAnimationFrame(loop);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = null;
      if (visible && !prefersReducedMotion.matches) frame = requestAnimationFrame(loop);
      else draw(0);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      }).observe(svg);
    }
    prefersReducedMotion.addEventListener('change', sync);
    draw(0);
    sync();
  }

  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    const progress = document.querySelector('[data-progress]');
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);

      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  Portfolio.interactions = { initGraph, initHeader };
})(window.Portfolio);
