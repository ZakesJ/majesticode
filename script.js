// Contact form simulation
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (name && email && message) {
    formMsg.textContent = "🚀 Message sent successfully!";
    formMsg.classList.remove("text-red-500");
    formMsg.classList.add("text-green-500");
    contactForm.reset();
  } else {
    formMsg.textContent = "❌ Please fill out all fields.";
    formMsg.classList.remove("text-green-500");
    formMsg.classList.add("text-red-500");
  }
});

// Theme toggle
const toggleBtn = document.getElementById('themeToggle');
const bulb = document.getElementById('bulbIcon');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  bulb.classList.toggle('text-yellow-500');
});

// Typing effect
const typedText = document.getElementById('typed-text');
const phrases = [
  "+ Front-End Developer.",
  "+ Creative Digital Designer.",
  "+ Web Design Enthusiast."
];
let phraseIndex = 0;

function typePhrase(phrase) {
  let charIndex = 0;
  typedText.textContent = "";

  function typeChar() {
    if (charIndex < phrase.length) {
      typedText.textContent += phrase.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 50);
    } else {
      setTimeout(deletePhrase, 1500);
    }
  }

  typeChar();
}

function deletePhrase() {
  let current = typedText.textContent;
  function deleteChar() {
    if (current.length > 0) {
      current = current.slice(0, -1);
      typedText.textContent = current;
      setTimeout(deleteChar, 25);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typePhrase(phrases[phraseIndex]);
    }
  }
  deleteChar();
}

typePhrase(phrases[phraseIndex]);

// Hero animations
gsap.from('#hero h2', {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power3.out"
});

gsap.from('#hero p', {
  duration: 1.5,
  delay: 0.5,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});

// Section scroll animation
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});

// Glitter effect in hero
const hero = document.getElementById('hero');
const glitterLayer = document.createElement('div');
glitterLayer.classList.add('glitter-layer');
hero.appendChild(glitterLayer);

for (let i = 0; i < 100; i++) {
  const dot = document.createElement('div');
  dot.classList.add('glitter-dot');
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.animationDelay = `${Math.random() * 3}s`;
  glitterLayer.appendChild(dot);
}

// Spaceship animation
const spaceship = document.getElementById("spaceship");
function animateSpaceship() {
  const maxX = hero.clientWidth - spaceship.clientWidth;
  const maxY = hero.clientHeight - spaceship.clientHeight;

  gsap.to(spaceship, {
    duration: 2.5,
    top: Math.random() * maxY,
    left: Math.random() * maxX,
    rotation: Math.random() * 360,
    ease: "power2.inOut"
  });
}

setInterval(animateSpaceship, 3000);
window.addEventListener('load', () => {
  spaceship.style.top = `${hero.clientHeight / 2}px`;
  spaceship.style.left = `${hero.clientWidth / 2}px`;
  animateSpaceship();
});

// Contact animation
gsap.from("#contact .max-w-3xl", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out"
});

// Intersection animation
const contactSection = document.querySelector("#contact .animate-fade-in-up");
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    contactSection.classList.add("animate-fade-in-up");
    observer.unobserve(contactSection);
  }
}, { threshold: 0.3 });
observer.observe(contactSection);

// Input particle effect
const wrappers = document.querySelectorAll('.input-wrapper');
wrappers.forEach(wrapper => {
  wrapper.addEventListener('mousemove', e => {
    const particle = document.createElement('div');
    particle.className = 'input-particle';
    const rect = wrapper.getBoundingClientRect();
    particle.style.left = `${e.clientX - rect.left}px`;
    particle.style.top = `${e.clientY - rect.top}px`;
    wrapper.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  });
});

// Particle system in hero only
const particleConfig = {
  particles: [],
  numParticles: 50,
  maxConnections: 5,
  connectionThreshold: 150,
  baseSpeed: 0.2,
  canvas: null,
  ctx: null,
  width: 0,
  height: 0,
  density: 1,
  hoverArea: { x: null, y: null, active: false }
};

function initParticles() {
  particleConfig.canvas = document.createElement('canvas');
  Object.assign(particleConfig.canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
    pointerEvents: 'none',
    width: '100%',
    height: '100%'
  });

  hero.appendChild(particleConfig.canvas);
  particleConfig.ctx = particleConfig.canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  createParticles();
  animateParticles();
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.getElementById('data-refresh-btn').addEventListener('click', handleDataRefresh);
}

function resizeCanvas() {
  particleConfig.width = hero.clientWidth;
  particleConfig.height = hero.clientHeight;
  particleConfig.canvas.width = particleConfig.width;
  particleConfig.canvas.height = particleConfig.height;
}

function createParticles() {
  particleConfig.particles = [];
  for (let i = 0; i < particleConfig.numParticles; i++) {
    particleConfig.particles.push({
      x: Math.random() * particleConfig.width,
      y: Math.random() * particleConfig.height,
      radius: Math.random() * 2 + 1,
      color: `rgba(120, 180, 255, ${Math.random() * 0.2 + 0.1})`,
      speedX: (Math.random() - 0.5) * particleConfig.baseSpeed,
      speedY: (Math.random() - 0.5) * particleConfig.baseSpeed,
      connections: 0
    });
  }
}

function animateParticles() {
  particleConfig.ctx.clearRect(0, 0, particleConfig.width, particleConfig.height);
  updateAndDrawParticles();
  requestAnimationFrame(animateParticles);
}

function updateAndDrawParticles() {
  const pList = particleConfig.particles;
  const ctx = particleConfig.ctx;
  pList.forEach(p => {
    p.connections = 0;
    let speedMultiplier = 1;
    if (particleConfig.hoverArea.active) {
      const dx = p.x - particleConfig.hoverArea.x;
      const dy = p.y - particleConfig.hoverArea.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) speedMultiplier = particleConfig.density * (1 + (100 - dist) / 100);
    }
    p.x += p.speedX * speedMultiplier;
    p.y += p.speedY * speedMultiplier;
    if (p.x < 0 || p.x > particleConfig.width) p.speedX *= -1;
    if (p.y < 0 || p.y > particleConfig.height) p.speedY *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  ctx.lineWidth = 0.5;
  for (let i = 0; i < pList.length; i++) {
    for (let j = i + 1; j < pList.length; j++) {
      const a = pList[i];
      const b = pList[j];
      if (a.connections >= particleConfig.maxConnections || b.connections >= particleConfig.maxConnections) continue;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < particleConfig.connectionThreshold) {
        const opacity = 1 - (dist / particleConfig.connectionThreshold);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100, 170, 255, ${opacity * 0.1})`;
        ctx.stroke();
        a.connections++;
        b.connections++;
      }
    }
  }
}

function handleMouseMove(e) {
  const rect = hero.getBoundingClientRect();
  particleConfig.hoverArea.x = e.clientX - rect.left;
  particleConfig.hoverArea.y = e.clientY - rect.top;
  particleConfig.hoverArea.active = true;
}

function handleMouseLeave() {
  particleConfig.hoverArea.active = false;
}

function handleDataRefresh() {
  particleConfig.density = 3;
  const refreshBtn = document.getElementById('data-refresh-btn');
  refreshBtn.querySelector('i').classList.add('pulse-animation');
  updateChartData();
  setTimeout(() => {
    particleConfig.density = 1;
    refreshBtn.querySelector('i').classList.remove('pulse-animation');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
});
