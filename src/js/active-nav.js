document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    // Перевіряємо, чи шлях посилання збігається з поточним шляхом
    // Додаємо `endsWith` для коректної роботи з `index.html`
    if (link.getAttribute('href') === currentLocation.substring(1) || (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
});

