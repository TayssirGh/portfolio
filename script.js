// const adventureBtn = document.getElementById('adventure-btn');
const classicBtn = document.getElementById('classic-btn');

// Adventure mode goes to level1
// adventureBtn.addEventListener('click', () => {
//     document.body.style.transition = 'opacity 0.4s';
//     document.body.style.opacity = '0';
//     setTimeout(() => {
//         window.location.href = 'level1/index.html';
//     }, 400);
// });

// Classic mode disabled
classicBtn.disabled = false;

classicBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'classic_mode/classic.html';
    }, 400);
});



// Optional: simple parallax movement while mouse moves
const bgSky = document.getElementById('bg-sky');
// const bgHills = document.getElementById('bg-hills');
// const bgGrass = document.getElementById('bg-grass');
const bgStone = document.getElementById('bg-stone');

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
    bgSky.style.transform = `translateX(${moveX * 0.05}px)`;
    // bgHills.style.transform = `translateX(${moveX * 0.2}px)`;
    bgStone.style.transform = `translateX(${moveX * 0.5}px)`;
    // bgGrass.style.transform = `translateX(${moveX * 1}px)`;
});


const soundToggle = document.getElementById('sound-toggle');
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.3;
let musicPlaying = false;

// Function to play/pause and update icon
function updateMusicState(play) {
  if (play) {
    bgMusic.play().catch(() => {});
    soundToggle.src = './assets/icons/sound_on.gif';
    musicPlaying = true;
  } else {
    bgMusic.pause();
    soundToggle.src = './assets/icons/sound_off.png';
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
