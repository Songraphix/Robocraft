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

  // ===== GSAP SCROLL REVEAL =====
  if(typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Simple reveal class fallback if JS loads late
    document.querySelectorAll('.reveal, .reveal-right').forEach(el => el.classList.add('visible'));
    
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

  // ===== HERO MOUSE PARALLAX (Robo 3D feel) =====
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      // Slight 3D rotation based on mouse
      heroImg.style.transform = `translateY(var(--float-y, 0px)) rotate(${dx * 5}deg) rotateX(${-dy * 10}deg) rotateY(${dx * 10}deg)`;
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

  // ===== REGISTRATION FORM =====
  const form = document.getElementById('reg-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('parent-name').value.trim();
      const age = document.getElementById('kid-age').value;
      const program = document.getElementById('program').value;
      
      if (!name || !age || !program) {
        alert('Please fill in all fields before submitting. 🚀');
        return;
      }
      
      const msg = encodeURIComponent(
        `Hi Robocraft Club! 🤖\n\nI'd like to register my child for the June Bootcamp.\n\n` +
        `Parent/Guardian: ${name}\nChild's Age: ${age} years\nProgram: ${program}\n\n` +
        `Please confirm availability and payment details. Thank you! ✨`
      );
      window.open(`https://wa.me/233540782754?text=${msg}`, '_blank');
    });
  }

  // ===== CONTINUOUS FLOAT VAR UPDATE (for CSS) =====
  let floatY = 0;
  let floatFrame = 0;
  function updateFloat() {
    floatFrame += 0.02;
    floatY = Math.sin(floatFrame) * 15;
    if (heroImg) heroImg.style.setProperty('--float-y', floatY + 'px');
    requestAnimationFrame(updateFloat);
  }
  requestAnimationFrame(updateFloat);

});
