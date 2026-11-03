(function (Portfolio) {
  'use strict';

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  Portfolio.colorOf = function (project) {
    return (Portfolio.areaColors && Portfolio.areaColors[project.categories[0]]) || project.accent || '#3A2EE8';
  };

  Portfolio.renderVisual = function (project) {
    if (!project.cover) return '';
    const fit = project.fit ? ` visual--${project.fit}` : '';
    return `<div class="visual visual--photo${fit}"><img src="${esc(project.cover.src)}" alt="${esc(project.cover.alt || '')}" loading="lazy" decoding="async"></div>`;
  };

  const svg = (body) =>
    `<svg class="illustration" viewBox="0 0 320 200" aria-hidden="true" focusable="false">${body}</svg>`;

  const illustrations = {
    'matriz-fabrica-agentes': svg(`
      <rect class="il-card" x="60" y="34" width="200" height="132" rx="14"/>
      ${[0, 1, 2, 3].map((c) => `<rect class="il-soft" x="${118 + c * 34}" y="50" width="26" height="10" rx="5"/>`).join('')}
      ${[0, 1, 2].map((r) => `<rect class="il-soft" x="76" y="${76 + r * 28}" width="30" height="10" rx="5"/>` +
        [0, 1, 2, 3].map((c) => `<circle class="${(r + c) % 3 === 0 ? 'il-solid' : 'il-mid'}" cx="${131 + c * 34}" cy="${81 + r * 28}" r="${(r + c) % 3 === 0 ? 9 : 6}"/>`).join('')).join('')}
      <path class="il-line" d="M236 150l10 10 20-24"/>`),

    'poc-hidrometros': svg(`
      <path class="il-mid" d="M104 40c22 30 36 50 36 70a36 36 0 0 1-72 0c0-20 14-40 36-70z"/>
      <circle class="il-card" cx="214" cy="104" r="56"/>
      <path class="il-soft-line" d="M174 120a44 44 0 0 1 80 0"/>
      <path class="il-line" d="M214 104l26-22"/>
      <circle class="il-solid" cx="214" cy="104" r="7"/>
      <rect class="il-soft" x="190" y="130" width="48" height="12" rx="6"/>`),

    'homologacao-api': svg(`
      <path class="il-line il-thick" d="M86 60l-30 40 30 40M234 60l30 40-30 40"/>
      <rect class="il-card" x="110" y="44" width="100" height="112" rx="14"/>
      ${[0, 1, 2].map((i) => `<rect class="il-soft" x="126" y="${64 + i * 30}" width="44" height="10" rx="5"/>
        <circle class="${i === 2 ? 'il-alert' : 'il-solid'}" cx="188" cy="${69 + i * 30}" r="8"/>`).join('')}`),

    'melhorias-processo-agentes': svg(`
      ${[0, 1, 2, 3].map((i) => `<circle class="${i === 1 ? 'il-alert' : 'il-mid'}" cx="${62 + i * 66}" cy="92" r="20"/>`).join('')}
      <path class="il-line" d="M84 92h20M150 92h20M216 92h20"/>
      <rect class="il-card" x="102" y="128" width="116" height="40" rx="12"/>
      <rect class="il-soft" x="116" y="140" width="56" height="8" rx="4"/>
      <rect class="il-soft" x="116" y="152" width="80" height="8" rx="4"/>
      <path class="il-line" d="M128 118l-10 10M128 118l-4 14"/>`),

    'acompanhamento-agentes': svg(`
      ${[3, 2, 1].map((n, c) => `<rect class="il-card" x="${54 + c * 74}" y="36" width="64" height="128" rx="12"/>
        <rect class="il-soft" x="${64 + c * 74}" y="48" width="30" height="8" rx="4"/>
        ${Array.from({ length: n }, (_, i) => `<rect class="${c === 2 ? 'il-solid' : 'il-mid'}" x="${64 + c * 74}" y="${66 + i * 30}" width="44" height="22" rx="6"/>`).join('')}`).join('')}
      <circle class="il-solid" cx="262" cy="56" r="10"/>
      <path class="il-check" d="M257 56l4 4 7-8"/>`),

    natura: svg(`
      <path class="il-card" d="M98 74h92l-8 96h-76z"/>
      <path class="il-line" d="M122 74v-12a22 22 0 0 1 44 0v12"/>
      <rect class="il-card" x="196" y="60" width="74" height="96" rx="12"/>
      ${[0, 1, 2].map((i) => `<rect class="${i === 2 ? 'il-solid' : 'il-mid'}" x="${208 + i * 18}" y="${132 - (i + 1) * 18}" width="12" height="${(i + 1) * 18}" rx="4"/>`).join('')}
      <circle class="il-mid" cx="144" cy="120" r="14"/>`),

    astrorecruit: svg(`
      <path class="il-card" d="M160 30c30 22 40 60 30 100h-60c-10-40 0-78 30-100z"/>
      <circle class="il-solid" cx="160" cy="80" r="14"/>
      <path class="il-mid" d="M130 110l-22 30 26-6zM190 110l22 30-26-6z"/>
      <path class="il-alert" d="M146 132h28l-14 34z"/>
      ${[[60, 50], [250, 40], [270, 120], [70, 140], [228, 168]].map(([x, y]) => `<circle class="il-mid" cx="${x}" cy="${y}" r="4"/>`).join('')}`),

    'kotlin-imc': svg(`
      <rect class="il-card" x="110" y="24" width="100" height="160" rx="18"/>
      <path class="il-soft-line" d="M130 120a30 30 0 0 1 60 0"/>
      <path class="il-line" d="M160 120l18-16"/>
      <rect class="il-soft" x="126" y="44" width="68" height="10" rx="5"/>
      <rect class="il-solid" x="126" y="140" width="68" height="18" rx="9"/>
      <path class="il-pulse" d="M40 100h30l10-22 14 44 10-22h16M212 100h16l10-22 14 44 10-22h18"/>`),

    'kotlin-cripto': svg(`
      <circle class="il-mid" cx="104" cy="104" r="46"/>
      <circle class="il-card" cx="104" cy="104" r="32"/>
      <path class="il-line il-thick" d="M96 86v36M96 86h14a9 9 0 0 1 0 18H96h16a9 9 0 0 1 0 18H96"/>
      <path class="il-soft-line" d="M168 150l26-30 22 16 30-44 22 14"/>
      <path class="il-line" d="M168 150l26-30 22 16 30-44"/>
      <circle class="il-solid" cx="246" cy="92" r="7"/>`),

    'tunel-ssh': svg(`
      <path class="il-card" d="M40 170V110a120 70 0 0 1 240 0v60z"/>
      <path class="il-mid" d="M100 170v-50a60 40 0 0 1 120 0v50z"/>
      <rect class="il-solid" x="142" y="112" width="36" height="30" rx="6"/>
      <path class="il-line" d="M150 112v-8a10 10 0 0 1 20 0v8"/>
      <path class="il-soft-line" d="M20 178h280"/>`),

    cybersleuth: svg(`
      <path class="il-card" d="M140 30l60 20v40c0 40-26 66-60 80-34-14-60-40-60-80V50z"/>
      <path class="il-check il-thick" d="M118 96l16 16 30-34"/>
      <circle class="il-mid" cx="236" cy="128" r="30"/>
      <circle class="il-card" cx="236" cy="128" r="20"/>
      <path class="il-line il-thick" d="M258 150l22 22"/>`)
  };

  Portfolio.renderIllustration = function (project) {
    const art = illustrations[project.id];
    return art ? `<div class="visual visual--illustration">${art}</div>` : '';
  };
})(window.Portfolio);
