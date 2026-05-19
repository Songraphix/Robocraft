/* main.js — Robocraft Club interactions (GSAP + Vanilla) */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // ===== SCROLL REVEAL — IntersectionObserver =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-right').forEach(el => revealObserver.observe(el));

  // Stagger cards and value cards on scroll entry
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll(
          '.program-card, .value-card, .polaroid, .principle-step'
        );
        siblings.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.program-card, .value-card, .polaroid, .principle-step').forEach((el, i) => {
    if (i === 0) staggerObserver.observe(el); // trigger on first child
    el.classList.add('reveal');
  });

  // ===== COUNTING ANIMATION =====
  function animateCount(el, from, to, suffix, prefix, duration) {
    const range = to - from;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(from + range * eased);
      el.textContent = (prefix || '') + value + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const to     = parseInt(el.dataset.countTo);
        const suffix  = el.dataset.suffix  || '';
        const prefix  = el.dataset.prefix  || '';
        // Duration scales with size: 500+ takes longer than 3
        const dur = to >= 100 ? 2000 : to >= 10 ? 1200 : 800;
        animateCount(el, 0, to, suffix, prefix, dur);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count-to]').forEach(el => countObserver.observe(el));

  // ===== GSAP ENHANCEMENTS (if available) =====
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate Cards
    gsap.from('.program-card', {
      scrollTrigger: {
        trigger: '#programs',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.5)',
      clearProps: 'all'
    });

    // Animate Gallery Polaroids
    gsap.from('.polaroid', {
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 70%'
      },
      scale: 0.8,
      rotation: () => gsap.utils.random(-15, 15),
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.7)',
      clearProps: 'all'
    });
  }

  // ===== HERO MOUSE PARALLAX (wrapper only — keeps CSS float animation intact) =====
  const heroImgWrap = document.querySelector('.hero-image-wrap');
  const isMobile = () => window.innerWidth <= 768;

  if (heroImgWrap) {
    document.addEventListener('mousemove', (e) => {
      if (isMobile()) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      // Apply tilt to WRAPPER, not the img — CSS float animation on img is untouched
      heroImgWrap.style.transform = `perspective(1000px) rotateX(${-dy * 3}deg) rotateY(${dx * 4}deg)`;
      heroImgWrap.style.transition = 'transform 0.15s ease-out';
    });
    document.addEventListener('mouseleave', () => {
      heroImgWrap.style.transform = '';
    });
  }

  // ===== INTERACTIVE WINKING ROBOT (Tracks Mouse + Slow Rotate) =====
  const interactiveRobo = document.getElementById('robo-interactive');
  const roboZone = document.getElementById('robo-interactive-zone');
  
  let targetRoboX = 0;
  let targetRoboY = 0;
  let currentRoboX = 0;
  let currentRoboY = 0;
  let autoRotateAngle = 0;

  if(interactiveRobo && roboZone) {
    document.addEventListener('mousemove', (e) => {
      const rect = roboZone.getBoundingClientRect();
      const roboCenterX = rect.left + rect.width / 2;
      const roboCenterY = rect.top + rect.height / 2;
      
      const angleX = (e.clientY - roboCenterY) / 30; 
      const angleY = (e.clientX - roboCenterX) / 30; 
      
      targetRoboX = Math.max(-20, Math.min(20, angleX));
      targetRoboY = Math.max(-25, Math.min(25, angleY));
    });
    
    document.addEventListener('mouseleave', () => {
      targetRoboX = 0;
      targetRoboY = 0;
    });

    function animateMasterRobo() {
      // Smoothly interpolate towards target mouse position
      currentRoboX += (targetRoboX - currentRoboX) * 0.1;
      currentRoboY += (targetRoboY - currentRoboY) * 0.1;
      
      // Add continuous slow rotation
      autoRotateAngle += 0.5;
      
      // Combine mouse tracking with slow continuous rotation around Y axis
      const combinedY = currentRoboY + Math.sin(autoRotateAngle * Math.PI / 180) * 15;
      
      interactiveRobo.style.transform = `rotateX(${-currentRoboX}deg) rotateY(${combinedY}deg) translateZ(20px)`;
      requestAnimationFrame(animateMasterRobo);
    }
    animateMasterRobo();
  }

  // Removed Robo 1.png guide as per request to avoid blocking UI

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const isOpen = item.classList.contains('open');
      
      // Close others
      document.querySelectorAll('.acc-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
      });
      
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== REGISTRATION FORM → GOOGLE SHEETS =====
  // IMPORTANT: Paste your deployed Apps Script Web App URL below.
  // Steps: Google Sheet → Extensions → Apps Script → Deploy → New Deployment
  //        Execute as: Me | Who has access: Anyone → Copy the URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdtXcxRGa3g1FohkgFhytxoqYJAm5EYLVXk0cz-XJedElBeHB6itZK4BKal40tTxiG1Q/exec';

  const form = document.getElementById('reg-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const parentName   = document.getElementById('parent-name').value.trim();
      const childName    = document.getElementById('child-name').value.trim();
      const kidAge       = document.getElementById('kid-age').value;
      const parentNumber = document.getElementById('parent-number').value.trim();
      const address      = document.getElementById('address').value.trim();
      const email        = document.getElementById('email').value.trim(); // optional

      if (!parentName || !childName || !kidAge || !parentNumber || !address) {
        showFormMsg('Please fill in all required fields before submitting. 🚀', 'error');
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting… ⏳';

      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' }, // text/plain avoids CORS preflight
          body: JSON.stringify({ parentName, childName, kidAge, parentNumber, address, email }),
        });

        const result = await response.json();

        if (result.result === 'success') {
          form.reset();
          submitBtn.textContent = '✅ Spot Secured!';
          showFormMsg(`Thanks, ${parentName}! 🎉 ${childName}'s spot is reserved. We'll be in touch soon.`, 'success');
        } else {
          throw new Error(result.message || 'Unknown error');
        }

      } catch (err) {
        // Fallback — open WhatsApp if sheet submission fails
        console.error('Sheet submission failed:', err);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Secure Your Child\'s Spot Now →';
        showFormMsg('Couldn\'t save automatically — opening WhatsApp as backup… 📱', 'error');

        setTimeout(() => {
          const msg = encodeURIComponent(
            `Hi Robocraft Club! 🤖\n\nI'd like to register my child.\n\n` +
            `Parent: ${parentName}\nChild: ${childName}\nAge: ${kidAge} years\n` +
            `Phone: ${parentNumber}\nLocation: ${address}` +
            (email ? `\nEmail: ${email}` : '') +
            `\n\nPlease confirm availability. Thank you! ✨`
          );
          window.open(`https://wa.me/233540782754?text=${msg}`, '_blank');
        }, 1500);
      }
    });
  }

  function showFormMsg(msg, type) {
    let el = document.getElementById('form-status-msg');
    if (!el) {
      el = document.createElement('p');
      el.id = 'form-status-msg';
      el.style.cssText = `
        margin-top: 1rem; padding: 1rem 1.2rem; border-radius: 1rem;
        font-family: var(--font-head); font-weight: 700; font-size: 1rem;
        text-align: center; border: 2px solid;
      `;
      submitBtn.parentElement.appendChild(el);
    }
    el.textContent = msg;
    el.style.background  = type === 'success' ? 'rgba(11,217,158,0.1)' : 'rgba(242,82,82,0.1)';
    el.style.color        = type === 'success' ? '#0a7a55' : '#c0392b';
    el.style.borderColor  = type === 'success' ? 'rgba(11,217,158,0.4)' : 'rgba(242,82,82,0.4)';
  }


  // ===== CONTINUOUS FLOAT VAR UPDATE =====
  // Removed — hero float is now handled by CSS animation (floatStraight keyframe)

});
