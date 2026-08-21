/* ============================================================
   BIRTHDAY CONFIG — edit everything here
   ============================================================ */
const birthdayConfig = {
  name: "MINH ANH",
  nickname: "Minh Anh",
  message:
`Chúc cậu tuổi mới thật nhiều niềm vui,
nhiều tiếng cười,
nhiều điều bất ngờ,

và quan trọng nhất...

hãy luôn là chính cậu,
một phiên bản thật tuyệt vời của mình.`,
  giftMessage:
    "Cảm ơn cậu vì đã luôn ở đó. Mong năm mới của cậu ngập tràn những điều tuyệt vời như chính con người cậu vậy. 🎁❤️",
  music: "assets/music.mp3",
  photos: [
    { src: "assets/photo1.jpg", date: "SPRING, 2021", caption: "Ngày đầu gặp nhau" },
    { src: "assets/photo2.jpg", date: "SUMMER, 2022", caption: "Chuyến đi biển đáng nhớ" },
    { src: "assets/photo3.jpg", date: "AUTUMN, 2022", caption: "Buổi chiều cà phê" },
    { src: "assets/photo4.jpg", date: "WINTER, 2023", caption: "Giáng sinh cùng nhau" },
    { src: "assets/photo5.jpg", date: "SPRING, 2024", caption: "Sinh nhật năm ngoái" },
    { src: "assets/photo6.jpg", date: "TODAY", caption: "Và bây giờ, một chương mới" },
  ],
};

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   FILL CONFIG INTO DOM
   ============================================================ */
document.getElementById("name-slot").textContent = birthdayConfig.name;
document.getElementById("fw-name").textContent = birthdayConfig.name;
document.getElementById("final-name").textContent = birthdayConfig.name;
document.getElementById("final-made-name").textContent = birthdayConfig.nickname;
document.getElementById("gift-message").textContent = birthdayConfig.giftMessage;

/* ============================================================
   LOADING SCREEN
   ============================================================ */
(function loadingSequence(){
  const fill = document.getElementById("loading-bar-fill");
  const text = document.getElementById("loading-text");
  const ready = document.getElementById("loading-ready");
  const screen = document.getElementById("loading-screen");
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12 + 4;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      text.style.display = "none";
      ready.style.display = "block";
      gsap.to(ready, { opacity: 1, duration: 0.6 });
      setTimeout(() => {
        screen.classList.add("hidden");
        playIntroTimeline();
      }, 700);
    }
    fill.style.width = p + "%";
  }, 160);
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");
const isTouch = window.matchMedia("(hover: none)").matches;

if (!isTouch) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  (function animateRing(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll("button, .memory-card, .dot, .music-toggle").forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
  });
  // delegate for dynamically added cards
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".memory-card") || e.target.closest("button")) {
      cursorRing.classList.add("hovering");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".memory-card") || e.target.closest("button")) {
      cursorRing.classList.remove("hovering");
    }
  });
}

/* ============================================================
   MUSIC
   ============================================================ */
const musicBtn = document.getElementById("music-toggle");
const musicAudio = document.getElementById("bg-music");
let musicPlaying = false;
function tryPlayMusic(){
  musicAudio.volume = 0.5;
  musicAudio.play().then(() => {
    musicPlaying = true;
    musicBtn.classList.add("playing");
  }).catch(() => { /* autoplay blocked, wait for user gesture */ });
}
musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    musicAudio.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
  } else {
    tryPlayMusic();
  }
});

/* ============================================================
   THREE.JS AMBIENT 3D BACKGROUND
   ============================================================ */
const bgCanvas = document.getElementById("bg-canvas");
const bgScene = new THREE.Scene();
const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
bgCamera.position.z = 14;

const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: true, alpha: true });
bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
bgRenderer.setSize(window.innerWidth, window.innerHeight);

const isMobile = window.innerWidth < 720;
const PARTICLE_COUNT = isMobile ? 500 : 1600;

