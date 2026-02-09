// transitions.js

export function cutTransition() {
  document.body.classList.add("cut");

  setTimeout(() => {
    document.body.classList.remove("cut");
  }, 400);
}
