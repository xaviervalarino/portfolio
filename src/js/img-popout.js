// Image expand
(() => {
  const images = document.querySelectorAll("article img:not(.hero)");

  const setStyles = (node, obj) => {
    for (const property in obj) {
      node.style[property] = obj[property];
    }
  };

  const imgOnClickHandler = (e) => {
    const overlay = document.createElement("div");
    const img = e.target.cloneNode(true);
    setStyles(overlay, {
      position: "fixed",
      background: "rgba(0,0,0, 0.5)",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      padding: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    });
    setStyles(img, {
      maxHeight: "100%",
      boxShadow: "0 0 1rem rgba(0,0,0, 0.25)",
      border: "1px solid rgba(100,100,100, 0.05)",
      borderRadius: "3px",
    });
    overlay.appendChild(img);
    document.querySelector("body").appendChild(overlay);
    overlay.onclick = () => {
      overlay.remove();
    };
    console.log("img clicked", e.target.alt);
  };
  for (const img of images) {
    img.onclick = imgOnClickHandler;
  }
})();
