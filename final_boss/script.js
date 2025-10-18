// =============================
// 🦅 FINAL BOSS FIGHT LOGIC
// =============================

// Elements
const fightBtn = document.getElementById("fight-btn");
const bossHealthBar = document.querySelector(".boss-health-bar");
const seagull = document.getElementById("seagull"); // Your seagull image element
const bottle = document.getElementById("message-bottle");
const finalPopup = document.getElementById("final-popup");
const scrollBg = document.getElementById("scroll-bg");
const closeBtn = document.getElementById("close-popup");
// -------- Background Music --------
const bgMusic = document.getElementById('bg-music');
const soundToggle = document.getElementById('sound-toggle');
const winSound = new Audio('../assets/sounds/you_win.mp3'); // adjust path
const homeBtn = document.getElementById('home-button');
// Audio
const hitSound = new Audio("../assets/sounds/seagull.mp3"); // Change path if needed

// Game variables
let bossHP = 100;
const damage = 10;
let isDefeated = false;


homeBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '../index.html'; // go back to homepage
    }, 400);
});

winSound.preload = 'auto';
// Set music volume and start playing (after user interacts)
winSound.volume= 0.5
bgMusic.volume = 0.3;

hitSound.volume = 0.6;
let musicPlaying = false; // tracks whether music is actually playing


// Frames array for scroll animation
const scrollFrames = [
  '../assets/scroll_frames/frame_001.png',
  '../assets/scroll_frames/frame_002.png',
  '../assets/scroll_frames/frame_003.png',
  '../assets/scroll_frames/frame_004.png',
];

// =====================
// FIGHT BUTTON LOGIC
// =====================
fightBtn.addEventListener("click", () => {
  if (isDefeated) return;

  // Play hit sound
  hitSound.currentTime = 0;
  hitSound.play();

  // Reduce HP
  bossHP = Math.max(0, bossHP - damage);
  bossHealthBar.style.width = bossHP + "%";

  // Animate seagull hit
  seagull.src = "../assets/avatars/final_boss_open.png";
  setTimeout(() => {
    seagull.src = "../assets/avatars/final_boss_close.png";
  }, 300);

  // Shake effect
  seagull.style.transition = "transform 0.1s";
  seagull.style.transform = "translateX(-10px)";
  setTimeout(() => {
    seagull.style.transform = "translateX(0)";
  }, 100);

  if (bossHP <= 0) defeatBoss();
});

// =====================
// BOSS DEFEAT ANIMATION
// =====================
function defeatBoss() {
  winSound.play()
  isDefeated = true;
  fightBtn.disabled = true;
  fightBtn.textContent = "💀 DEFEATED!";
  fightBtn.style.opacity = "0.6";

  // Fade out seagull
  seagull.style.transition = "opacity 1.5s ease-out";
  seagull.style.opacity = "0";

  // Drop message bottle
  setTimeout(spawnMessageBottle, 1500);
}

// =====================
// MESSAGE BOTTLE LOGIC
// =====================
function spawnMessageBottle() {
  bottle.style.display = "block";
  bottle.style.top = "-150px";
  bottle.style.transform = "translateX(-50%)"; // keep centered during animation

  bottle.style.opacity = "1";
  bottle.style.transition = "top 1s cubic-bezier(.34,1.56,.64,1)";

  // Animate fall
  setTimeout(() => {
    bottle.style.top = "60%";
  }, 50);

  // Glow after landing
  setTimeout(() => {
    bottle.classList.add("glow");
  }, 1200);

  // Click to open popup
  bottle.addEventListener("click", showFinalPopup);
}
function typeText(element, text, speed = 50) {
  element.textContent = ''; // clear text first
  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        resolve(); // done typing
      }
    }, speed);
  });
}


// =====================
// SCROLL ANIMATION LOGIC
// =====================
function playScroll(frames, speed = 80, reverse = false) {
  return new Promise((resolve) => {
    let index = reverse ? frames.length - 1 : 0;
    const step = reverse ? -1 : 1;

    const interval = setInterval(() => {
      scrollBg.src = frames[index];
      index += step;
      if ((reverse && index < 0) || (!reverse && index >= frames.length)) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

// =====================
// POPUP LOGIC
// =====================
async function openPopup() {
  finalPopup.classList.remove('hidden');
  finalPopup.style.display = "flex";
  await playScroll(scrollFrames, 80); // play opening animation
  finalPopup.style.pointerEvents = 'auto';
}

closeBtn.addEventListener('click', async () => {
  finalPopup.style.pointerEvents = 'none';
  await playScroll(scrollFrames, 80, true); // closing animation
  finalPopup.classList.add('hidden');
});

function showFinalPopup() {
  openPopup(); // play scroll + show popup
  bottle.classList.remove("glow");
  bottle.style.opacity = "0.5";
}



// Function to play/pause and update icon
function updateMusicState(play) {
  if (play) {
    bgMusic.play().catch(() => {});
    soundToggle.src = '../assets/icons/sound_on.gif';
    musicPlaying = true;
  } else {
    bgMusic.pause();
    soundToggle.src = '../assets/icons/sound_off.png';
    musicPlaying = false;
  }
}

// Trigger music on first interaction
function firstInteraction() {
  if (!musicPlaying) updateMusicState(true);
}

// Autoplay on first click/keydown/touch/scroll
['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
  document.addEventListener(evt, firstInteraction, { once: true });
});

// Toggle button
soundToggle.addEventListener('click', () => {
  updateMusicState(!musicPlaying);
});