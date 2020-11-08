(function () {
  //state
  let isScrolling;
  // nodes
  const node = document.querySelector('.off-register');
  const style  = document.createElement("style");

  // TODO: Use scroll position as part of the effect
  // window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop
  // TODO: actually, might be nicer to just use mouse position instead
  function random () {
    var n = (Math.random() * 2 - 1) ;
    return n;
  }
  function createRegistrationEffect() {
    return `
      .off-register.effect::before {
        transform: translate(${random()}rem, ${random()}rem)
      }
      .off-register.effect::after  { 
        transform: translate(${random()}rem, ${random()}rem)
      }
    `;
  }

  document.getElementsByTagName("head")[0].appendChild(style);
  // style.innerHTML = createRegistrationEffect(0);

  // Listen for scroll events
  window.addEventListener('scroll', function ( event ) {
    // Clear timeout throughout when scrolling
    window.clearTimeout( isScrolling );
    window.requestAnimationFrame(function () {
      // setTimeout(function () {
        console.log(window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop)
        node.classList.add('effect');
        style.innerHTML = createRegistrationEffect();  
      // }, 300)
    });

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      // Run the callback
      console.log( 'Scrolling has stopped.' );
      window.requestAnimationFrame(function (){
        node.classList.remove('effect')
      });
    }, 700);
  });

}());
