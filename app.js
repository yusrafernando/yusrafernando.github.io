// Interactive behaviors: menu toggle, smooth scroll, form handling, simple animations
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

menuToggle?.addEventListener('click', ()=>{
  navList.classList.toggle('show');
});

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav
      navList.classList.remove('show');
    }
  });
});

// Simple counter animation for stats
function animateCount(id, start, end, duration){
  const el = document.getElementById(id);
  if(!el) return;
  let startTime = null;
  const step = (timestamp)=>{
    if(!startTime) startTime = timestamp;
    const progress = Math.min((timestamp-startTime)/duration,1);
    const value = Math.floor(progress*(end-start)+start);
    el.textContent = value.toString();
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Trigger animations when visible
function onVisible(entry){
  if(entry.isIntersecting){
    animateCount('years', 0, 12, 900);
    animateCount('papers', 0, 24, 1100);
    animateCount('students', 0, 1200, 1300);
    obs.disconnect();
  }
}

const obs = new IntersectionObserver((entries)=>entries.forEach(onVisible),{threshold:.3});
const hero = document.querySelector('#hero');
if(hero) obs.observe(hero);

// Contact form: basic client-side validation and fake send
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const clearBtn = document.getElementById('clearBtn');

clearBtn?.addEventListener('click', ()=>{
  contactForm.reset();
  formStatus.textContent = '';
});

contactForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if(!name || !email || !message){
    formStatus.textContent = 'Mohon lengkapi semua bidang.';
    return;
  }
  // naive email check
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
    formStatus.textContent = 'Format email tidak valid.';
    return;
  }

  formStatus.textContent = 'Mengirim pesan...';
  // simulate send
  setTimeout(()=>{
    formStatus.textContent = 'Pesan berhasil dikirim. Terima kasih!';
    contactForm.reset();
  },900);
});

// Accessibility: close nav on escape
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') navList.classList.remove('show');
});
