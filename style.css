/* ============================================================
   BIRTHDAY CONFIG — chỉ cần sửa ở đây
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

  // (Tùy chọn) Dán link "Form endpoint" của Formspree vào đây để điều ước được
  // gửi thẳng về email bạn ngay khi có người nhập. Để trống ("") nếu không cần —
  // điều ước vẫn luôn được lưu lại trong trình duyệt của người xem (localStorage).
  wishFormEndpoint: "",

  // (Tùy chọn) Kết nối Google Form -> Google Sheet để mọi điều ước tự đổ vào 1
  // bảng tính bạn xem bất cứ lúc nào. Lấy 2 giá trị này từ "pre-filled link" của
  // Google Form (xem hướng dẫn trong README.md). Để trống nếu không dùng.
  wishGoogleForm: {
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLScmRgH2oE4nRWlOBXoMH8WRbgxNvPbfD77j_nhmSjylPlBJGg/formResponse",
    entryId: "entry.338267240",
  },
};

/* ============================================================
   ĐIỀN CONFIG VÀO DOM
   ============================================================ */
document.getElementById("name-slot").textContent = birthdayConfig.name;
document.getElementById("fw-name").textContent = birthdayConfig.name;
document.getElementById("final-name").textContent = birthdayConfig.name;
document.getElementById("final-made-name").textContent = birthdayConfig.nickname;
document.getElementById("gift-message").textContent = birthdayConfig.giftMessage;

/* ============================================================
   ÂM THANH HIỆU ỨNG — tạo bằng Web Audio API, không cần file mp3 riêng
   ============================================================ */
let audioCtx = null;
function ensureAudioCtx(){
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, duration, type = "sine", peakGain = 0.15, delay = 0){
  const ctx = ensureAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(peakGain, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function playNoiseBurst({ duration = 0.3, filterType = "lowpass", startFreq = 1200, endFreq = 200, peakGain = 0.3 } = {}){
  const ctx = ensureAudioCtx();
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(startFreq, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 30), ctx.currentTime + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(peakGain, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start();
}

function sfxClick(){ playTone(880, 0.09, "sine", 0.1); }
function sfxTransition(){ playTone(520, 0.18, "sine", 0.05); playTone(780, 0.16, "sine", 0.04, 0.05); }
function sfxCandleBlow(){ playNoiseBurst({ duration: 0.4, filterType: "lowpass", startFreq: 1400, endFreq: 150, peakGain: 0.28 }); }
function sfxFireworkPop(){
  playNoiseBurst({ duration: 0.22, filterType: "highpass", startFreq: 900, endFreq: 4000, peakGain: 0.22 });
  playTone(1600 + Math.random() * 600, 0.15, "triangle", 0.06, 0.02);
}
function sfxSparkleChime(){
  [880, 1108, 1318, 1760].forEach((f, i) => playTone(f, 0.35, "sine", 0.08, i * 0.09));
}
function sfxGiftOpen(){
  [523, 659, 784, 1046].forEach((f, i) => playTone(f, 0.4, "triangle", 0.1, i * 0.11));
}
function sfxWishStart(){ playTone(660, 0.12, "sine", 0.08); }

/* ============================================================
   LƯU ĐIỀU ƯỚC
   ============================================================ */
function saveWish(text){
  // 1) Luôn lưu vào localStorage của trình duyệt người xem — bạn tự xem lại
  //    bằng cách mở Console (F12) trên đúng máy/trình duyệt đó và chạy:
  //    JSON.parse(localStorage.getItem("birthdayWishes"))
  try {
    const key = "birthdayWishes";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ text, name: birthdayConfig.name, time: new Date().toLocaleString("vi-VN") });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.warn("Không lưu được điều ước vào localStorage:", err);
  }

  // 2) Nếu đã cấu hình wishFormEndpoint (Formspree), gửi luôn điều ước về email bạn
  if (birthdayConfig.wishFormEndpoint) {
    fetch(birthdayConfig.wishFormEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        "Điều ước": text,
        "Từ trang sinh nhật của": birthdayConfig.name,
        "Thời gian": new Date().toLocaleString("vi-VN"),
      }),
    }).catch((err) => console.warn("Không gửi được điều ước qua form:", err));
  }

  // 3) Nếu đã cấu hình wishGoogleForm, đổ điều ước thẳng vào Google Sheet liên kết
  //    với Google Form đó (gửi ngầm qua iframe ẩn, không mở trang nào cả)
  const gf = birthdayConfig.wishGoogleForm;
  if (gf && gf.actionUrl && gf.entryId) {
    try {
      const form = document.createElement("form");
      form.action = gf.actionUrl;
      form.method = "POST";
      form.target = "hidden-form-target";
      form.style.display = "none";

      const input = document.createElement("input");
      input.name = gf.entryId;
      input.value = text;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      setTimeout(() => form.remove(), 1500);
    } catch (err) {
      console.warn("Không gửi được điều ước vào Google Form:", err);
    }
  }
}

