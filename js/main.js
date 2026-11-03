(function (Portfolio) {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { area: 'all', origin: 'all', lastTrigger: null };

  /* ---------- Navegação ---------- */
  function initNav() {
    const toggle = $('[data-nav-toggle]');
    const menu = $('[data-nav-menu]');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.visually-hidden').textContent = open ? 'Fechar menu' : 'Abrir menu';
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    const links = $$('.nav__link');
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => {
            const active = a.getAttribute('href') === `#${entry.target.id}`;
            a.classList.toggle('is-active', active);
            if (active) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- Projetos ---------- */
  function statusBadge(status) {
    return `<span class="status status--${status.tone}">${escapeHTML(status.label)}</span>`;
  }

  function chipList(items, label) {
    if (!items || !items.length) return '';
    return `<ul class="chips" aria-label="${label}">${items.map((s) => `<li>${escapeHTML(s)}</li>`).join('')}</ul>`;
  }

  function groupOf(p) {
    return Portfolio.groups.find((g) => g.id === p.group);
  }

  function originBadge(p) {
    const g = groupOf(p);
    return `<span class="card__origin" style="--group:${g.color}">${escapeHTML(g.title)}</span>`;
  }

  function cardTemplate(p) {
    const hasImage = Boolean(p.cover);
    const feature = hasImage && Boolean(p.featured);
    const stack = p.stack.slice(0, feature ? 5 : 3);
    const text = feature && p.problem ? p.problem : p.summary;
    const color = Portfolio.colorOf(p);
    const classes = ['card', feature ? 'card--feature' : 'card--standard', hasImage ? '' : 'card--text'].filter(Boolean).join(' ');
    return `
      <article class="${classes}" data-id="${p.id}" role="listitem" style="--accent:${color};view-transition-name:card-${p.id}">
        ${hasImage ? `<div class="card__visual">${Portfolio.renderVisual(p)}</div>` : ''}
        <div class="card__body">
          <div class="card__meta">
            ${originBadge(p)}
            ${statusBadge(p.status)}
          </div>
          <p class="card__type">${escapeHTML(p.kind)}</p>
          <h3 class="card__title">${escapeHTML(p.name)}</h3>
          <p class="card__text">${escapeHTML(text)}</p>
          ${chipList(stack, 'Tecnologias')}
          <button class="card__open" type="button" data-open="${p.id}" aria-haspopup="dialog">
            Ver detalhes<span class="visually-hidden"> de ${escapeHTML(p.name)}</span>
          </button>
        </div>
      </article>`;
  }

  // Ordem do carrossel: destaques primeiro, depois projetos com imagem, depois só texto.
  function rank(p) {
    if (p.featured) return 0;
    return p.cover ? 1 : 2;
  }

  const ordered = Portfolio.projects
    .map((p, i) => ({ p, i }))
    .sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i)
    .map(({ p }) => p);

  const matches = (p, area = state.area, origin = state.origin) =>
    (area === 'all' || p.categories.includes(area)) && (origin === 'all' || p.group === origin);

  function renderProjects() {
    const track = $('[data-carousel-track]');
    if (!track) return;
    track.innerHTML = ordered.map(cardTemplate).join('');

    track.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open]');
      if (trigger) openProject(trigger.dataset.open, trigger);
    });

    initCarousel();
  }

  /* ---------- Carrossel ---------- */
  function updateCarousel() {
    const track = $('[data-carousel-track]');
    const wrap = $('[data-carousel]');
    if (!track || !wrap) return;
    const max = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= max - 4;
    $('[data-carousel-prev]').disabled = atStart;
    $('[data-carousel-next]').disabled = atEnd;
    wrap.classList.toggle('can-prev', !atStart);
    wrap.classList.toggle('can-next', !atEnd);
  }

  function initCarousel() {
    const track = $('[data-carousel-track]');
    const step = (dir) => {
      // Avança quase uma tela de cards por clique.
      track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: reduceMotion() ? 'auto' : 'smooth' });
    };
    $('[data-carousel-prev]').addEventListener('click', () => step(-1));
    $('[data-carousel-next]').addEventListener('click', () => step(1));
    track.addEventListener('keydown', (e) => {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { updateCarousel(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  /* ---------- Filtros ---------- */
  const ORIGINS = () => [{ id: 'all', title: 'Todos', color: '#121A2E' }, ...Portfolio.groups];

  function filterButton(kind, id, label, color, pressed) {
    return `<button class="filter" type="button" data-${kind}="${id}" aria-pressed="${pressed}" style="--c:${color}">
      ${escapeHTML(label)}<span class="filter__count" data-count></span></button>`;
  }

  function renderFilters() {
    const originBar = $('[data-filters-origin]');
    const areaBar = $('[data-filters]');
    if (!originBar || !areaBar) return;

    originBar.innerHTML = ORIGINS()
      .map((g) => filterButton('origin', g.id, g.title, g.color, g.id === state.origin))
      .join('');
    areaBar.innerHTML = Portfolio.categories
      .map((c) => filterButton('filter', c.id, c.label, (Portfolio.areaColors && Portfolio.areaColors[c.id]) || '#121A2E', c.id === state.area))
      .join('');

    originBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-origin]');
      if (btn) setFilters({ origin: btn.dataset.origin });
    });
    areaBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (btn) setFilters({ area: btn.dataset.filter });
    });

    const clear = $('[data-clear-filters]');
    if (clear) clear.addEventListener('click', () => setFilters({ area: 'all', origin: 'all' }));

    updateCounts();
  }

  // Cada contador mostra quantos projetos aparecem se aquele botão for escolhido,
  // mantendo o outro filtro como está.
  function updateCounts() {
    $$('[data-origin]').forEach((b) => {
      $('[data-count]', b).textContent = Portfolio.projects.filter((p) => matches(p, state.area, b.dataset.origin)).length;
    });
    $$('[data-filter]').forEach((b) => {
      $('[data-count]', b).textContent = Portfolio.projects.filter((p) => matches(p, b.dataset.filter, state.origin)).length;
    });
  }

  function setFilters(next, instant = false) {
    if (next.area !== undefined) state.area = Portfolio.categories.some((c) => c.id === next.area) ? next.area : 'all';
    if (next.origin !== undefined) state.origin = ORIGINS().some((g) => g.id === next.origin) ? next.origin : 'all';

    const update = () => {
      $$('[data-origin]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.origin === state.origin)));
      $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === state.area)));

      let shown = 0;
      $$('.card').forEach((card) => {
        const match = matches(Portfolio.projects.find((p) => p.id === card.dataset.id));
        card.hidden = !match;
        if (match) shown += 1;
      });

      updateCounts();
      const track = $('[data-carousel-track]');
      track.scrollLeft = 0;
      $('[data-carousel]').hidden = shown === 0;
      $('[data-carousel-empty]').hidden = shown !== 0;
      $('[data-carousel-nav]').hidden = shown === 0;

      const parts = [];
      if (state.area !== 'all') parts.push(Portfolio.categories.find((c) => c.id === state.area).label);
      if (state.origin !== 'all') parts.push(Portfolio.groups.find((g) => g.id === state.origin).title.toLowerCase());
      const status = $('[data-filter-status]');
      if (status) {
        const what = parts.length ? ` em ${parts.join(', ')}` : '';
        status.textContent = `${shown} ${shown === 1 ? 'projeto' : 'projetos'}${what}`;
      }
      updateCarousel();
    };

    if (!instant && document.startViewTransition && !reduceMotion()) document.startViewTransition(update);
    else update();
  }

  /* ---------- Modal ---------- */
  function modalTemplate(p) {
    // Anterior e próximo seguem a mesma ordem e os mesmos filtros do carrossel.
    const list = ordered.filter((x) => matches(x)).includes(p) ? ordered.filter((x) => matches(x)) : ordered;
    const index = list.indexOf(p);
    const prev = list[(index - 1 + list.length) % list.length];
    const next = list[(index + 1) % list.length];
    const links = p.links
      .map((l) => `<a class="btn btn--primary" href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)}</a>`)
      .join('');
    const facts = [['Problema', p.problem], ['Meu papel', p.role]].filter(([, v]) => v);
    const gallery = (p.gallery || [])
      .map(
        (img, i) => `<li><button type="button" class="gallery__item" data-gallery-src="${escapeHTML(img.src)}" data-gallery-alt="${escapeHTML(img.alt || '')}" aria-pressed="${i === 0}">
          <img src="${escapeHTML(img.src)}" alt="" loading="lazy"><span>${escapeHTML(img.caption || 'Ver tela')}</span></button></li>`
      )
      .join('');

    return `
      <div class="detail${p.cover ? '' : ' detail--text'}" style="--accent:${Portfolio.colorOf(p)}">
        ${p.cover ? `<div class="detail__visual">${Portfolio.renderVisual(p)}</div>` : ''}
        <div class="detail__info">
          <div class="card__meta">${originBadge(p)}${statusBadge(p.status)}</div>
          <p class="card__type">${escapeHTML(p.kind)}</p>
          <h2 class="detail__title" id="modal-title">${escapeHTML(p.name)}</h2>
          <p class="detail__context">${escapeHTML(p.context)}</p>
          <p class="detail__summary">${escapeHTML(p.summary)}</p>

          ${facts.length ? `<dl class="detail__facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}</dl>` : ''}

          ${p.highlights.length ? `<h3 class="detail__subtitle">Destaques</h3>
          <ul class="detail__list">${p.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join('')}</ul>` : ''}

          ${gallery ? `<h3 class="detail__subtitle">Telas</h3><ul class="gallery" aria-label="Escolha a tela exibida ao lado">${gallery}</ul>` : ''}

          ${p.stack.length ? `<h3 class="detail__subtitle">Tecnologias</h3>${chipList(p.stack, 'Tecnologias')}` : ''}

          ${p.disclaimer ? `<p class="detail__disclaimer">${escapeHTML(p.disclaimer)}</p>` : ''}
          ${links ? `<div class="detail__links">${links}</div>` : ''}

          <nav class="detail__nav" aria-label="Outros projetos">
            <button type="button" class="detail__step" data-open-step="${prev.id}">Anterior: ${escapeHTML(prev.name)}</button>
            <button type="button" class="detail__step" data-open-step="${next.id}">Próximo: ${escapeHTML(next.name)}</button>
          </nav>
        </div>
      </div>`;
  }

  function openProject(id, trigger) {
    const project = Portfolio.projects.find((p) => p.id === id);
    const modal = $('[data-modal]');
    if (!project || !modal) return;

    if (trigger) state.lastTrigger = trigger;
    $('[data-modal-content]').innerHTML = modalTemplate(project);
    modal.scrollTop = 0;
    $('.project-modal__inner', modal).scrollTop = 0;

    if (!modal.open) {
      modal.showModal();
      document.body.classList.add('modal-open');
    }
    $('[data-modal-close]', modal).focus();
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
  }

  function closeProject() {
    const modal = $('[data-modal]');
    if (modal && modal.open) modal.close();
  }

  function initModal() {
    const modal = $('[data-modal]');
    if (!modal) return;

    $('[data-modal-close]', modal).addEventListener('click', closeProject);
    // Clique no fundo escuro fecha o modal.
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProject();
      const step = e.target.closest('[data-open-step]');
      if (step) openProject(step.dataset.openStep);
      // Galeria: troca a imagem principal pela tela escolhida.
      const thumb = e.target.closest('[data-gallery-src]');
      if (thumb) {
        const main = $('.detail__visual img', modal);
        if (main) {
          main.src = thumb.dataset.gallerySrc;
          main.alt = thumb.dataset.galleryAlt;
        }
        $$('[data-gallery-src]', modal).forEach((b) => b.setAttribute('aria-pressed', String(b === thumb)));
      }
    });
    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      if (Portfolio.projects.some((p) => `#${p.id}` === location.hash)) history.replaceState(null, '', '#projetos');
      if (state.lastTrigger && document.contains(state.lastTrigger)) state.lastTrigger.focus();
    });

    const fromHash = () => {
      const id = location.hash.slice(1);
      if (Portfolio.projects.some((p) => p.id === id)) {
        state.lastTrigger = $(`[data-open="${id}"]`);
        openProject(id);
      }
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------- Experiência e competências ---------- */
  function renderExperience() {
    const list = $('[data-exp-list]');
    if (!list) return;
    list.innerHTML = Portfolio.experience
      .map((x) => `<li class="area"><h4 class="area__title">${escapeHTML(x.title)}</h4><p>${escapeHTML(x.text)}</p></li>`)
      .join('');
  }

  function levelMark(level) {
    return `<span class="level level--${level}" aria-hidden="true"><i></i><i></i><i></i></span>`;
  }

  function renderSkills() {
    const legend = $('[data-skill-legend]');
    const grid = $('[data-skill-grid]');
    if (!legend || !grid) return;
    const labelOf = (id) => Portfolio.skillLevels.find((l) => l.id === id).label;

    legend.innerHTML = Portfolio.skillLevels.map((l) => `<li>${levelMark(l.id)}${escapeHTML(l.label)}</li>`).join('');
    grid.innerHTML = Portfolio.skills
      .map(
        (g) => `
        <section class="skill-group">
          <h3 class="skill-group__title">${escapeHTML(g.group)}</h3>
          <ul class="skill-group__list">
            ${g.items
              .slice()
              .sort((a, b) => b[1] - a[1])
              .map(([name, lvl]) => `<li class="skill">${levelMark(lvl)}<span>${escapeHTML(name)}</span><span class="visually-hidden">: ${labelOf(lvl)}</span></li>`)
              .join('')}
          </ul>
        </section>`
      )
      .join('');
  }

  /* ---------- Contato ---------- */
  function renderContact() {
    const { email, links } = Portfolio.config;
    const address = $('[data-contact-email]');
    const copyBtn = $('[data-copy-email]');
    const feedback = $('[data-copy-feedback]');

    if (address) {
      address.textContent = email;
      address.href = `mailto:${email}`;
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(email);
          feedback.textContent = 'E-mail copiado.';
        } catch (err) {
          const range = document.createRange();
          range.selectNodeContents(address);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          feedback.textContent = 'Selecionei o e-mail. Use Ctrl+C para copiar.';
        }
        clearTimeout(copyBtn._t);
        copyBtn._t = setTimeout(() => (feedback.textContent = ''), 3500);
      });
    }

    const list = $('[data-contact-links]');
    if (!list) return;
    const icons = {
      linkedin: '<path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 015 0v4.5M10.5 9.5v8" />',
      github: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />'
    };
    list.innerHTML = links
      .filter((l) => l.url)
      .map(
        (l) => `<li><a class="social" href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[l.id] || ''}</svg>
          <span>${escapeHTML(l.label)}</span></a></li>`
      )
      .join('');
  }

  /* ---------- Início ---------- */
  function init() {
    try {
      initNav();
      renderFilters();
      renderProjects();
      setFilters({}, true);
      renderExperience();
      renderSkills();
      renderContact();
      initModal();
      Portfolio.interactions.initHeader();
      // Link da experiência: mostra só os projetos do estágio.
      $$('[data-origin-link]').forEach((link) =>
        link.addEventListener('click', () => setFilters({ origin: link.dataset.originLink, area: 'all' }, true))
      );
      Portfolio.interactions.initGraph((areaId) => {
        setFilters({ area: areaId });
        const target = $('#projetos');
        target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
      });
      const year = $('[data-year]');
      if (year) year.textContent = new Date().getFullYear();
      document.documentElement.classList.add('is-ready');
    } catch (err) {
      // Mantém o conteúdo estático visível mesmo se algo falhar.
      console.error('Falha ao iniciar o portfólio:', err);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window.Portfolio);
