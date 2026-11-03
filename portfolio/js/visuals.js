/**
 * Imagem de capa dos projetos.
 * Projetos sem `cover` em projects.js aparecem como cards só de texto.
 */
(function (Portfolio) {
  'use strict';

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Cor do projeto: a cor da área principal dele.
  Portfolio.colorOf = function (project) {
    return (Portfolio.areaColors && Portfolio.areaColors[project.categories[0]]) || project.accent || '#3A2EE8';
  };

  Portfolio.renderVisual = function (project) {
    if (!project.cover) return '';
    const fit = project.fit ? ` visual--${project.fit}` : '';
    return `<div class="visual visual--photo${fit}"><img src="${esc(project.cover.src)}" alt="${esc(project.cover.alt || '')}" loading="lazy" decoding="async"></div>`;
  };
})(window.Portfolio);
