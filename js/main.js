// Renders PROJECTS (from projects-data.js) into the page, plus small UI behaviors.

function renderTagList(items, className) {
  return items.map((item) => `<li class="${className}">${item}</li>`).join("");
}

const CHART_ICONS = {
  treemap: `<svg viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" stroke-width="2"><rect x="2" y="2" width="32" height="32" rx="2"/><line x1="16" y1="2" x2="16" y2="34"/><line x1="2" y1="18" x2="16" y2="18"/><line x1="16" y1="22" x2="34" y2="22"/></svg>`,
  sunburst: `<svg viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" stroke-width="2"><circle cx="18" cy="18" r="15"/><circle cx="18" cy="18" r="9.5"/><circle cx="18" cy="18" r="3.5"/><line x1="18" y1="3" x2="18" y2="33"/><line x1="3" y1="18" x2="33" y2="18"/></svg>`,
  heatmap: `<svg viewBox="0 0 36 36"><rect x="2" y="2" width="9" height="9" fill="var(--color-accent)" opacity="0.85"/><rect x="13" y="2" width="9" height="9" fill="var(--color-accent)" opacity="0.45"/><rect x="24" y="2" width="9" height="9" fill="var(--color-accent)" opacity="0.25"/><rect x="2" y="13" width="9" height="9" fill="var(--color-accent)" opacity="0.35"/><rect x="13" y="13" width="9" height="9" fill="var(--color-accent)" opacity="0.95"/><rect x="24" y="13" width="9" height="9" fill="var(--color-accent)" opacity="0.55"/><rect x="2" y="24" width="9" height="9" fill="var(--color-accent)" opacity="0.2"/><rect x="13" y="24" width="9" height="9" fill="var(--color-accent)" opacity="0.5"/><rect x="24" y="24" width="9" height="9" fill="var(--color-accent)" opacity="0.75"/></svg>`,
  table: `<svg viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" stroke-width="2"><rect x="2" y="2" width="32" height="32" rx="2"/><line x1="2" y1="13" x2="34" y2="13"/><line x1="2" y1="24" x2="34" y2="24"/><line x1="13" y1="2" x2="13" y2="34"/><line x1="24" y1="2" x2="24" y2="34"/></svg>`,
};

function renderFlowDiagram(flow) {
  if (!flow || !flow.length) return "";
  const steps = flow
    .map(
      (step, i) => `
      ${i > 0 ? `<span class="flow-arrow" aria-hidden="true">→</span>` : ""}
      <div class="flow-step">
        <span class="flow-step__index">0${i + 1}</span>
        <span class="flow-step__label">${step.label}</span>
        <span class="flow-step__detail">${step.detail}</span>
      </div>`
    )
    .join("");
  return `
    <div class="project-block">
      <p class="project-label">How it works</p>
      <div class="flow-diagram">${steps}</div>
    </div>
  `;
}

function renderGroupedBarChart(chart) {
  const legend = chart.series
    .map(
      (s) => `<span class="chart-legend__item"><span class="chart-legend__swatch" style="background:${s.color}"></span>${s.name}</span>`
    )
    .join("");

  const rows = chart.categories
    .map((cat, ci) => {
      const bars = chart.series
        .map((s) => {
          const val = s.values[ci];
          return `
          <div class="grouped-bar__track">
            <div class="grouped-bar__fill" style="width:${val}%; background:${s.color}; justify-content:flex-end;">
              <span class="grouped-bar__value">${val}${chart.unit || ""}</span>
            </div>
          </div>`;
        })
        .join("");
      return `
      <div class="grouped-bar__row">
        <span class="grouped-bar__label">${cat}</span>
        <div class="grouped-bar__bars">${bars}</div>
      </div>`;
    })
    .join("");

  return `
    <div class="chart">
      ${chart.title ? `<p class="chart__title">${chart.title}</p>` : ""}
      <div class="chart-legend">${legend}</div>
      <div class="grouped-bar">${rows}</div>
    </div>
  `;
}

function renderRankedBarChart(chart) {
  const max = Math.max(...chart.items.map((it) => it.value));
  const rows = chart.items
    .map((it) => {
      const pct = Math.max(6, Math.round((it.value / max) * 100));
      return `
      <div class="ranked-bar__row">
        <span class="ranked-bar__label">${it.label}</span>
        <div class="ranked-bar__track"><div class="ranked-bar__fill" style="width:${pct}%"></div></div>
        <span class="ranked-bar__value">${it.displayValue ?? it.value}</span>
      </div>`;
    })
    .join("");

  return `
    <div class="chart">
      ${chart.title ? `<p class="chart__title">${chart.title}</p>` : ""}
      <div class="ranked-bar">${rows}</div>
    </div>
  `;
}

