// Hamberder
(() => {
  document.body.classList.add("with-js");
  document
    .querySelector(".masthead button")
    .addEventListener("click", function () {
      let value = "true" === this.getAttribute("aria-expanded");
      this.setAttribute("aria-expanded", !value);
    });
})();
