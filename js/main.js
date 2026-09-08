// Renders PROJECTS (from projects-data.js) into the page, plus small UI behaviors.

function renderTagList(items, className) {
  return items.map((item) => `<li class="${className}">${item}</li>`).join("");
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
    <div class="project-block">
      <p class="project-label">Tools</p>
      <ul class="tag-list">${renderTagList(project.tools, "tag")}</ul>
    </div>
    <div class="project-block">
      <p class="project-label">The results</p>
      <ul class="project-list">${renderTagList(project.results, "project-list__item")}</ul>
    </div>
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
      <a class="btn btn--primary" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkLabel} ↗</a>
    </article>
  `;
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
      <a class="btn btn--ghost" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkLabel} ↗</a>
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
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
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
