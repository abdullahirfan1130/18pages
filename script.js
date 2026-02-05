/* 18-page SPA + animations, cursor parallax, confetti, audio, typewriter, small micro-interactions.
   Make sure assets/delilah.jpg and assets/music.mp3 exist.
*/

const TOTAL = 18;
const pagesContainer = document.getElementById('pages');
const pagerScroll = document.getElementById('pager-scroll');
const audio = document.getElementById('bg-audio');
const confettiCanvas = document.getElementById('confetti-canvas');
let confettiActive = false;

// --- Generate pager buttons (1..18) ---
for(let i=1;i<=TOTAL;i++){
  const b = document.createElement('button');
  b.className = 'pager-btn';
  b.textContent = i;
  b.dataset.page = `page-${i}`;
  if(i===1) b.classList.add('active');
  pagerScroll.appendChild(b);
  b.addEventListener('click', ()=> showPage(`page-${i}`, true));
  b.addEventListener('mouseenter', ()=> previewTitle(i));
}

function previewTitle(i){
  // small tooltip via title attribute (HTML already shows)
  // Could add live preview — but keep simple
}

// --- Show page function with transition ---
function showPage(id, focus){
  const pages = document.querySelectorAll('.page');
  pages.forEach(p=>{
    if(p.id === id){
      p.classList.add('show');
      p.setAttribute('aria-hidden','false');
    } else {
      p.classList.remove('show');
      p.setAttribute('aria-hidden','true');
    }
  });
  // highlight pager button
  document.querySelectorAll('.pager-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.page === id);
  });
  // small animation for incoming
  const el = document.getElementById(id);
  if(el){
    el.animate([{opacity:0, transform:'translateY(12px) scale(.997)'},{opacity:1, transform:'translateY(0) scale(1)'}],
      {duration:420, easing:'cubic-bezier(.2,.9,.3,1)'});
  }
  if(focus) window.scrollTo({top:0, behavior:'smooth'});
}

// default show home
showPage('page-1');

// navigation from internal buttons
document.querySelectorAll('[data-goto]').forEach(btn=>{
  btn.addEventListener('click', ()=> showPage('page-' + btn.dataset.goto));
});

// open letter button goes to page 18
document.getElementById('open-letter').addEventListener('click', ()=> showPage('page-18', true));

// home button
document.getElementById('home-btn').addEventListener('click', ()=> showPage('page-1', true));

// --- Music controls ---
const toggleMusicBtn = document.getElementById('toggle-music');
toggleMusicBtn.addEventListener('click', ()=> {
  if(audio.paused){ audio.play(); toggleMusicBtn.textContent='🔈' }
  else { audio.pause(); toggleMusicBtn.textContent='🔇' }
});
document.getElementById('play-btn')?.addEventListener('click', ()=> { audio.play(); toggleMusicBtn.textContent='🔈' });

// hint: browsers require user gesture to play audio; clicks will usually allow it

// --- cursor parallax background ---
const layers = document.querySelectorAll('.bg-layer');
document.addEventListener('mousemove', (e)=>{
  const cx = (e.clientX / window.innerWidth - 0.5);
  const cy = (e.clientY / window.innerHeight - 0.5);
  layers.forEach((ly, idx)=>{
    const f = (idx+1) * 8;
    ly.style.transform = `translate3d(${cx * f}px, ${cy * f}px, 0) scale(${1 + idx * 0.02})`;
  });
});

// --- small interactions: page specific ---
// Page 5 chibi wiggle
const chibi5 = document.getElementById('chibi-5');
if(chibi5){
  chibi5.addEventListener('mouseenter', ()=> {
    chibi5.animate([{transform:'translateY(0)'},{transform:'translateY(-10px) rotate(-6deg)'},{transform:'translateY(0)'}],
      {duration:600, easing:'ease-out'});
  });
}

// Page 6 cookie click
document.getElementById('cookie-btn-6')?.addEventListener('click', function(){
  this.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}], {duration:320});
  alert('Cookie collected! You earn a virtual hug 🤗');
});

// Page 7 Delilah hover shimmer
document.querySelectorAll('.mini-dog').forEach(img=>{
  img.addEventListener('mouseenter', ()=> img.style.transform='scale(1.06) rotate(-2deg)');
  img.addEventListener('mouseleave', ()=> img.style.transform='scale(1) rotate(0deg)');
});

// Page 8 fold button
document.querySelectorAll('[data-fold]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.disabled = true;
    btn.textContent = 'Unfolding...';
    setTimeout(()=> { btn.textContent = 'Done ✨'; }, 900);
  });
});

// Page 11 sparkle
document.getElementById('sparkle-11')?.addEventListener('click', ()=>{
  burstConfetti(40);
});

