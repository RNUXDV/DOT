// state.js
export const STORAGE_KEY = "dot_theme_v1";

export const THEMES = [
  { id: "noir-mint", name: "Noir Mint", desc: "Minimal noir with mint glow." },
  { id: "noir-amber", name: "Noir Amber", desc: "Warmer glow, same restraint." },
  { id: "noir-ice", name: "Noir Ice", desc: "Cooler, sharper edge." }
];

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || "noir-mint";
}

export function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.dataset.theme = theme;
}
