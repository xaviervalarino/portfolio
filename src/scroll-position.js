(()=>{
  window.addEventListener("scroll", () => { 
    // set scroll percent as custom prop
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);
})();
