(function () {
  const el = document.querySelector('.registration');
  let lastScrollTop = 0;
  let isScrolling;
  let lastClass; 

  function changeOffRegisterStyle (last, current) {
    requestAnimationFrame( () => {
       if ( last) {
         el.classList.remove(`off-register:${last}`)
       }
       if (current) {
         el.classList.add(`off-register:${current}`)
       }
    });
  return current;
  }
  window.addEventListener("scroll", () => { 
    const position = window.pageYOffset || document.documentElement.scrollTop; 
    const distance =  position - el.offsetTop; 
    let currentClass; 
    if ( position < 50 ) { currentClass = '' } 
    else if ( position < 250 ) { currentClass = 's' } 
    else if ( position < 450 ) { currentClass = 'm' } 
    else { currentClass = 'l' } 
    console.log(currentClass, position)
    lastClass = changeOffRegisterStyle(lastClass, currentClass);

    lastScrollTop = position <= 0 ? 0 : position; // For Mobile or negative scrolling

    // isScrolling = setTimeout( () => {
    //   console.log('timeout over')
    //   lastClass = changeOffRegisterStyle(lastClass, '');
    // }, 2000)
}, false);
 
  window.on
} ())
