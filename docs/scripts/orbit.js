// orbit.js

export function initOrbit(setStatus) {
  const dots = document.querySelectorAll(".orbit-dot");
  const world = document.querySelector(".world");
  const centerDot = document.querySelector(".dot.center");
  const status = document.querySelector("#status");
  const panel = document.querySelector(".focused-panel");
  const panelTitle = panel?.querySelector(".focused-panel__title");
  const panelDesc = panel?.querySelector(".focused-panel__desc");
  const panelAction = panel?.querySelector(".focused-panel__action");
  const panelBack = panel?.querySelector(".focused-panel__back");
  let focusedDot = null;
  const ACTIVE_CLASS = "is-active";
  const WORLD_FOCUS_CLASS = "is-focused";
  const VISIBLE_CLASS = "is-visible";

  dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {
      setStatus(`hover orbit = ${dot.dataset.orbit}`);
      showStatus(status, VISIBLE_CLASS);
    });

    dot.addEventListener("mouseleave", () => {
      if (focusedDot) {
        setStatus(`focused orbit = ${focusedDot.dataset.orbit}`);
      } else {
        setStatus("ready");
        hideStatus(status, VISIBLE_CLASS);
      }
    });

    dot.addEventListener("click", () => {
      focusedDot = dot;
      setFocusedOrbit(world, dots, dot, ACTIVE_CLASS, WORLD_FOCUS_CLASS);
      updatePanel(panel, panelTitle, panelDesc, panelAction, dot);
      setStatus(`focused orbit = ${dot.dataset.orbit}`);
      showStatus(status, VISIBLE_CLASS);
    });

    dot.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        dot.click();
      }
    });
  });

  if (centerDot) {
    centerDot.addEventListener("click", () => {
      focusedDot = null;
      clearFocusedOrbit(world, dots, ACTIVE_CLASS, WORLD_FOCUS_CLASS);
      hidePanel(panel);
      setStatus("ready");
      hideStatus(status, VISIBLE_CLASS);
    });
  }

  if (panelBack) {
    panelBack.addEventListener("click", () => {
      focusedDot = null;
      clearFocusedOrbit(world, dots, ACTIVE_CLASS, WORLD_FOCUS_CLASS);
      hidePanel(panel);
      setStatus("ready");
      hideStatus(status, VISIBLE_CLASS);
      if (centerDot) {
        centerDot.focus();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && focusedDot) {
      focusedDot = null;
      clearFocusedOrbit(world, dots, ACTIVE_CLASS, WORLD_FOCUS_CLASS);
      hidePanel(panel);
      setStatus("ready");
      hideStatus(status, VISIBLE_CLASS);
      if (centerDot) {
        centerDot.focus();
      }
    }
  });
}

function setFocusedOrbit(world, dots, target, className, worldClassName) {
  dots.forEach(dot => dot.classList.toggle(className, dot === target));
  if (world) {
    world.classList.add(worldClassName);
  }
}

function clearFocusedOrbit(world, dots, className, worldClassName) {
  dots.forEach(dot => dot.classList.remove(className));
  if (world) {
    world.classList.remove(worldClassName);
  }
}

function updatePanel(panel, titleEl, descEl, actionEl, dot) {
  if (!panel || !dot) {
    return;
  }

  const title = dot.dataset.title || dot.dataset.orbit || "Focused dot";
  const desc = dot.dataset.desc || "";
  const link = dot.dataset.link || "#";

  if (titleEl) {
    titleEl.textContent = title;
  }
  if (descEl) {
    descEl.textContent = desc;
  }
  if (actionEl) {
    actionEl.textContent = `Explore ${title}`;
    actionEl.setAttribute("href", link);
  }

  panel.setAttribute("aria-hidden", "false");
}

function hidePanel(panel) {
  if (panel) {
    panel.setAttribute("aria-hidden", "true");
  }
}

function showStatus(status, className) {
  if (status) {
    status.classList.add(className);
  }
}

function hideStatus(status, className) {
  if (status) {
    status.classList.remove(className);
  }
}
