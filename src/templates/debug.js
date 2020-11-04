document.querySelector('#debug-toggle')
  .addEventListener('click', function () {
    const grids = document.querySelectorAll('.r-grid');
    Array.prototype.forEach.call(grids, el => el.classList.toggle('debug'));
    let readout = this.children[0];
    readout.textContent = readout.textContent === 'OFF' ? 'ON' : 'OFF';
  });
