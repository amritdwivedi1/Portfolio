/* ==========================================================================
   AMRIT RAJ PORTFOLIO — MAIN JAVASCRIPT LOGIC & INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveals();
  initTerminalBootSequence();
  initCardTiltEffect();
  initSkillBarAnimations();
  initParticleCanvas();
  initMobileMenu();
  initActiveNavLink();
});

/* 1. Scroll Progress Bar */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* 2. Scroll-Driven Section & Element Reveals */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* 3. Hero Terminal Boot Sequence */
function initTerminalBootSequence() {
  const termBody = document.getElementById('terminal-boot-body');
  if (!termBody) return;

  const bootLines = [
    { prompt: '$ whoami', response: 'amrit_raj — MCA (Cyber Security), SGT University' },
    { prompt: '$ status --current', response: 'learning: ethical hacking, PostgreSQL, advanced Python' },
    { prompt: '$ access --internship', response: 'granted — ready to contribute' }
  ];

  let lineIdx = 0;

  function typeLine() {
    if (lineIdx >= bootLines.length) {
      // Append blinking cursor prompt line at the end
      const finalLine = document.createElement('div');
      finalLine.className = 'term-line revealed';
      finalLine.innerHTML = `<span class="term-prompt">$</span> <span class="cursor-blink"></span>`;
      termBody.appendChild(finalLine);
      return;
    }

    const item = bootLines[lineIdx];
    const lineEl = document.createElement('div');
    lineEl.className = 'term-line';
    lineEl.innerHTML = `
      <div><span class="term-prompt">${item.prompt.split(' ')[0]}</span> <span class="term-cmd">${item.prompt.substring(2)}</span></div>
      <div class="term-res">${item.response}</div>
    `;
    termBody.appendChild(lineEl);

    setTimeout(() => {
      lineEl.classList.add('revealed');
      lineIdx++;
      setTimeout(typeLine, 600);
    }, 100);
  }

  // Clear existing static placeholder and start typing
  termBody.innerHTML = '';
  setTimeout(typeLine, 400);
}

/* 4. Cursor-Aware 3D Tilt & Soft Glow Micro-interactions */
function initCardTiltEffect() {
  const cards = document.querySelectorAll('.card-tilt');
  
  // Check if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle ~ 6deg
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 5. Skill Proficiency Bars Animation & 4-Segment Signals */
function initSkillBarAnimations() {
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level') || '0%';
        bar.style.width = level;

        // Animate signal segments if present
        const parent = bar.closest('.skill-item');
        if (parent) {
          const signalContainer = parent.querySelector('.skill-signal-bars');
          if (signalContainer) {
            const numericPct = parseInt(level, 10);
            const activeSegments = Math.round((numericPct / 100) * 4);
            const segments = signalContainer.querySelectorAll('.signal-segment');
            segments.forEach((seg, idx) => {
              if (idx < activeSegments) {
                setTimeout(() => seg.classList.add('active'), idx * 150);
              }
            });
          }
        }
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* 6. Hero Background Low-Opacity Particle Canvas Drift */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(Math.floor(width / 30), 40);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#E8A33D';
    ctx.strokeStyle = 'rgba(79, 179, 169, 0.15)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    render();
  }
}

/* 7. Mobile Navigation Toggle */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* 8. Active Nav Link Scrollspy */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href*="#"]');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(`#${current}`)) {
        link.classList.add('active');
      }
    });
  });
}