/* ============================================================
   LOADING SCREEN — chờ người dùng bấm "Sẵn sàng" mới bắt đầu
   ============================================================ */
(function loadingSequence(){
  document.body.classList.add("is-loading");
  const fill = document.getElementById("loading-bar-fill");
  const text = document.getElementById("loading-text");
  const readyBtn = document.getElementById("loading-ready");
  const screen = document.getElementById("loading-screen");
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12 + 4;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      text.style.display = "none";
      readyBtn.classList.add("shown");
    }
    fill.style.width = p + "%";
  }, 160);

  readyBtn.addEventListener("click", () => {
    ensureAudioCtx();
    sfxClick();
    document.body.classList.remove("is-loading");
    screen.classList.add("hidden");
    playIntroTimeline();
  });
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
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("button") || e.target.closest(".dot")) {
      cursorRing.classList.add("hovering");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("button") || e.target.closest(".dot")) {
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

musicAudio.addEventListener("error", () => {
  const code = musicAudio.error ? musicAudio.error.code : "?";
  // code 4 = MEDIA_ERR_SRC_NOT_SUPPORTED -> thường do sai đường dẫn (404) hoặc file không phải audio hợp lệ
  console.error("Lỗi tải file nhạc nền (mã lỗi " + code + "). Kiểm tra: assets/music.mp3 có đúng tên/đúng chỗ và là file mp3 thật không.");
});
function tryPlayMusic(){
  musicAudio.volume = 0.5;
  musicAudio.play().then(() => {
    musicPlaying = true;
    musicBtn.classList.add("playing");
  }).catch((err) => {
    // In lỗi ra Console để dễ chẩn đoán (404 sai đường dẫn, định dạng không hợp lệ, v.v.)
    console.error("Không phát được nhạc nền:", err, "— kiểm tra đường dẫn:", musicAudio.currentSrc || musicAudio.src);
  });
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
   THREE.JS NỀN 3D
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

// vài quầng sáng mềm để tạo chiều sâu (hiệu ứng bokeh)
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
   2D FX CANVAS — hiệu ứng nổ hạt, confetti, pháo hoa
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
  sfxFireworkPop();
}

/* ============================================================
   HỆ THỐNG PHÂN TRANG — chỉ chuyển trang bằng nút bấm, KHÔNG cuộn
   ============================================================ */
const sectionIds = ["intro", "special-day", "message", "cake", "fireworks", "surprise", "final"];
let currentIndex = 0;

function goToIndex(idx){
  if (idx < 0 || idx >= sectionIds.length || idx === currentIndex) return;
  const oldEl = document.getElementById(sectionIds[currentIndex]);
  const newEl = document.getElementById(sectionIds[idx]);

  oldEl.classList.remove("active");
  newEl.classList.add("active");

  currentIndex = idx;
  updateDots();
  onSectionEnter(sectionIds[idx]);
}
function goToSection(id){
  goToIndex(sectionIds.indexOf(id));
}

// chặn toàn bộ thao tác cuộn (chuột, cảm ứng, phím) — chỉ nút bấm mới chuyển trang
document.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
window.addEventListener("keydown", (e) => {
  // không chặn phím khi người dùng đang gõ trong bất kỳ ô nhập liệu nào
  if (e.target.closest("input, textarea, [contenteditable='true']")) return;

  const blocked = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", "End", "Home"];
  if (blocked.includes(e.code)) e.preventDefault();
});

/* ============================================================
   NÚT "TIẾP THEO" DÙNG CHUNG + DOTS
   ============================================================ */
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => { sfxTransition(); goToSection(btn.dataset.next); });
});

const dots = document.querySelectorAll(".dot");
dots.forEach(dot => {
  dot.addEventListener("click", () => { sfxClick(); goToSection(dot.dataset.target); });
});
function updateDots(){
  dots.forEach(d => d.classList.toggle("active", d.dataset.target === sectionIds[currentIndex]));
}

