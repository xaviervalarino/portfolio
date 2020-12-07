// Debug
(function(){
  let fontSize = getFontSize()

  function bodyWidth () {
    return Math.round( document.body.clientWidth);
  }
  function getFontSize () {
    var value = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return Math.round( value * 10)/ 10 // round to one decimal place
  }
  // TODO: collapse these three into one function
  function setWidthReadout (value) {
    document.querySelector('#width-readout').textContent = value + "px";
  }
  function setFontSizeReadout (fontSize) {
    document.querySelector('#fontsize-readout').textContent = fontSize + "px";
  }
  function toggleTextContent (span) {   
    span.textContent = span.textContent === 'OFF' ? 'ON' : 'OFF';
  }

  // initial
  setWidthReadout(bodyWidth());
  setFontSizeReadout(fontSize)

  window.addEventListener("resize", () => {
    fontSize = getFontSize();
    setFontSizeReadout(fontSize)
    setWidthReadout(bodyWidth())
  });

  document.querySelector('#column-toggle')
    .addEventListener('click', function () {
      let span = this.querySelector('span');
      toggleTextContent(span);
      document.body.classList.toggle('grid-columns');
    })
  ;

  document.querySelector('#baseline-toggle')
    .addEventListener('click', function () {
      let span = this.querySelector('span');
      toggleTextContent(span);
      document.body.classList.toggle('baseline');
    })
  ;
}());
