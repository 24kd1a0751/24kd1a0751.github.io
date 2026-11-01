(function () {
  'use strict';

  /* ---- Settings you can edit ---- */
  // Paste your LinkedIn profile URL between the quotes, e.g. "https://www.linkedin.com/in/your-name"
  var LINKEDIN_URL = '';
  var CONTACT_EMAIL = 'meghanadhpotupureddi2006@gmail.com';

  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Toast ---- */
  var toast = $('#toast'), toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  /* ---- LinkedIn links (placeholder until URL is set) ---- */
  $$('.js-linkedin').forEach(function (a) {
    if (LINKEDIN_URL) {
      a.href = LINKEDIN_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.removeAttribute('title');
      if (a.hasAttribute('aria-label')) a.setAttribute('aria-label', 'LinkedIn profile');
    } else {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('LinkedIn link coming soon.');
      });
    }
  });

  /* ---- Header state, back-to-top ---- */
  var header = $('.site-header'), toTop = $('#toTop');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = $('#navToggle'), menu = $('#navMenu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('.nav-link').forEach(function (l) { l.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

  /* ---- Active nav indicator ---- */
  var links = $$('.nav-link');
  var sections = links.map(function (l) { return $(l.getAttribute('href')); }).filter(Boolean);
  function setActive() {
    var line = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= line) current = s; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach(function (l) {
      var on = current && l.getAttribute('href') === '#' + current.id;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();

  /* ---- Scroll reveal ---- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 4) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Hero rotating focus words (all taken from the resume) ---- */
  var words = ['Python', 'Web Development', 'Problem Solving', 'Machine Learning'];
  var rot = $('#rotator'), wi = 0;
  if (rot && !reduceMotion) {
    setInterval(function () {
      rot.classList.add('out');
      setTimeout(function () {
        wi = (wi + 1) % words.length;
        rot.textContent = words[wi];
        rot.classList.remove('out');
      }, 320);
    }, 2600);
  }

  /* ---- Contact form (opens the visitor's email app; no backend) ---- */
  var form = $('#contactForm'), note = $('#formNote');
  var defaultNote = note.textContent;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, firstBad = null;
    $$('.field', form).forEach(function (f) {
      var input = $('input,textarea', f), v = input.value.trim();
      var valid = v.length > 0 && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      f.classList.toggle('invalid', !valid);
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid) { ok = false; if (!firstBad) firstBad = input; }
    });
    if (!ok) {
      note.textContent = 'Please fill in every field with a valid email address.';
      note.classList.add('error');
      firstBad.focus();
      return;
    }
    note.classList.remove('error');
    var d = new FormData(form);
    var body = 'Name: ' + d.get('name') + '\nEmail: ' + d.get('email') + '\n\n' + d.get('message');
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(d.get('subject')) +
      '&body=' + encodeURIComponent(body);
    note.textContent = 'Your email app should open with the message ready. If it does not, write to ' + CONTACT_EMAIL + '.';
    showToast('Opening your email app…');
  });
  $$('input,textarea', form).forEach(function (el) {
    el.addEventListener('input', function () {
      el.closest('.field').classList.remove('invalid');
      if (note.classList.contains('error')) { note.classList.remove('error'); note.textContent = defaultNote; }
    });
  });

  /* ---- Footer year ---- */
  $('#year').textContent = new Date().getFullYear();
})();
