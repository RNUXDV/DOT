// orbit.js

export function initOrbit(setStatus) {
  const dots = document.querySelectorAll(".orbit-dot");

  dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {
      dot.style.transform += " scale(1.15)";
      setStatus(`hover orbit = ${dot.dataset.orbit}`);
    });

    dot.addEventListener("mouseleave", () => {
      dot.style.transform = dot.style.transform.replace(" scale(1.15)", "");
    });

    dot.addEventListener("click", () => {
      setStatus(`enter orbit = ${dot.dataset.orbit}`);
    });
  });
}
