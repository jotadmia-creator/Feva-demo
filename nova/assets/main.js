// NOVA — comportamiento compartido entre páginas

// Progress bar + header on scroll
const progBar = document.getElementById('prog');
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => {
  if (progBar) {
    const s = document.documentElement, t = s.scrollTop, h = s.scrollHeight - window.innerHeight;
    progBar.style.width = (h > 0 ? t / h * 100 : 0) + '%';
  }
  if (hdr) hdr.classList.toggle('scrolled', scrollY > 40);
});

// Mobile nav
const hbg = document.getElementById('hbg'), mnav = document.getElementById('mnav');
if (hbg && mnav) {
  hbg.addEventListener('click', () => { hbg.classList.toggle('open'); mnav.classList.toggle('open'); });
}

// Reveal on scroll
const obs = new IntersectionObserver((es) => es.forEach((e, i) => {
  if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), i * 60); obs.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Stat counters
const cobs = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return;
  const t = +e.target.dataset.t, isBig = t >= 1000;
  let c = 0; const step = t / 50;
  const tick = () => {
    c = Math.min(c + step, t);
    e.target.textContent = (isBig ? '+' : '') + Math.floor(c).toLocaleString('es') + (t === 100 ? '%' : '');
    if (c < t) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick); cobs.unobserve(e.target);
}), { threshold: .5 });
document.querySelectorAll('.stat-num[data-t]').forEach(el => cobs.observe(el));

// Carta: tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cat-section').forEach(s => s.classList.remove('visible'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('visible');
  });
});

// Galería: filtro
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.gal-item').forEach(item => {
      item.style.display = (f === 'all' || item.dataset.cat === f) ? 'block' : 'none';
    });
  });
});

// Contacto: formulario
const reservaForm = document.getElementById('reserva-form');
if (reservaForm) {
  reservaForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    e.target.querySelectorAll('input,textarea,select,button').forEach(el => el.disabled = true);
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  const fecha = document.getElementById('fecha');
  if (fecha) fecha.min = new Date().toISOString().split('T')[0];
}