/* ============================================================
   MỞ ĐẦU — timeline GSAP
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
      spawnBurst(window.innerWidth/2, window.innerHeight/2, isMobile ? 30 : 70,
        ["#ffd27a","#ff9ecb","#a78bff","#ffffff"], { speed: 4, size: 2.6, gravity: 0.01, decay: 0.01 });
    }
  }, "+=0.3");
  tl.fromTo("#hero-name", { scale: 0.85, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 1 }, "<");

  tl.to("#start-journey-btn", { opacity: 1, duration: 0.8 }, "-=0.3");

  gsap.set(".intro-line", { y: 14 });
}

/* ============================================================
   NÚT "BẮT ĐẦU HÀNH TRÌNH"
   ============================================================ */
document.getElementById("start-journey-btn").addEventListener("click", () => {
  sfxTransition();
  tryPlayMusic();
  goToSection("special-day");
});

/* ============================================================
   ĐIỀU HƯỚNG THEO TỪNG SECTION KHI ĐƯỢC KÍCH HOẠT
   ============================================================ */
function onSectionEnter(id){
  if (id === "special-day") revealSpecialDay();
  if (id === "message") typeMessage();
  if (id === "cake") startCakeSequence();
  if (id === "final") revealFinal();
}

/* ============================================================
   MỘT NGÀY ĐẶC BIỆT — hiệu ứng chữ xuất hiện
   ============================================================ */
let specialDayRevealed = false;
function revealSpecialDay(){
  if (specialDayRevealed) return;
  specialDayRevealed = true;
  gsap.set("#special-day .btn-next", { opacity: 0 });
  const tl = gsap.timeline();
  tl.fromTo(".reveal-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
  gsap.utils.toArray("#special-day .reveal-line").forEach((line, i) => {
    tl.to(line, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, i === 0 ? "-=0.4" : "-=0.5");
  });
  tl.to("#special-day .btn-next", { opacity: 1, duration: 0.6 }, "+=0.2");
}

/* ============================================================
   LỜI NHẮN — hiệu ứng gõ chữ (typewriter)
   ============================================================ */
let messageTyped = false;
const typeTarget = document.getElementById("typewriter-text");
function typeMessage(){
  if (messageTyped) return;
  messageTyped = true;
  gsap.set("#message-next-btn", { opacity: 0 });
  const text = birthdayConfig.message;
  let i = 0;
  const cursorSpan = '<span class="cursor-blink"></span>';
  const iv = setInterval(() => {
    i++;
    typeTarget.innerHTML = escapeHtml(text.slice(0, i)) + cursorSpan;
    if (i >= text.length) {
      clearInterval(iv);
      setTimeout(() => {
        typeTarget.innerHTML = escapeHtml(text);
        gsap.to("#message-next-btn", { opacity: 1, duration: 0.6 });
      }, 1200);
    }
  }, 35);
}
function escapeHtml(str){
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* ============================================================
   BÁNH SINH NHẬT 3D (Three.js riêng)
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

// các tầng bánh
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

  // viền kem
  const ringGeo = new THREE.TorusGeometry(t.r * 1.01, 0.06, 8, 32);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = t.y + t.h/2;
  cakeGroup.add(ring);
});

// nến + ngọn lửa
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
let wishConfirmed = false;
function startCakeSequence(){
  if (cakeStarted) return;
  cakeStarted = true;
  sizeCakeRenderer();
  gsap.fromTo(cakeGroup.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 1.4, ease: "back.out(1.4)" });
  gsap.fromTo(cakeCamera.position, { z: 12 }, { z: 8, duration: 1.6, ease: "power2.out" });
  gsap.to("#wish-text", { opacity: 1, duration: 0.9, delay: 0.8 });
  gsap.to("#wish-input-wrap", { opacity: 1, duration: 0.9, delay: 1.1, onComplete: sfxWishStart });
  animateCake();
}
window.addEventListener("resize", () => { if (cakeStarted) sizeCakeRenderer(); });

const wishInput = document.getElementById("wish-input");
const wishInputWrap = document.getElementById("wish-input-wrap");
const wishConfirmBtn = document.getElementById("wish-confirm-btn");

