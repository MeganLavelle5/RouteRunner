// ============================================
// NAVIGATION — hamburger + active link
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Mark current page link as active
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ============================================
// EMAIL CAPTURE FORM
// ============================================
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailForm.querySelector('input[type="email"]').value;
    if (email) {
      emailForm.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      // TODO: connect to your email service (Mailchimp, ConvertKit, etc.)
      console.log('Email captured:', email);
    }
  });
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ============================================
// HOW IT WORKS — INTERACTIVE DEMO
// ============================================
const stepBtns    = document.querySelectorAll('.demo-step-btn');
const demoContents = document.querySelectorAll('.demo-content');

stepBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    stepBtns.forEach(b => b.classList.remove('active'));
    demoContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    demoContents[i].classList.add('active');
  });
});

// ============================================
// COUNTER ANIMATION (stats bar)
// ============================================
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat h3').forEach(el => {
        const raw = el.dataset.count;
        const suffix = el.dataset.suffix || '';
        animateCounter(el, parseFloat(raw), suffix);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsBar);
}