function renderStatChart(chart) {
  return `
    <div class="chart">
      ${chart.title ? `<p class="chart__title">${chart.title}</p>` : ""}
      <div class="stat-tile">
        <span class="stat-tile__value">${chart.value}</span>
        <div class="stat-tile__body">
          <p class="stat-tile__label">${chart.label}</p>
          <p class="stat-tile__detail">${chart.detail}</p>
        </div>
      </div>
    </div>
  `;
}

function renderIconRowChart(chart) {
  const tiles = chart.items
    .map(
      (it) => `
      <div class="icon-tile">
        ${CHART_ICONS[it.icon] || ""}
        <span class="icon-tile__label">${it.label}</span>
      </div>`
    )
    .join("");

  return `
    <div class="chart">
      ${chart.title ? `<p class="chart__title">${chart.title}</p>` : ""}
      <div class="icon-row">${tiles}</div>
    </div>
  `;
}

function renderOneChart(chart) {
  switch (chart.type) {
    case "grouped-bar":
      return renderGroupedBarChart(chart);
    case "ranked-bar":
      return renderRankedBarChart(chart);
    case "stat":
      return renderStatChart(chart);
    case "icon-row":
      return renderIconRowChart(chart);
    default:
      return "";
  }
}

function renderCharts(chart) {
  if (!chart) return "";
  const charts = Array.isArray(chart) ? chart : [chart];
  const inner = charts.map(renderOneChart).join("");
  return `
    <div class="project-block">
      <p class="project-label">Plots</p>
      <div class="chart-pair">${inner}</div>
    </div>
  `;
}

function renderProjectBody(project) {
  return `
    <div class="project-block">
      <p class="project-label">The problem</p>
      <p class="project-text">${project.problem}</p>
    </div>
    <div class="project-block">
      <p class="project-label">The approach</p>
      <ul class="project-list">${renderTagList(project.approach, "project-list__item")}</ul>
    </div>
    ${renderFlowDiagram(project.flow)}
    <div class="project-block">
      <p class="project-label">Tools</p>
      <ul class="tag-list">${renderTagList(project.tools, "tag")}</ul>
    </div>
    <div class="project-block">
      <p class="project-label">The results</p>
      <ul class="project-list">${renderTagList(project.results, "project-list__item")}</ul>
    </div>
    ${renderCharts(project.chart)}
  `;
}

function renderFeaturedProject(project, index) {
  return `
    <article class="feature-card reveal">
      <span class="feature-card__number" aria-hidden="true">0${index + 1}</span>
      <div class="feature-card__header">
        <p class="project-period">${project.period}</p>
        <h3 class="feature-card__title">${project.title}</h3>
        <p class="feature-card__tagline">${project.tagline}</p>
        <p class="feature-card__highlight">${project.highlight}</p>
      </div>
      ${renderProjectBody(project)}
      ${renderProjectLink(project, "btn--primary")}
    </article>
  `;
}

function renderProjectLink(project, btnClass) {
  if (!project.link) return "";
  return `<a class="btn ${btnClass}" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkLabel || "View project"} ↗</a>`;
}

function renderProjectCard(project, index) {
  return `
    <article class="project-card reveal">
      <span class="project-card__number" aria-hidden="true">0${index + 1}</span>
      <p class="project-period">${project.period}</p>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__tagline">${project.tagline}</p>
      <p class="project-card__highlight">${project.highlight}</p>
      ${renderProjectBody(project)}
      ${renderProjectLink(project, "btn--ghost")}
    </article>
  `;
}

function renderProjects() {
  const featuredEl = document.getElementById("featured-project");
  const gridEl = document.getElementById("project-grid");
  if (!featuredEl || !gridEl) return;

  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const rest = PROJECTS.filter((p) => p !== featured);

  featuredEl.innerHTML = renderFeaturedProject(featured, PROJECTS.indexOf(featured));
  gridEl.innerHTML = rest
    .map((project) => renderProjectCard(project, PROJECTS.indexOf(project)))
    .join("");
}

function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function setupActiveNavLink() {
  const navLinks = document.querySelectorAll(".site-nav a");
  if (!navLinks.length) return;

  const currentPage = location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("is-active", linkPage === currentPage);
  });
}

function setupFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(); // must run before setupScrollReveal() so injected cards get observed too
  setupNavToggle();
  setupScrollReveal();
  setupActiveNavLink();
  setupFooterYear();
});
