// =============================================
//   BINGWA SOKONI LANDING PAGE - JS
// =============================================

// --- Pre-loader removal ---
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  document.body.classList.remove('loading');
});

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Animated counter for hero stats ---
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger counters when hero is visible
const heroSection = document.getElementById('hero');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
          animateCounter(el, target);
        }
      });
    }
  });
}, { threshold: 0.3 });

if (heroSection) heroObserver.observe(heroSection);

// --- Intersection Observer for feature cards ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step-card, .pricing-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// --- Typing effect for hero badge ---
const badge = document.querySelector('.hero-badge');
if (badge) {
  badge.style.opacity = '0';
  badge.style.transform = 'translateY(8px)';
  setTimeout(() => {
    badge.style.transition = 'all 0.6s ease';
    badge.style.opacity = '1';
    badge.style.transform = 'translateY(0)';
  }, 200);
}

// --- Stagger hero content animation ---
const heroEls = [
  '.hero-badge',
  '.hero-title',
  '.hero-subtitle',
  '.hero-actions',
  '.hero-stats'
];

heroEls.forEach((selector, i) => {
  const el = document.querySelector(selector);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  }
});

// --- Hero visual and floating badges animation ---
const phoneEl = document.querySelector('.hero-visual');
if (phoneEl) {
  phoneEl.style.opacity = '0';
  phoneEl.style.transform = 'translateY(30px)';
  phoneEl.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
  setTimeout(() => {
    phoneEl.style.opacity = '1';
    phoneEl.style.transform = 'translateY(0)';
  }, 400);
}

// --- Track download button clicks (analytics ready) ---
document.querySelectorAll('[id$="-download-btn"]').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('[Bingwa Sokoni] Download clicked:', btn.id);
    // You can add Google Analytics event tracking here:
    // gtag('event', 'download', { event_category: 'APK', event_label: btn.id });
  });
});

// --- WhatsApp buttons ---
document.querySelectorAll('[id$="-whatsapp-btn"]').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('[Bingwa Sokoni] WhatsApp clicked');
  });
});

// --- Parallax tilt on phone mockup ---
const phoneMockup = document.querySelector('.phone-frame');
const heroVisual = document.querySelector('.hero-visual');

if (phoneMockup && heroVisual) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    phoneMockup.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
    phoneMockup.style.transition = 'transform 0.1s ease';
  });

  heroVisual.addEventListener('mouseleave', () => {
    phoneMockup.style.transform = '';
    phoneMockup.style.transition = 'transform 0.5s ease';
  });
}

// --- Contact Form Handling ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  console.log('[Bingwa Sokoni] Form Submission:', data);
  
  // Simulate API call
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    // Show success message
    formStatus.innerHTML = 'Message sent successfully! We will get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    
    // Clear status after 5 seconds
    setTimeout(() => {
      formStatus.innerHTML = '';
      formStatus.className = 'form-status';
    }, 5000);
  }, 1500);
});

// --- Toast Notifications ---
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Update download button click tracking to show toast
document.querySelectorAll('[id$="-download-btn"]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('🚀 Starting download... Enjoy Bingwa Sokoni!');
  });
});

console.log('🚀 Bingwa Sokoni landing page loaded.');
