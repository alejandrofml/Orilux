document.addEventListener('DOMContentLoaded', function () {
  // Menú hamburguesa
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
  });


  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('touchstart', (event) => { // el evento por defecto es el click, pero como estamos en un cel, lo cambiamos a touchstart 
      event.preventDefault(); // prevenimos el evento por defecto 
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('open');
      window.location.href = link.href; // en lugar de hacer click, redirigimos a la url del link
    });
  });


  const accordionCards = document.querySelectorAll('.OtherServices-section .card-accordion');
  accordionCards.forEach(card => {
    card.addEventListener('click', function () {
      // Primero, cerramos todas las tarjetas excepto la que se clickeó
      accordionCards.forEach(c => {
        if (c !== card) {
          c.classList.remove('expanded');
        }
      });
      // Luego, alternamos el estado de la tarjeta clickeada
      card.classList.toggle('expanded');
    });
  });


  // Seleccionamos la cabecera y la sección "Inicio"
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('#Inicio');

  // Configuramos el Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Si la sección Inicio está visible, expandimos la barra
        header.classList.add('header-expanded');
      } else {
        // Al salir de la sección Inicio, la barra vuelve a su tamaño normal
        header.classList.remove('header-expanded');
      }
    });
  }, {
    threshold: 0.2 // Ajusta el umbral según necesites
  });

  // Observamos la sección Hero
  observer.observe(heroSection);

  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    },
    autoplay: {
      delay: 4000,
    },
  });
  
  // Calcula la altura del header
  const headerHeight = document.querySelector('.header').offsetHeight;

  // Función de easing (easeInOutQuad)
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function smoothScrollTo(targetPosition, duration) {
    const htmlElement = document.documentElement;
    // Deshabilitar temporalmente el scroll-snap
    htmlElement.style.scrollSnapType = 'none';

    const start = window.pageYOffset;
    const distance = targetPosition - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, start + distance * easedProgress);
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        // Restaurar scroll-snap al finalizar
        htmlElement.style.scrollSnapType = 'y mandatory';
      }
    }
    requestAnimationFrame(animateScroll);
  }


  // Intercepta los clics en enlaces internos y utiliza la función personalizada
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Calcula la posición destino ajustando la altura del header
        const targetPosition = target.offsetTop - headerHeight;
        smoothScrollTo(targetPosition, 800);
      }
    });
  });


});
