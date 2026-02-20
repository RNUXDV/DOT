// orbit.js

export function initOrbit(setStatus) {
  const dots = document.querySelectorAll(".orbit-dot");
  const orbit = document.querySelector(".orbit");
  const centerDot = document.querySelector(".dot.center");
  const status = document.querySelector("#status");
  let focusedDot = null;
  const ACTIVE_CLASS = "is-active";
  const ACTIVE_DURATION_MS = 320;
  const FOCUS_CLASS = "is-focused";
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
      setFocusedOrbit(orbit, dots, dot, FOCUS_CLASS);
      setStatus(`focused orbit = ${dot.dataset.orbit}`);
      showStatus(status, VISIBLE_CLASS);
      triggerActive(dot, ACTIVE_CLASS, ACTIVE_DURATION_MS);
    });
  });

  if (centerDot) {
    centerDot.addEventListener("click", () => {
      focusedDot = null;
      clearFocusedOrbit(orbit, dots, FOCUS_CLASS);
      setStatus("ready");
      hideStatus(status, VISIBLE_CLASS);
    });
  }
}

function triggerActive(dot, className, durationMs) {
  if (dot.__activeTimeoutId) {
    window.clearTimeout(dot.__activeTimeoutId);
  }

  dot.classList.add(className);
  dot.__activeTimeoutId = window.setTimeout(() => {
    dot.classList.remove(className);
    dot.__activeTimeoutId = null;
  }, durationMs);
}

function setFocusedOrbit(orbit, dots, target, className) {
  dots.forEach(dot => dot.classList.toggle(className, dot === target));
  if (orbit) {
    orbit.classList.add("is-focused");
  }
}

function clearFocusedOrbit(orbit, dots, className) {
  dots.forEach(dot => dot.classList.remove(className));
  if (orbit) {
    orbit.classList.remove("is-focused");
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
