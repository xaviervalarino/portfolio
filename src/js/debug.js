// Debug
(function(){

  function getBodyWidth () {
    return {
      bodyWidth: document.body.clientWidth
    };
  }
  function getFontSize () {
    var value = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return {
      fontSize: Math.round( value * 10)/ 10 // round to one decimal place
    }
  }
  function setPropertyReadouts (obj) {
    document.querySelectorAll('[data-t="readout"]')
      .forEach( el => {
        if ( obj[el.dataset.i] ) {
          el.textContent = obj[el.dataset.i] + 'px';
        }
      })
    ;
  }
        
  // initialize
  setPropertyReadouts(getBodyWidth());
  setPropertyReadouts(getFontSize())

  window.addEventListener("resize", () => {
    setPropertyReadouts(getBodyWidth());
    setPropertyReadouts(getFontSize())
  });
  document.querySelectorAll('footer button')
    .forEach( button => {
      button.addEventListener('click', function () {
        const condition = {
          true: 'on',
          false: 'off'
        };
        document.body.classList.toggle(this.dataset.i);
        this.dataset.v = 'false' === this.dataset.v ? true : false;
        this.textContent = condition[this.dataset.v]
      });
    })
  ;
}());
