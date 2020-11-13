(function () {
  const docElement = document.documentElement;
  const el = document.querySelector('.registration');
  // one actual rem for the site = .333v * 1 rem
  // let, in case the window is resized
  let rem = parseFloat(getComputedStyle(docElement).fontSize);
  let lastClassId; 

  function getClassId (position) {
    let classId; 
    // .off-register class ids 1-9
    for ( let i = 1; i < 10; i++ ) {
      // +50: add a little bit of buffer 
      let distance = rem * i + 50;
      if ( position > distance ) {
        classId = i
      }
    }
    return classId;
  }
  function changeOffRegisterStyle (lastId, currentId) {
    requestAnimationFrame( () => {
       if (lastId) {
         el.classList.remove(`off-register:${lastId}`)
       }
       if (currentId) {
         el.classList.add(`off-register:${currentId}`)
       }
    });
    return currentId;
  }

  window.addEventListener("resize", () => {
    rem = parseFloat(getComputedStyle(docElement).fontSize);
  });
  window.addEventListener("scroll", () => { 
    const position = window.pageYOffset || docElement.scrollTop; 
    let currentClassId = getClassId(position);
    lastClassId = changeOffRegisterStyle(lastClassId, currentClassId);
  }, false);
} ())