const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(PARTICLE_COUNT * 3);
const starColors = new Float32Array(PARTICLE_COUNT * 3);
const palette = [
  new THREE.Color(0xffd27a),
  new THREE.Color(0xff9ecb),
  new THREE.Color(0xa78bff),
  new THREE.Color(0xffffff),
];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  starPositions[i*3+0] = (Math.random() - 0.5) * 40;
  starPositions[i*3+1] = (Math.random() - 0.5) * 40;
  starPositions[i*3+2] = (Math.random() - 0.5) * 40;
  const c = palette[Math.floor(Math.random() * palette.length)];
  starColors[i*3+0] = c.r; starColors[i*3+1] = c.g; starColors[i*3+2] = c.b;
}
starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

const starMat = new THREE.PointsMaterial({
  size: 0.06,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const starField = new THREE.Points(starGeo, starMat);
bgScene.add(starField);

// a few soft glowing spheres for depth (bokeh feel)
const glowGroup = new THREE.Group();
const glowCount = isMobile ? 4 : 9;
for (let i = 0; i < glowCount; i++) {
  const glowGeo = new THREE.SphereGeometry(Math.random() * 0.6 + 0.3, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: palette[Math.floor(Math.random() * palette.length)],
    transparent: true,
    opacity: 0.12,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set((Math.random()-0.5)*20, (Math.random()-0.5)*14, (Math.random()-0.5)*10 - 5);
  glowGroup.add(glow);
}
bgScene.add(glowGroup);

let targetRotX = 0, targetRotY = 0;
window.addEventListener("mousemove", (e) => {
  targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.4;
  targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.4;
});
window.addEventListener("touchmove", (e) => {
  if (!e.touches[0]) return;
  targetRotY = (e.touches[0].clientX / window.innerWidth - 0.5) * 0.3;
  targetRotX = (e.touches[0].clientY / window.innerHeight - 0.5) * 0.3;
}, { passive: true });

let bgTime = 0;
let bgTabVisible = true;
document.addEventListener("visibilitychange", () => { bgTabVisible = !document.hidden; });

function animateBg(){
  requestAnimationFrame(animateBg);
  if (!bgTabVisible) return;
  bgTime += 0.0015;
  starField.rotation.y += (targetRotY * 0.4 - starField.rotation.y) * 0.02;
  starField.rotation.x += (targetRotX * 0.4 - starField.rotation.x) * 0.02;
  starField.rotation.z = Math.sin(bgTime) * 0.02;
  glowGroup.children.forEach((g, i) => {
    g.position.y += Math.sin(bgTime * 2 + i) * 0.002;
  });
  bgCamera.position.x += (targetRotY * 1.2 - bgCamera.position.x) * 0.02;
  bgCamera.position.y += (-targetRotX * 1.2 - bgCamera.position.y) * 0.02;
  bgCamera.lookAt(0,0,0);
  bgRenderer.render(bgScene, bgCamera);
}
animateBg();

window.addEventListener("resize", () => {
  bgCamera.aspect = window.innerWidth / window.innerHeight;
  bgCamera.updateProjectionMatrix();
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
});

/* ============================================================
   2D FX CANVAS — bursts, confetti, fireworks
   ============================================================ */
const fxCanvas = document.getElementById("fx-canvas");
const fxCtx = fxCanvas.getContext("2d");
function resizeFx(){
  fxCanvas.width = window.innerWidth * devicePixelRatio;
  fxCanvas.height = window.innerHeight * devicePixelRatio;
  fxCanvas.style.width = window.innerWidth + "px";
  fxCanvas.style.height = window.innerHeight + "px";
  fxCtx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
resizeFx();
window.addEventListener("resize", resizeFx);

let fxParticles = [];
function spawnBurst(x, y, count, colors, opts = {}){
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (opts.speed || 3) * (0.4 + Math.random() * 0.8);
    fxParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: opts.decay || (0.008 + Math.random() * 0.012),
      size: (opts.size || 3) * (0.5 + Math.random()),
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: opts.gravity ?? 0.03,
      shape: opts.shape || "circle",
    });
  }
}

function spawnConfettiFall(count){
  const colors = ["#ffd27a", "#ff9ecb", "#a78bff", "#ffffff", "#ff5ca8"];
  for (let i = 0; i < count; i++) {
    fxParticles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 2 + Math.random() * 2,
      life: 1,
      decay: 0.0025,
      size: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.01,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      shape: "confetti",
    });
  }
}

