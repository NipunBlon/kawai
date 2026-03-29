/* ═══════════════════════════════════════════════════
   ANITA MAGAR — PORTFOLIO  ·  script.js
═══════════════════════════════════════════════════ */

/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const toggleIcon = themeToggle.querySelector('.toggle-icon');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
});

function updateToggleIcon(theme) {
  toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── CUSTOM CURSOR ── */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor expand on links/buttons
document.querySelectorAll('a, button, .hobby-card, .artist-card, .skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
    ring.style.opacity = '0.8';
    dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.opacity = '0.5';
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

/* ── TYPEWRITER ── */
const phrases = [
  'Student & Dreamer ✨',
  'Anime Enthusiast 🎌',
  'Beginner Coder 💻',
  'Music Lover 🎵',
  'Movie Buff 🎬',
  'Guitar in Progress 🎸',
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typeEl = document.getElementById('typewriter');
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE = 1800;

function typeWriter() {
  const phrase = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
    typeEl.textContent = phrase.slice(0, charIdx) + '|';
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, DELETE_SPEED);
  } else {
    charIdx++;
    typeEl.textContent = phrase.slice(0, charIdx) + (charIdx < phrase.length ? '|' : '');
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeWriter, PAUSE);
      return;
    }
    setTimeout(typeWriter, TYPE_SPEED);
  }
}
setTimeout(typeWriter, 600);

/* ── COUNTER ANIMATION ── */
function animateCount(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const heroSection = document.getElementById('home');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      const isAnime = target === 100;
      animateCount(el, target, isAnime ? '+' : '');
    });
  }
}
window.addEventListener('scroll', startCounters, { passive: true });
setTimeout(startCounters, 800);

/* ── SCROLL ANIMATIONS ── */
const fadeEls = document.querySelectorAll('.journey-card, .hobby-card, .artist-card, .skill-pill, .about-grid, .contact-inner, .meta-item');
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    const rect = s.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── CONTACT FORM ── */
function handleForm(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '🌸 Message sent! I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 5000);
}

/* ── SMOOTH SCROLL for sidebar links ── */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── SAKURA PARTICLES (subtle floating petals) ── */
function createSakuraPetal() {
  const hero = document.querySelector('.hero-bg-blobs');
  if (!hero) return;
  const petal = document.createElement('div');
  petal.style.cssText = `
    position: absolute;
    width: ${6 + Math.random() * 8}px;
    height: ${6 + Math.random() * 8}px;
    background: ${Math.random() > 0.5 ? '#ffb7c5' : '#ffccd5'};
    border-radius: 50% 0 50% 0;
    opacity: 0;
    left: ${Math.random() * 100}%;
    top: -10px;
    pointer-events: none;
    z-index: 0;
    animation: petalFall ${4 + Math.random() * 5}s linear forwards;
  `;
  hero.appendChild(petal);
  setTimeout(() => petal.remove(), 9000);
}

// Inject petal animation
const style = document.createElement('style');
style.textContent = `
  @keyframes petalFall {
    0%   { transform: translateY(0) rotate(0deg);     opacity: 0; }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.3; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(style);
setInterval(createSakuraPetal, 2200);
