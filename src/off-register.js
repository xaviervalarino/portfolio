(function () {
  const el = document.querySelector('.registration');
  const rects = el.getClientRects()[0];
  // const offRegistration {
  let quadrant;

  function getQuadrant (e) {
    let quadrant = [];
    const coordinates = {}
    // note: position idenfitiers are counter-clockwise
    coordinates.lat = {
      id: [ [2,3], [1,4] ],
      dimension: {
        left: e.x - rects.left,
        right: rects.right - e.x,
      }
    },
    coordinates.lon = {
      id: [ [1,2], [3,4] ],
      dimension: {
        top: e.y - rects.top,
        bottom: rects.bottom - e.y,
      },
    }
    Object.keys(coordinates).forEach( (pos) => {
      let closestSide;
      const d = coordinates[pos].dimension;
      const side = Object.entries(d).map( (side) => {
        return side[0];
      });
      // test for shortest distance 
      closestSide = d[side[0]] < d[side[1]] ?
        coordinates[pos].id[0] :
        coordinates[pos].id[1] ;
      quadrant = quadrant.concat(closestSide)
    });
    quadrant= quadrant.filter( (el, i, arr) => {
      if  (el, arr.lastIndexOf(el) !== i ) {
        return el;
      }
    });
    return quadrant[0];
  }
  el.addEventListener('mousemove', function (e) {
    const last = quadrant;
    const current =  getQuadrant(e);
    if (current !== last) {
      requestAnimationFrame( () => {
          el.classList.remove(`off-register:${last}`)
          el.classList.add(`off-register:${current}`)
      });
      console.log(quadrant)
      quadrant = current;
    }
  });
  el.addEventListener('mouseout', function () {
    requestAnimationFrame( () => {
      el.classList.remove(`off-register:${quadrant}`) 
    });
    console.log('mouseout')
  });
}());

