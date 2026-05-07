document.addEventListener('DOMContentLoaded', function() {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function() { links.classList.toggle('open'); });
    links.querySelectorAll('a:not(.nav__dropdown-toggle)').forEach(function(l) {
      l.addEventListener('click', function() { links.classList.remove('open'); });
    });
  }

  // Dropdown click toggle (desktop)
  var dropdownToggle = document.querySelector('.nav__dropdown-toggle');
  var dropdown = document.querySelector('.nav__dropdown');
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }

  // Nav scroll effect
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Scroll animations
  var els = document.querySelectorAll('.animate-on-scroll');
  if (els.length) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(el) { obs.observe(el); });
  }

  // Custom anchor smooth scroll: cancellable by user touch/wheel (iOS Safari
  // briga com scroll-behavior:smooth quando o usuário arrasta durante a animação).
  // Também pré-revela .animate-on-scroll dentro do alvo para evitar cascata
  // de animações na chegada.
  var scrollRaf = null;
  var scrollAnimating = false;
  function cancelAnchorScroll() {
    scrollAnimating = false;
    if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = null; }
  }
  window.addEventListener('touchstart', cancelAnchorScroll, { passive: true });
  window.addEventListener('wheel', cancelAnchorScroll, { passive: true });
  window.addEventListener('keydown', function(e) {
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].indexOf(e.key) > -1) cancelAnchorScroll();
  });

  function smoothScrollTo(targetY) {
    cancelAnchorScroll();
    scrollAnimating = true;
    var startY = window.pageYOffset;
    var diff = targetY - startY;
    var dist = Math.abs(diff);
    var duration = Math.min(700, Math.max(280, dist / 2.4));
    var startTime;
    function step(t) {
      if (!scrollAnimating) return;
      if (!startTime) startTime = t;
      var progress = Math.min((t - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + diff * eased);
      if (progress < 1 && scrollAnimating) {
        scrollRaf = requestAnimationFrame(step);
      } else {
        scrollAnimating = false;
        scrollRaf = null;
      }
    }
    scrollRaf = requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      var target;
      try { target = document.querySelector(href); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      if (target.classList.contains('animate-on-scroll')) target.classList.add('visible');
      target.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.classList.add('visible');
      });
      var navHeight = 80;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      smoothScrollTo(Math.max(0, top));
      if (history.pushState) history.pushState(null, '', href);
    });
  });

  // Active nav link
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__links a:not(.nav__cta)').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href) {
      href = href.replace(/\/$/, '') || '/';
      if (href === path) a.classList.add('active');
    }
  });

  // =====================
  // CAROUSEL (new clean version)
  // =====================
  document.querySelectorAll('.carousel-wrap').forEach(function(wrap) {
    var track = wrap.querySelector('.carousel-track');
    var slides = wrap.querySelectorAll('.carousel-slide');
    var dots = wrap.querySelectorAll('.carousel-dot');
    var leftBtn = wrap.querySelector('.carousel-arrow--left');
    var rightBtn = wrap.querySelector('.carousel-arrow--right');
    var current = 0;
    var total = slides.length;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, j) { d.classList.toggle('active', j === current); });
    }

    if (leftBtn) leftBtn.addEventListener('click', function() { goTo(current - 1); });
    if (rightBtn) rightBtn.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });

    // Auto-play
    var timer = setInterval(function() { goTo(current + 1); }, 5000);
    wrap.addEventListener('mouseenter', function() { clearInterval(timer); });
    wrap.addEventListener('mouseleave', function() {
      timer = setInterval(function() { goTo(current + 1); }, 5000);
    });

    // Touch swipe
    var startX = 0;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(current + 1);
        else goTo(current - 1);
      }
    });
  });

});
