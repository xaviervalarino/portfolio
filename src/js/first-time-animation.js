// first-time animation
(() => {
  if (sessionStorage.getItem("subsequent")) {
    return;
  }
  if (window.location.pathname === '/') {
    document.getElementById("mission-statement").classList.add("first-time");
    sessionStorage.setItem("subsequent", true);
  }
})();
