// transitions.js

const CUT_CLASS = "cut";
const CUT_DURATION_MS = 400;

export function cutTransition() {
  const { classList } = document.body;
  classList.add(CUT_CLASS);
  window.setTimeout(() => classList.remove(CUT_CLASS), CUT_DURATION_MS);
}
