
    const iconBar = document.querySelector('.icon-bar');
    const nav = document.querySelector('nav');
  
    iconBar.addEventListener('click', function () {
      iconBar.classList.toggle('active');
  
      nav.classList.toggle('active');
 
  });
  
  