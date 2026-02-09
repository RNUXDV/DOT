import { THEMES, getTheme, setTheme } from "./state.js";
import { initOrbit } from "./orbit.js";
import { cutTransition } from "./transitions.js";

const statusEl = document.querySelector("#status");
const themeCardsEl = document.querySelector("#themeCards");

function setStatus(msg) {
  statusEl.textContent = `Status: ${msg}`;
}

function renderThemes() {
  themeCardsEl.innerHTML = "";
  const current = getTheme();

  THEMES.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${t.name}${t.id === current ? " ✓" : ""}</strong><small>${t.desc}</small>`;

    card.onclick = () => {
      setTheme(t.id);
      cutTransition();
      renderThemes();
    };

    themeCardsEl.appendChild(card);
  });
}

// BOOT
setTheme(getTheme());
renderThemes();
initOrbit(setStatus);
setStatus("ready");
