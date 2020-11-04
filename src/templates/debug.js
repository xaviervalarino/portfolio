const body = document.querySelectorAll('body')
const grids = document.querySelectorAll('.r-grid');

function toggleTextContent (span) {   
  span.textContent = span.textContent === 'OFF' ? 'ON' : 'OFF';

}

function toggleClasses (nodeList, className) {
  Array.prototype.forEach.call(nodeList, el => {
    el.classList.toggle(className);
  });
}

document.querySelector('#debug-toggle')
  .addEventListener('click', function () {
    let span = this.querySelector('span');
    toggleTextContent(span);
    toggleClasses(grids, 'debug');
  })
;

document.querySelector('#baseline-toggle')
  .addEventListener('click', function () {
    let span = this.querySelector('span');
    toggleTextContent(span);
    toggleClasses(body, 'baseline');
  })
;