let fxTabVisible = true;
document.addEventListener("visibilitychange", () => { fxTabVisible = !document.hidden; });

function animateFx(){
  requestAnimationFrame(animateFx);
  if (!fxTabVisible) return;
  fxCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  fxParticles = fxParticles.filter(p => p.life > 0 && p.y < window.innerHeight + 60);
  for (const p of fxParticles) {
    p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.life -= p.decay;
    if (p.rot !== undefined) p.rot += p.rotSpeed;
    fxCtx.save();
    fxCtx.globalAlpha = Math.max(p.life, 0);
    fxCtx.fillStyle = p.color;
    if (p.shape === "confetti") {
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate(p.rot);
      fxCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.5);
    } else if (p.shape === "heart") {
      drawHeart(fxCtx, p.x, p.y, p.size);
    } else {
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fxCtx.shadowColor = p.color;
      fxCtx.shadowBlur = 8;
      fxCtx.fill();
    }
    fxCtx.restore();
  }
}
function drawHeart(ctx, x, y, size){
  ctx.beginPath();
  const s = size / 2;
  ctx.moveTo(x, y + s);
  ctx.bezierCurveTo(x - s*1.4, y - s*0.6, x - s*0.3, y - s*1.6, x, y - s*0.4);
  ctx.bezierCurveTo(x + s*0.3, y - s*1.6, x + s*1.4, y - s*0.6, x, y + s);
  ctx.fill();
}
animateFx();

function fireworkBurst(x, y){
  const colors = ["#ffd27a", "#ff5ca8", "#a78bff", "#ffffff", "#ff9ecb"];
  const shape = Math.random() > 0.6 ? "heart" : "circle";
  spawnBurst(x, y, isMobile ? 40 : 80, colors, { speed: 5, size: shape === "heart" ? 3 : 2.4, gravity: 0.045, shape });
}

/* ============================================================
   INTRO TIMELINE (GSAP)
   ============================================================ */
function playIntroTimeline(){
  const tl = gsap.timeline();
  const lines = gsap.utils.toArray(".intro-line");

  lines.forEach((line, i) => {
    tl.to(line, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, i === 0 ? "+=0.2" : "+=0.6");
    tl.to(line, { opacity: 0, duration: 0.6, ease: "power2.in" }, "+=1.1");
  });

  tl.to("#hero-name-wrap", {
    opacity: 1, duration: 1.2, ease: "power2.out",
    onStart: () => {
      const rect = document.getElementById("hero-name-wrap").getBoundingClientRect();
      spawnBurst(window.innerWidth/2, window.innerHeight/2, isMobile ? 30 : 70,
        ["#ffd27a","#ff9ecb","#a78bff","#ffffff"], { speed: 4, size: 2.6, gravity: 0.01, decay: 0.01 });
    }
  }, "+=0.3");
  tl.fromTo("#hero-name", { scale: 0.85, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 1 }, "<");

  tl.to("#start-journey-btn", { opacity: 1, duration: 0.8 }, "-=0.3");
  tl.to("#scroll-hint", { opacity: 0.7, duration: 0.6 }, "-=0.3");

  gsap.set(".intro-line", { y: 14 });
}

/* ============================================================
   START JOURNEY BUTTON — scroll to next section + music
   ============================================================ */
document.getElementById("start-journey-btn").addEventListener("click", () => {
  tryPlayMusic();
  document.getElementById("special-day").scrollIntoView({ behavior: "smooth" });
});

/* ============================================================
   SECTION NAV DOTS — scroll spy + click
   ============================================================ */
const sectionIds = ["intro","special-day","memories","message","cake","surprise","final"];
const dots = document.querySelectorAll(".dot");
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    document.getElementById(dot.dataset.target).scrollIntoView({ behavior: "smooth" });
  });
});
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dots.forEach(d => d.classList.toggle("active", d.dataset.target === entry.target.id));
    }
  });
}, { threshold: 0.5 });
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ============================================================
   SPECIAL DAY — scroll reveal
   ============================================================ */
gsap.utils.toArray(".reveal-line").forEach((line, i) => {
  gsap.fromTo(line, { opacity: 0, y: 24 }, {
    opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
    scrollTrigger: { trigger: line, start: "top 80%" },
    delay: i * 0.15,
  });
});
gsap.fromTo(".reveal-panel", { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, duration: 1,
  scrollTrigger: { trigger: "#special-day", start: "top 70%" },
});