// Page 13 quiz pills
document.querySelectorAll('.quiz .pill').forEach(p=>{
  p.addEventListener('click', ()=> {
    document.querySelectorAll('.quiz .pill').forEach(x=> x.style.opacity=0.5);
    p.style.background = 'linear-gradient(90deg,#8ed0ff,#6ed0ff)';
    p.style.color = '#021022';
    p.style.opacity = 1;
    setTimeout(()=> alert(`Nice choice: ${p.textContent}!`), 250);
  });
});

// Page 6-9 cookie counters and small features could be expanded similarly

// --- Typewriter letter in page 18 ---
const letterEl = document.getElementById('letter');
const letterText = `Dear Kimmy 💙

Happy 18th Birthday! Turning eighteen is a kind of magic — a door opening to new adventures, bigger dreams and braver choices.
You have always been brave with your sketches, kind with your laughter, and fierce with your loyalty.
Today is the day we celebrate you: the artist, the friend, the cookie-sharer, the person who makes small moments feel enormous.

May this year give you the courage to chase the biggest dreams, the quiet hours to sketch whatever’s on your mind, and countless cookie moments with Delilah.

Keep shining. Keep drawing. Keep being beautifully you.

With all my heart,
— Abdullah ✨
`;

function startTypewriter(){
  letterEl.textContent = '';
  let i = 0;
  function step(){
    if(i <= letterText.length){
      letterEl.textContent = letterText.slice(0, i++);
      const delay = 18 + Math.random()*20;
      setTimeout(step, delay);
    }
  }
  step();
}

// When user opens page 18, start typewriter
const page18 = document.getElementById('page-18');
new MutationObserver((mut)=>{
  if(page18.classList.contains('show')) startTypewriter();
}).observe(page18, {attributes:true});

// download letter
document.getElementById('download-btn')?.addEventListener('click', ()=>{
  const blob = new Blob([letterText], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Happy_18th_Kimmy.txt';
  a.click();
  URL.revokeObjectURL(a.href);
});

// confetti system (simple)
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

function rand(min,max){return Math.random()*(max-min)+min}

function spawnConfetti(n=80){
  for(let i=0;i<n;i++){
    confettiParticles.push({
      x: rand(0, confettiCanvas.width),
      y: rand(-200, -20),
      vx: rand(-1.5,1.5),
      vy: rand(1,4),
      size: rand(6,12),
      color: `hsl(${rand(190,220)},80%,60%)`,
      rot: rand(0,360),
      spin: rand(-0.2,0.4)
    });
  }
  if(!confettiActive) runConfetti();
}

function runConfetti(){
  confettiActive = true;
  let frames = 0;
  function loop(){
    frames++;
    ctx.clearRect(0,0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p, idx)=>{
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.rot += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
      if(p.y > confettiCanvas.height + 50) confettiParticles.splice(idx,1);
    });
    if(confettiParticles.length > 0 && frames < 600){
      requestAnimationFrame(loop);
    } else {
      confettiActive = false;
      ctx.clearRect(0,0, confettiCanvas.width, confettiCanvas.height);
    }
  }
  loop();
}

function burstConfetti(n=100){ spawnConfetti(n); }

// wire confetti button in final page
document.getElementById('confetti-btn')?.addEventListener('click', ()=> {
  burstConfetti(160);
  audio.play();
});

// small burst when clicking celebrate in page 1 secret
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('click', ()=> {
    b.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}], {duration:240});
  });
});

// resize confetti canvas
window.addEventListener('resize', ()=> {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// keyboard: left/right to move pages
document.addEventListener('keydown', (e)=>{
  const active = document.querySelector('.pager-btn.active');
  if(!active) return;
  const idx = Array.from(document.querySelectorAll('.pager-btn')).indexOf(active);
  if(e.key === 'ArrowRight' && idx < TOTAL-1) document.querySelectorAll('.pager-btn')[idx+1].click();
  if(e.key === 'ArrowLeft' && idx > 0) document.querySelectorAll('.pager-btn')[idx-1].click();
});

// gentle floating animation for some pages
setInterval(()=> {
  document.querySelectorAll('.page.show .chibi, .page.show .mini-dog').forEach(el=>{
    if(el) el.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}], {duration:1400, iterations:1});
  });
}, 3200);

// small hover effects for pager
document.querySelectorAll('.pager-btn').forEach(btn=>{
  btn.addEventListener('mouseenter', ()=> btn.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'}], {duration:220}));
});

// initial tiny glow on brand
document.querySelector('.brand').animate([{opacity:0.85},{opacity:1}], {duration:800, easing:'ease-in-out'});

// Optional: auto-open page 18 if URL hash contains #final
if(location.hash === '#final') showPage('page-18', true);
