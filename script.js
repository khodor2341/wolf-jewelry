/* =============================================
   WOLF JEWELRY — script.js
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ──────────────────────────
  const cursor     = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursor.className     = 'cursor';
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth ring follow
  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor expand on hover
  const hoverTargets = document.querySelectorAll('a, button, .product-card, .collection-card, .insta-tile');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px';
      cursor.style.height = '18px';
      cursorRing.style.width  = '52px';
      cursorRing.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });


  // ─── STICKY HEADER SHADOW ───────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  // ─── MOBILE MENU TOGGLE ─────────────────────
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });


  // ─── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ─── WISHLIST TOGGLE ────────────────────────
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isWished = btn.textContent.trim() === '♥';
      btn.textContent = isWished ? '♡' : '♥';
      btn.style.color = isWished ? '' : 'var(--bronze)';
      btn.style.opacity = '1';

      // Pulse animation
      btn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.4)' },
        { transform: 'scale(1)' }
      ], { duration: 300, easing: 'ease-out' });
    });
  });


  // ─── NEWSLETTER FORM ────────────────────────
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    const input  = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');

    button.addEventListener('click', () => {
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        input.style.borderColor = '#c0392b';
        input.focus();
        setTimeout(() => {
          input.style.borderColor = '';
        }, 1600);
        return;
      }
      button.textContent = 'Subscribed ✓';
      button.style.background = 'var(--bronze)';
      button.style.borderColor = 'var(--bronze)';
      button.disabled = true;
      input.disabled  = true;
      input.value     = '';
      input.placeholder = 'You\'re on the list!';
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') button.click();
    });
  }


  // ─── SMOOTH ANCHOR SCROLL ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ─── PARALLAX HERO ──────────────────────────
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }


  // ─── MARQUEE PAUSE ON HOVER ─────────────────
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    const marqueeEl = document.querySelector('.marquee');
    marqueeEl.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeEl.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }


  // ─── PRODUCT CARD ADD TO CART FEEDBACK ──────
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      // Don't trigger on wishlist clicks
      if (e.target.classList.contains('product-card__wishlist')) return;

      const price = card.querySelector('.product-card__price');
      if (!price) return;

      // Brief visual feedback
      card.style.outline = '2px solid var(--bronze)';
      card.style.outlineOffset = '4px';
      setTimeout(() => {
        card.style.outline = '';
        card.style.outlineOffset = '';
      }, 600);
    });
  });


  // ─── COLLECTION CARDS TILT EFFECT ───────────
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ─── LAZY LOAD PLACEHOLDER IMAGES ───────────
  // (Ready for real images — just replace .product-card__placeholder
  //  with <img> tags and this observer will handle lazy loading)
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

});