/* ============================================================
   MEMORIES GALLERY — build from config
   ============================================================ */
const galleryEl = document.getElementById("gallery-3d");
birthdayConfig.photos.forEach((photo, i) => {
  const card = document.createElement("div");
  card.className = "memory-card";
  card.innerHTML = `
    <div class="photo-wrap">
      <img src="${photo.src}" alt="${photo.caption}"
           onerror="this.parentElement.innerHTML='<span class=photo-placeholder-label>PHOTO_0${i+1}</span>'" />
    </div>
    <div class="card-body">
      <div class="card-date">${photo.date}</div>
      <div class="card-caption">${photo.caption}</div>
    </div>`;
  galleryEl.appendChild(card);

  gsap.fromTo(card, { opacity: 0, y: 50, rotateY: -15 }, {
    opacity: 1, y: 0, rotateY: 0, duration: 0.9, ease: "power2.out",
    scrollTrigger: { trigger: "#memories", start: "top 60%" },
    delay: i * 0.08,
  });

  // subtle tilt on desktop hover
  if (!isTouch) {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 14, rotateX: -py * 10, duration: 0.4, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
    });
  }
});

/* ============================================================
   MESSAGE — typewriter reveal
   ============================================================ */
let messageTyped = false;
const typeTarget = document.getElementById("typewriter-text");
function typeMessage(){
  if (messageTyped) return;
  messageTyped = true;
  const text = birthdayConfig.message;
  let i = 0;
  const cursorSpan = '<span class="cursor-blink"></span>';
  const iv = setInterval(() => {
    i++;
    typeTarget.innerHTML = escapeHtml(text.slice(0, i)) + cursorSpan;
    if (i >= text.length) {
      clearInterval(iv);
      setTimeout(() => { typeTarget.innerHTML = escapeHtml(text); }, 1200);
    }
  }, 35);
}
function escapeHtml(str){
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
ScrollTrigger.create({
  trigger: "#message",
  start: "top 65%",
  onEnter: typeMessage,
});

/* ============================================================
   3D CAKE (separate Three.js scene)
   ============================================================ */
const cakeCanvas = document.getElementById("cake-canvas");
const cakeScene = new THREE.Scene();
const cakeCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
cakeCamera.position.set(0, 2.4, 8);
cakeCamera.lookAt(0, 1, 0);

const cakeRenderer = new THREE.WebGLRenderer({ canvas: cakeCanvas, antialias: true, alpha: true });
function sizeCakeRenderer(){
  const rect = cakeCanvas.getBoundingClientRect();
  cakeRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  cakeRenderer.setSize(rect.width, rect.height, false);
  cakeCamera.aspect = rect.width / rect.height;
  cakeCamera.updateProjectionMatrix();
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
cakeScene.add(ambientLight);
const keyLight = new THREE.PointLight(0xffd27a, 2, 20);
keyLight.position.set(2, 5, 4);
cakeScene.add(keyLight);
const rimLight = new THREE.PointLight(0xff5ca8, 1.2, 20);
rimLight.position.set(-3, 2, -2);
cakeScene.add(rimLight);

const cakeGroup = new THREE.Group();
cakeScene.add(cakeGroup);

// tiers
const tierData = [
  { r: 1.9, h: 0.75, y: 0.375, color: 0xf5e3c8 },
  { r: 1.4, h: 0.65, y: 0.75 + 0.325, color: 0xffe9bd },
  { r: 0.95, h: 0.55, y: 0.75 + 0.65 + 0.275, color: 0xfff2dd },
];
tierData.forEach(t => {
  const geo = new THREE.CylinderGeometry(t.r, t.r * 1.04, t.h, 32);
  const mat = new THREE.MeshStandardMaterial({ color: t.color, roughness: 0.6, metalness: 0.05 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = t.y;
  cakeGroup.add(mesh);

  // frosting drip ring
  const ringGeo = new THREE.TorusGeometry(t.r * 1.01, 0.06, 8, 32);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = t.y + t.h/2;
  cakeGroup.add(ring);
});

// candles + flames
const candles = [];
const candleCount = 5;
const topY = tierData[2].y + tierData[2].h/2;
for (let i = 0; i < candleCount; i++) {
  const angle = (i / candleCount) * Math.PI * 2;
  const rad = 0.45;
  const cx = Math.cos(angle) * rad;
  const cz = Math.sin(angle) * rad;

  const stick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: [0xff5ca8, 0xa78bff, 0xffd27a, 0xff9ecb, 0x7b5cff][i] })
  );
  stick.position.set(cx, topY + 0.2, cz);
  cakeGroup.add(stick);

  const flameGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffd27a });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(cx, topY + 0.44, cz);
  cakeGroup.add(flame);

  const flameLight = new THREE.PointLight(0xffbb55, 0.6, 3);
  flameLight.position.copy(flame.position);
  cakeGroup.add(flameLight);

  candles.push({ flame, flameLight, lit: true, hitX: cx, hitZ: cz });
}

