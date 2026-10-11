/* Mobile menu: under 1100px the header hides its page links, so a menu button opens them
   in a panel below the header. Shared by index.html and grok-bots.html. */
(function () {
  "use strict";
  var button = document.querySelector("[data-menu-toggle]");
  var panel = document.getElementById("mobileMenu");
  if (!button || !panel) return;

  function setOpen(open) {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.hidden = !open;
    document.documentElement.classList.toggle("menu-open", open);
  }

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });
  panel.addEventListener("click", function (event) {
    if (event.target.closest("a, button")) setOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); }
  });
  window.matchMedia("(min-width: 1101px)").addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
  setOpen(false);
})();
