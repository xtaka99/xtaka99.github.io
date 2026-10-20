/* Page behavior: language switching and rendering the project list.
   Plain JavaScript, no libraries. Reads two globals defined by the files
   loaded before this one: window.TRANSLATIONS and window.PROJECTS. */

(function () {
  "use strict";

  const LANGUAGES = ["en", "pt", "es"];
  const STORAGE_KEY = "preferred-language";
  const GITHUB_USER = "xtaka99";

  /* ---------- choosing the starting language ---------- */

  function savedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY);      // may be blocked in private mode
    } catch (err) {
      return null;
    }
  }

  function browserLanguage() {
    const code = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGUAGES.includes(code) ? code : "en";
  }

  function startingLanguage() {
    const fromUrl = new URLSearchParams(location.search).get("lang");   // ?lang=pt
    if (LANGUAGES.includes(fromUrl)) return fromUrl;
    const saved = savedLanguage();
    return LANGUAGES.includes(saved) ? saved : browserLanguage();
  }

  /* ---------- building pieces of the page ---------- */

  // Creates an element safely. Text goes in through textContent, never
  // innerHTML, so content can never be interpreted as code.
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderProjects(lang) {
    const t = window.TRANSLATIONS[lang];
    const statusText = { live: t.statusLive, building: t.statusBuilding, planned: t.statusPlanned };
    const list = document.getElementById("project-list");
    list.replaceChildren();

    window.PROJECTS.forEach(function (project) {
      const row = el("article", "project");

      const left = el("div");
      left.append(el("h3", "project-name", project.repo));
      const status = el("span", "status", statusText[project.status]);
      status.dataset.status = project.status;
      left.append(status);

      const right = el("div");
      right.append(el("p", "project-summary", project.summary[lang]));
      right.append(el("p", "project-stack", project.stack));
      if (project.status === "live") {
        const link = el("a", "project-link", t.viewCode);
        link.href = "https://github.com/" + GITHUB_USER + "/" + project.repo;
        link.setAttribute("aria-label", t.viewCode + ": " + project.repo);
        right.append(link);
      }

      row.append(left, right);
      list.append(row);
    });
  }

  // Under the big hero sentence, show the same sentence in the other two
  // languages. Clicking one switches the whole page to that language.
  function renderHeroOthers(lang) {
    const box = document.getElementById("hero-others");
    box.replaceChildren();
    LANGUAGES.filter(function (code) { return code !== lang; }).forEach(function (code) {
      const button = el("button", "", window.TRANSLATIONS[code].hero);
      button.type = "button";
      button.lang = code;
      button.addEventListener("click", function () { setLanguage(code, true); });
      box.append(button);
    });
  }

  /* ---------- applying a language ---------- */

  function applyLanguage(lang) {
    const t = window.TRANSLATIONS[lang];
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", t.pageDescription);

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      const text = t[node.dataset.i18n];
      if (text) node.textContent = text;
    });

    document.querySelectorAll(".lang-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });

    renderHeroOthers(lang);
    renderProjects(lang);
  }

  function setLanguage(lang, animate) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (err) { /* ignore */ }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduceMotion) {
      applyLanguage(lang);
      return;
    }
    // Fade out, swap the text, fade back in (CSS handles the fade).
    document.body.classList.add("is-switching");
    setTimeout(function () {
      applyLanguage(lang);
      document.body.classList.remove("is-switching");
    }, 180);
  }

  /* ---------- start ---------- */

  document.querySelectorAll(".lang-switch button").forEach(function (button) {
    button.addEventListener("click", function () { setLanguage(button.dataset.lang, true); });
  });

  setLanguage(startingLanguage(), false);
})();