let candlesLit = candleCount;
let cakeAppeared = false;
let cakeTime = 0;

function animateCake(){
  requestAnimationFrame(animateCake);
  if (!fxTabVisible) return;
  cakeTime += 0.02;
  cakeGroup.rotation.y = Math.sin(cakeTime * 0.3) * 0.15 + cakeTime * 0.05;
  candles.forEach((c, i) => {
    if (c.lit) {
      const flicker = 1 + Math.sin(cakeTime * 8 + i) * 0.15;
      c.flame.scale.set(flicker, flicker * 1.2, flicker);
      c.flameLight.intensity = 0.5 + Math.sin(cakeTime * 10 + i) * 0.15;
    }
  });
  cakeRenderer.render(cakeScene, cakeCamera);
}

let cakeStarted = false;
ScrollTrigger.create({
  trigger: "#cake",
  start: "top 60%",
  onEnter: () => {
    if (cakeStarted) return;
    cakeStarted = true;
    sizeCakeRenderer();
    gsap.fromTo(cakeGroup.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 1.4, ease: "back.out(1.4)" });
    gsap.fromTo(cakeCamera.position, { z: 12 }, { z: 8, duration: 1.6, ease: "power2.out" });
    gsap.to("#wish-text", { opacity: 1, duration: 0.9, delay: 0.8 });
    gsap.to("#wish-sub", { opacity: 0.85, duration: 0.9, delay: 1.1 });
    animateCake();
  },
});
window.addEventListener("resize", sizeCakeRenderer);

// raycaster click on candles
const raycaster = new THREE.Raycaster();
const mouseVec = new THREE.Vector2();
function handleCakeClick(clientX, clientY){
  const rect = cakeCanvas.getBoundingClientRect();
  mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouseVec, cakeCamera);
  const flameMeshes = candles.filter(c => c.lit).map(c => c.flame);
  const hits = raycaster.intersectObjects(flameMeshes);
  if (hits.length) {
    const hit = candles.find(c => c.flame === hits[0].object);
    blowOutCandle(hit);
  } else {
    // also allow clicking anywhere near a lit candle's projected screen area (easier UX)
    let closest = null, closestDist = Infinity;
    candles.forEach(c => {
      if (!c.lit) return;
      const pos = c.flame.position.clone().project(cakeCamera);
      const sx = (pos.x * 0.5 + 0.5) * rect.width;
      const sy = (-pos.y * 0.5 + 0.5) * rect.height;
      const dist = Math.hypot(sx - (clientX - rect.left), sy - (clientY - rect.top));
      if (dist < closestDist) { closestDist = dist; closest = c; }
    });
    if (closest && closestDist < 40) blowOutCandle(closest);
  }
}
cakeCanvas.addEventListener("click", (e) => handleCakeClick(e.clientX, e.clientY));

