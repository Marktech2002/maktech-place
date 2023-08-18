const toogle = document.querySelector('.toogle');
const closeDown = document.querySelector('.navigation');

window.addEventListener('load',   () =>{
    const loadercontainer = document.querySelector(".loader-container");
     loadercontainer.style.display = "none" ;
  });

toogle.addEventListener('click' , function(){
    toogle.classList.toggle('active');
    closeDown.classList.toggle('active');
});