function confirmWish(){
  const text = wishInput.value.trim();
  if (!text) {
    wishInput.focus();
    gsap.fromTo(wishInputWrap, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });
    return;
  }
  sfxClick();
  saveWish(text);
  wishConfirmed = true;
  gsap.to(wishInputWrap, {
    opacity: 0, y: -10, duration: 0.5,
    onComplete: () => { wishInputWrap.style.pointerEvents = "none"; },
  });
  gsap.to("#wish-sub", { opacity: 0.85, duration: 0.7, delay: 0.2 });
  cakeCanvas.classList.remove("locked");
}
wishConfirmBtn.addEventListener("click", confirmWish);
wishInput.addEventListener("keydown", (e) => { if (e.key === "Enter") confirmWish(); });

// raycaster bắt sự kiện click vào nến
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
    // cho phép click gần khu vực nến để dễ thao tác hơn
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
cakeCanvas.addEventListener("click", (e) => {
  if (!wishConfirmed) return; // chưa nhập điều ước thì chưa cho thổi nến
  handleCakeClick(e.clientX, e.clientY);
});

function blowOutCandle(c){
  if (!c.lit) return;
  c.lit = false;
  sfxCandleBlow();
  gsap.to(c.flame.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
  gsap.to(c.flameLight, { intensity: 0, duration: 0.3 });
  candlesLit--;
  if (candlesLit === 0) onAllCandlesOut();
}

function onAllCandlesOut(){
  gsap.to("#cake-canvas, #wish-text, #wish-sub", { opacity: 0.15, duration: 0.5 });
  setTimeout(() => {
    gsap.fromTo("#wish-done", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" });
    sfxSparkleChime();
    launchFireworksSequence();
  }, 500);
}

/* ============================================================
   CHUỖI PHÁO HOA — tự động chuyển sang trang "Pháo hoa"
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
      setTimeout(() => {
        goToSection("fireworks");
        gsap.to("#fireworks-title", { opacity: 1, duration: 1.2, delay: 0.3 });
      }, 500);
    }
  }, 260);
}

/* ============================================================
   BẤT NGỜ / HỘP QUÀ
   ============================================================ */
const surpriseBtn = document.getElementById("surprise-btn");
const giftStage = document.getElementById("gift-stage");
const giftBox = document.getElementById("gift-box");
const giftReveal = document.getElementById("gift-reveal");

surpriseBtn.addEventListener("click", () => {
  sfxTransition();
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
  sfxGiftOpen();
  spawnBurst(window.innerWidth/2, window.innerHeight/2 - 60, isMobile ? 30 : 60, ["#ffd27a","#ff5ca8","#a78bff","#ffffff"], { speed: 5, size: 3, decay: 0.012, shape: "heart" });
  gsap.to(giftReveal, { opacity: 1, y: 0, duration: 1, delay: 0.4 });
});

/* ============================================================
   TRANG KẾT THÚC
   ============================================================ */
let finalRevealed = false;
function revealFinal(){
  if (finalRevealed) return;
  finalRevealed = true;
  spawnConfettiFall(isMobile ? 40 : 90);
  gsap.fromTo(".final-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
}

document.getElementById("replay-btn").addEventListener("click", () => {
  sfxTransition();
  // reset toàn bộ trạng thái tương tác rồi quay về đầu
  candles.forEach(c => { c.lit = true; c.flame.scale.set(1,1,1); c.flameLight.intensity = 0.6; });
  candlesLit = candleCount;
  fireworksLaunched = false;

  wishConfirmed = false;
  wishInput.value = "";
  wishInputWrap.style.pointerEvents = "auto";
  gsap.set(wishInputWrap, { opacity: 0, x: 0, y: 0 });
  cakeCanvas.classList.add("locked");

  gsap.set("#wish-done", { opacity: 0 });
  gsap.set("#cake-canvas, #wish-text, #wish-sub", { opacity: 1 });
  gsap.set("#wish-sub", { opacity: 0 });
  giftBox.classList.remove("opened");
  giftStage.classList.remove("active");
  gsap.set(giftStage, { opacity: 0, display: "none" });
  gsap.set(giftReveal, { opacity: 0, y: 20 });
  surpriseBtn.classList.remove("hidden");
  gsap.set(surpriseBtn, { opacity: 1, scale: 1 });
  gsap.set("#fireworks-title", { opacity: 0 });

  goToIndex(0);
});

/* ============================================================
   KHỞI TẠO ICON (lucide load kiểu defer)
   ============================================================ */
window.addEventListener("load", () => {
  if (window.lucide) lucide.createIcons();
});
