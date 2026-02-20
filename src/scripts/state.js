// state.js
export const STORAGE_KEY = "dot_theme_v1";

export const THEMES = [
  {
    id: "noir-mint",
    name: "Noir Mint",
    desc: "Minimal noir with mint glow.",
    orbitSize: "240px",
    dotSize: "44px",
    centerDotSize: "74px"
  },
  {
    id: "noir-amber",
    name: "Noir Amber",
    desc: "Warmer glow, same restraint.",
    orbitSize: "246px",
    dotSize: "44px",
    centerDotSize: "74px"
  },
  {
    id: "noir-ice",
    name: "Noir Ice",
    desc: "Cooler, sharper edge.",
    orbitSize: "232px",
    dotSize: "42px",
    centerDotSize: "72px"
  }
];

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || "noir-mint";
}

export function setTheme(theme) {
  const next = THEMES.find(t => t.id === theme) || THEMES[0];
  localStorage.setItem(STORAGE_KEY, next.id);
  document.documentElement.dataset.theme = next.id;
  applyThemeSizing(next);
}

function applyThemeSizing(theme) {
  const root = document.documentElement;
  root.style.setProperty("--orbit-size", theme.orbitSize);
  root.style.setProperty("--dot-size", theme.dotSize);
  root.style.setProperty("--center-dot-size", theme.centerDotSize);
}
