/**
 * MAYUR KUSMADE — PORTFOLIO JAVASCRIPT
 * Features: dark/light theme, mobile nav, scroll reveal,
 *           animated skill bars, active nav links, contact form, back-to-top
 */

/* ========================================
   THEME TOGGLE
   ======================================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ========================================
   MOBILE NAVIGATION
   ======================================== */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

hamburger.addEventListener('click', () => toggleMenu(!navLinks.classList.contains('open')));
navOverlay.addEventListener('click', () => toggleMenu(false));

// Close on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  navOverlay.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  navOverlay.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') toggleMenu(false);
});

/* ========================================
   NAVBAR — SCROLL EFFECTS & ACTIVE LINKS
   ======================================== */
const navbar = document.getElementById('navbar');

// All sections with IDs for active nav tracking
const sections = Array.from(document.querySelectorAll('section[id]'));

window.addEventListener('scroll', () => {
  // Scrolled class for shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active link highlighting
  const scrollMid = window.scrollY + window.innerHeight / 2;
  let current = '';

  sections.forEach(section => {
    if (section.offsetTop <= scrollMid) {
      current = section.getAttribute('id');
    }
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').slice(1);
    link.classList.toggle('active', href === current);
  });
}, { passive: true });

/* ========================================
   BACK TO TOP
   ======================================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================================
   SCROLL REVEAL
   ======================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px',
});

revealElements.forEach(el => revealObserver.observe(el));

/* ========================================
   ANIMATED SKILL BARS
   ======================================== */
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = target.getAttribute('data-width');
      // Small delay to let reveal animation fire first
      setTimeout(() => {
        target.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ========================================
   FOOTER YEAR
   ======================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========================================
   CONTACT FORM (demo — no backend)
   Replace this section with your own
   form submission logic (e.g. Formspree,
   EmailJS, or a backend endpoint).
   ======================================== */
const contactForm    = document.getElementById('contactForm');
const formMessage    = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic client-side validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // --- REPLACE THE BLOCK BELOW WITH YOUR ACTUAL FORM SUBMISSION ---
    // Example using Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, message })
    //   });
    //   if (res.ok) { ... }
    // ---------------------------------------------------------------

    // Demo success response:
    showFormMessage('✓ Message sent! I\'ll reply within 24 hours.', 'success');
    contactForm.reset();
  });
}

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.style.color = type === 'success' ? 'var(--accent)' : '#ff6b6b';
  // Clear after 5 seconds
  setTimeout(() => { formMessage.textContent = ''; }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ========================================
   SMOOTH TYPING EFFECT FOR HERO (optional)
   ======================================== */
// Uncomment if you want a typing cursor effect on the tagline
/*
const tagline   = document.querySelector('.hero-tagline');
const tagTexts  = [
  'AI & Data Science Student · Aspiring ML Engineer',
  'NLP & Machine Learning Developer',
  'Published Researcher · Hackathon Winner',
];
let tIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const current = tagTexts[tIdx];
  if (!deleting) {
    tagline.innerHTML = `<em>${current.slice(0, cIdx + 1)}</em>`;
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    tagline.innerHTML = `<em>${current.slice(0, cIdx - 1)}</em>`;
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % tagTexts.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();
*/

/* ========================================
   ACCESSIBILITY — FOCUS TRAP IN MOBILE NAV
   ======================================== */
navLinks.addEventListener('keydown', (e) => {
  if (!navLinks.classList.contains('open')) return;
  const focusables = navLinks.querySelectorAll('a, button');
  const first      = focusables[0];
  const last       = focusables[focusables.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ========================================
   HERO GRID PARALLAX (subtle)
   ======================================== */
const heroGrid = document.querySelector('.hero-grid');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroGrid.style.transform = `translateY(${offset * 0.2}px)`;
  }, { passive: true });
}

/* ========================================
   CONSOLE EASTER EGG
   ======================================== */
console.log(
  '%c👋 Hey recruiter / developer!\n%cPortfolio by Mayur Kusmade — mayurkusmade13@gmail.com',
  'font-size:18px; font-weight:bold; color:#00e5ff;',
  'font-size:13px; color:#9090a8;'
);
