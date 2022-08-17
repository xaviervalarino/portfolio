// first-time animation
(() => {
  if (sessionStorage.getItem("subsequent")) {
    return;
  }
  if (window.location.pathname === "/") {
    const h1 = document.getElementById("mission-statement");
    h1.classList.add("first-time");
    document.fonts.ready.then(() => {
      h1.classList.add("animation");
    }) 
    sessionStorage.setItem("subsequent", true);
  }
})();
