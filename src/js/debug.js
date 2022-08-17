// Debug
(() => {
  function getBodyWidth() {
    return {
      bodyWidth: document.body.clientWidth,
    };
  }
  function getFontSize() {
    const value = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return {
      fontSize: Math.round(value * 10) / 10, // round to one decimal place
    };
  }
  function setPropertyReadouts(obj) {
    document.querySelectorAll('[data-t="readout"]').forEach((el) => {
      if (obj[el.dataset.i]) {
        el.textContent = obj[el.dataset.i] + "px";
      }
    });
  }

  // initialize
  setPropertyReadouts(getBodyWidth());
  setPropertyReadouts(getFontSize());

  window.addEventListener("resize", () => {
    setPropertyReadouts(getBodyWidth());
    setPropertyReadouts(getFontSize());
  });

  const condition = {
    true: "on",
    false: "off",
  };

  const debugSettings = sessionStorage.getItem("debugSettings")
    ? sessionStorage.getItem("debugSettings").split(",")
    : [];
  if (debugSettings) {
    document.body.classList.add(...debugSettings);
    debugSettings.forEach((setting) => {
      const button = document.querySelector(`[data-i="${setting}"]`);
      button.dataset.v = "false" === button.dataset.v;
      button.textContent = condition[button.dataset.v];
    });
  }

  function toggleButton({ target }) {
    document.body.classList.toggle(target.dataset.i);
    target.dataset.v = "false" === target.dataset.v;
    target.textContent = condition[target.dataset.v];

    target.dataset.v === "true"
      ? debugSettings.push(target.dataset.i)
      : debugSettings.splice(debugSettings.indexOf(target.dataset.i), 1);

    sessionStorage.setItem("debugSettings", debugSettings);
  }

  document
    .querySelectorAll("footer button")
    .forEach((button) => button.addEventListener("click", toggleButton));
})();
