// Año automático en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const abierto = navLinks.classList.contains('open');
  menuBtn.textContent = abierto ? '✕' : '☰';
  menuBtn.setAttribute('aria-expanded', String(abierto));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.textContent = '☰';
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Animación de entrada al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Resalta en el menú la sección que se está viendo
const secciones = document.querySelectorAll('main section[id]');
const enlacesMenu = document.querySelectorAll('.nav-links a');
const observadorMenu = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      enlacesMenu.forEach(a => {
        const activo = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', activo);
        if (activo) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
secciones.forEach(s => observadorMenu.observe(s));