function blowOutCandle(c){
  if (!c.lit) return;
  c.lit = false;
  gsap.to(c.flame.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
  gsap.to(c.flameLight, { intensity: 0, duration: 0.3 });
  candlesLit--;
  if (candlesLit === 0) onAllCandlesOut();
}

function onAllCandlesOut(){
  gsap.to("#cake-canvas, #wish-text, #wish-sub", { opacity: 0.15, duration: 0.5 });
  setTimeout(() => {
    gsap.fromTo("#wish-done", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" });
    launchFireworksSequence();
  }, 500);
}

/* ============================================================
   FIREWORKS SEQUENCE
   ============================================================ */
let fireworksLaunched = false;
function launchFireworksSequence(){
  if (fireworksLaunched) return;
  fireworksLaunched = true;

  let bursts = 0;
  const maxBursts = isMobile ? 8 : 14;
  const burstIv = setInterval(() => {
    fireworkBurst(
      Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
      Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.1
    );
    bursts++;
    if (bursts >= maxBursts) {
      clearInterval(burstIv);
      spawnConfettiFall(isMobile ? 60 : 140);
      gsap.to("#fireworks-title", { opacity: 1, duration: 1.2, delay: 0.4 });
      setTimeout(() => {
        document.getElementById("fireworks").scrollIntoView({ behavior: "smooth" });
      }, 900);
    }
  }, 260);
}

document.getElementById("to-surprise-btn").addEventListener("click", () => {
  document.getElementById("surprise").scrollIntoView({ behavior: "smooth" });
});

/* ============================================================
   SURPRISE / GIFT BOX
   ============================================================ */
const surpriseBtn = document.getElementById("surprise-btn");
const giftStage = document.getElementById("gift-stage");
const giftBox = document.getElementById("gift-box");
const giftReveal = document.getElementById("gift-reveal");

surpriseBtn.addEventListener("click", () => {
  const tl = gsap.timeline();
  tl.to(surpriseBtn, { opacity: 0, scale: 0.8, duration: 0.4, onComplete: () => surpriseBtn.classList.add("hidden") });
  tl.to("#bg-canvas", { filter: "brightness(1.6)", duration: 0.3, yoyo: true, repeat: 1 }, "<");
  tl.call(() => {
    spawnBurst(window.innerWidth/2, window.innerHeight/2, isMobile ? 25 : 55, ["#ffd27a","#ff9ecb","#a78bff"], { speed: 5, size: 3, decay: 0.012 });
  });
  tl.set(giftStage, { display: "flex" });
  tl.to(giftStage, { opacity: 1, duration: 0.8, onStart: () => giftStage.classList.add("active") });
  tl.fromTo(giftBox, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "<");
});

giftBox.addEventListener("click", () => {
  if (giftBox.classList.contains("opened")) return;
  giftBox.classList.add("opened");
  spawnBurst(window.innerWidth/2, window.innerHeight/2 - 60, isMobile ? 30 : 60, ["#ffd27a","#ff5ca8","#a78bff","#ffffff"], { speed: 5, size: 3, decay: 0.012, shape: "heart" });
  gsap.to(giftReveal, { opacity: 1, y: 0, duration: 1, delay: 0.4 });
  setTimeout(() => {
    document.getElementById("final").scrollIntoView({ behavior: "smooth" });
  }, 2600);
});

/* ============================================================
   FINAL SECTION
   ============================================================ */
ScrollTrigger.create({
  trigger: "#final",
  start: "top 60%",
  onEnter: () => {
    spawnConfettiFall(isMobile ? 40 : 90);
    gsap.fromTo(".final-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
  },
});

document.getElementById("replay-btn").addEventListener("click", () => {
  document.getElementById("intro").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    candles.forEach(c => { c.lit = true; c.flame.scale.set(1,1,1); c.flameLight.intensity = 0.6; });
    candlesLit = candleCount;
    fireworksLaunched = false;
    gsap.set("#wish-done", { opacity: 0 });
    gsap.set("#cake-canvas, #wish-text, #wish-sub", { opacity: 1 });
    giftBox.classList.remove("opened");
    giftStage.classList.remove("active");
    gsap.set(giftStage, { opacity: 0, display: "none" });
    gsap.set(giftReveal, { opacity: 0, y: 20 });
    surpriseBtn.classList.remove("hidden");
    gsap.set(surpriseBtn, { opacity: 1, scale: 1 });
    gsap.set("#fireworks-title", { opacity: 0 });
  }, 800);
});

/* ============================================================
   INIT ICONS (lucide loads deferred)
   ============================================================ */
window.addEventListener("load", () => {
  if (window.lucide) lucide.createIcons();
});
