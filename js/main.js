/* ============================================================
   main.js — Portfólio Thales Mattos
   - Navbar scroll + highlight ativo
   - Menu mobile + overlay
   - Typed text efeito
   - Abas PT / EN
   - EmailJS formulário de contato
   - AOS init
   ============================================================ */

// ── EmailJS ──────────────────────────────────────────────────
// INSTRUÇÕES: substitua os valores abaixo pelos seus dados do EmailJS
// 1. Crie conta em https://www.emailjs.com/
// 2. Crie um serviço (ex: Gmail) → copie o SERVICE_ID
// 3. Crie um template com variáveis {{from_name}}, {{reply_to}}, {{message}}
// 4. Copie o TEMPLATE_ID e o PUBLIC_KEY (Account → API Keys)
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';

// ── Init EmailJS ──────────────────────────────────────────────
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

// ── AOS ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  initNavbar();
  initMobileMenu();
  initTyped();
  initLangTabs();
  initContactForm();
  initActiveNavLink();
});

// ────────────────────────────────────────────────────────────
// NAVBAR — scroll behaviour
// ────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Active link on scroll ─────────────────────────────────────
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

// ────────────────────────────────────────────────────────────
// MOBILE MENU
// ────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggle  = document.getElementById('nav-toggle');
  const menu    = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function openMenu() {
    toggle.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

// ────────────────────────────────────────────────────────────
// TYPED TEXT EFFECT
// ────────────────────────────────────────────────────────────
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const words = [
    'Software Engineer',
    'Backend Developer',
    'Full-Stack Developer',
    'Estudante de Eng. de Software',
  ];

  let wordIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPausing   = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isPausing) return;

    if (!isDeleting) {
      el.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isPausing = true;
        setTimeout(function () {
          isPausing = false;
          isDeleting = true;
          type();
        }, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    }
  }

  setTimeout(type, 600);
}

// ────────────────────────────────────────────────────────────
// LANGUAGE TABS (PT / EN)
// ────────────────────────────────────────────────────────────
function initLangTabs() {
  const buttons  = document.querySelectorAll('.lang-btn');
  const contents = document.querySelectorAll('.lang-content');

  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const lang = btn.dataset.lang;

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      contents.forEach(function (c) {
        c.classList.toggle('hidden', c.id !== 'lang-' + lang);
      });
    });
  });
}

// ────────────────────────────────────────────────────────────
// CONTACT FORM + EmailJS
// ────────────────────────────────────────────────────────────
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const feedback   = document.getElementById('form-feedback');

  if (!form) return;

  // ── Validation helpers ──────────────────────────────────────
  function showError(fieldId, errorId, msg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field)  field.classList.add('input-error');
    if (error)  error.textContent = msg;
  }

  function clearErrors() {
    ['from_name', 'reply_to', 'message'].forEach(function (id) {
      const field = document.getElementById(id);
      if (field) field.classList.remove('input-error');
    });
    ['error-name', 'error-email', 'error-message'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'form-feedback hidden';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm(name, email, message) {
    let valid = true;

    if (!name || name.trim().length < 2) {
      showError('from_name', 'error-name', 'Por favor, insira seu nome completo.');
      valid = false;
    }
    if (!email || !isValidEmail(email)) {
      showError('reply_to', 'error-email', 'Insira um e-mail válido.');
      valid = false;
    }
    if (!message || message.trim().length < 10) {
      showError('message', 'error-message', 'A mensagem deve ter pelo menos 10 caracteres.');
      valid = false;
    }

    return valid;
  }

  // ── Set loading state ───────────────────────────────────────
  function setLoading(loading) {
    if (loading) {
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      submitBtn.disabled = true;
    } else {
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
    }
  }

  // ── Show feedback ───────────────────────────────────────────
  function showFeedback(type, msg) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'form-feedback ' + type;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Submit ──────────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name    = document.getElementById('from_name').value;
    const email   = document.getElementById('reply_to').value;
    const message = document.getElementById('message').value;

    if (!validateForm(name, email, message)) return;

    // Check if EmailJS was configured
    if (
      EMAILJS_SERVICE_ID  === 'SEU_SERVICE_ID'  ||
      EMAILJS_TEMPLATE_ID === 'SEU_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY  === 'SUA_PUBLIC_KEY'
    ) {
      showFeedback(
        'error',
        '⚙️ Configure o EmailJS no arquivo js/main.js para habilitar o envio.'
      );
      return;
    }

    if (typeof emailjs === 'undefined') {
      showFeedback('error', 'Serviço de e-mail indisponível. Tente mais tarde.');
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(function () {
        setLoading(false);
        showFeedback(
          'success',
          '✅ Mensagem enviada com sucesso! Responderei em breve.'
        );
        form.reset();
      })
      .catch(function (error) {
        setLoading(false);
        console.error('EmailJS error:', error);
        showFeedback(
          'error',
          '❌ Erro ao enviar. Tente pelo e-mail ou WhatsApp diretamente.'
        );
      });
  });

  // ── Clear error on input ─────────────────────────────────────
  ['from_name', 'reply_to', 'message'].forEach(function (id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', function () {
        field.classList.remove('input-error');
        const errorId = {
          from_name: 'error-name',
          reply_to:  'error-email',
          message:   'error-message',
        }[id];
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.textContent = '';
      });
    }
  });
}
