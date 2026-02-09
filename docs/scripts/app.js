const statusEl = document.querySelector("#status");
const orbitDots = document.querySelectorAll(".orbit-dot");
const themeCardsEl = document.querySelector("#themeCards");

const STORAGE_KEY = "dot_theme_v1";

const THEMES = [
  { id: "noir-mint", name: "Noir Mint", desc: "Minimal noir with mint glow." },
  {
    id: "noir-amber",
    name: "Noir Amber",
    desc: "Warmer glow, same restraint.",
  },
  { id: "noir-ice", name: "Noir Ice", desc: "Cooler, sharper edge." },
];

function setStatus(msg) {
  statusEl.textContent = `Status: ${msg}`;
}

function applyTheme(themeId) {
  // lightweight hook — later we can map theme tokens
  localStorage.setItem(STORAGE_KEY, themeId);
  setStatus(`theme = ${themeId}`);
  document.documentElement.dataset.theme = themeId;
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY) || "noir-mint";
}

function renderThemeCards() {
  themeCardsEl.innerHTML = "";
  const current = getSavedTheme();

  THEMES.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;
    card.role = "button";
    card.ariaLabel = `Select theme ${t.name}`;
    card.innerHTML = `
      <strong>${t.name}${t.id === current ? " ✓" : ""}</strong>
      <small>${t.desc}</small>
    `;
    card.addEventListener("click", () => {
      applyTheme(t.id);
      renderThemeCards();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        applyTheme(t.id);
        renderThemeCards();
      }
    });
    themeCardsEl.appendChild(card);
  });
}

orbitDots.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    // This is where your “Lock A hover slow” behavior will live.
    // For now, we just report selection.
    setStatus(`hover orbit = ${btn.dataset.orbit}`);
  });

  btn.addEventListener("click", () => {
    // This is where your “Cut B+ transition” will live.
    setStatus(`enter orbit = ${btn.dataset.orbit}`);
  });
});

// Boot
applyTheme(getSavedTheme());
renderThemeCards();
setStatus("ready");
