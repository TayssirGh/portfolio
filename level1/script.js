console.log("JS is connected!");
const root = document.querySelector(':root');
const pathHeight = getComputedStyle(root).getPropertyValue('--path-height');
// DOM elements
const xpBar = document.getElementById('xp-bar');
const popup = document.getElementById('popup');
const avatarImg = document.getElementById('avatar-img');
const buildSound = new Audio('../assets/sounds/buildsound.mp3');
buildSound.preload = 'auto';
const pageTurnSound = new Audio('../assets/sounds/pageturn.mp3'); // adjust path
pageTurnSound.preload = 'auto';
const graduationMusic = new Audio('../assets/sounds/graduationmusic.mp3'); // adjust path
graduationMusic.preload = 'auto';

let activeBubble = null;      // current visible bubble
let activeButton = null;      // corresponding button
let activeMilestoneIndex = null;
let graduated = false;

// Combine milestones and jellies into a single projects array for the book
let projects = [];
let xp = 0;
let worldX = 0; //edit this back to .0.
let maxXP = 0;

// Milestones
let milestones = [
  {
    id: 'board1',
    x: 900,
    title: 'Start College',
    xp: 20,
    description: 'Admitted to INSAT...',
    avatar: '../assets/avatars/student_avatar.gif',
    image: '../assets/projects/gdoura_popup.png',
    deadSrc: '../assets/bulletin_done.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    eaten: false,
    type: 'board'
  },
  {
    id: 'board2',
    x: 1500,
    title: 'Internship 1',
    xp: 30,
    description: 'Mechatronics internship at ASQII...',
    image: '../assets/projects/agitathor_popup.png',
    deadSrc: '../assets/bulletin_done.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    page: 2,
    eaten: false,
    type: 'board'
  },
  {
    id: 'board3', x: 2100,
    title: 'Internship 2',
    xp: 30,
    description: 'Embedded software internship at ASQII...',
    image: '../assets/projects/cpm_popup.png',
    deadSrc: '../assets/bulletin_done.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    page: 4,
    eaten: false,
    type: 'board'
  },
  {
    id: 'board4', x: 2700,
    title: 'Internship 3', xp: 30,
    description: 'SCADA Engineering Internship at JFK Integration...',
    image: '../assets/projects/martin_popup.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    deadSrc: '../assets/bulletin_done.png',
    date: '2022',
    page: 9,
    eaten: false,
    type: 'board'
  },
  {
    id: 'board5',
    x: 3000,
    title: 'Graduation',
    xp: 50,
    description: 'Graduated!...',
    avatar: '../assets/avatars/grad_avatar.gif',
    deadSrc: '../assets/bulletin_done.png',
    image: '../assets/projects/bulletin.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    eaten: false,
    type: 'board'
  }
];
// --- JELLYFISH PROJECTS ---
let jellies = [
  {
    id: 'jelly1',
    x: 1200,
    title: 'Gdoura, the autonomous line follower robot',
    description: 'A self-navigating robot designed to follow lines with precision.',
    aliveSrc: '../assets/alive_jelly.gif',
    deadSrc: '../assets/dead_jelly.gif',
    image: '../assets/projects/gdoura_popup.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    page: 1,
    eaten: false,
    xp: 30,
    type: 'jelly'
  },
  {
    id: 'jelly2',
    x: 1800,
    title: 'Sortify, the waste sorting bin',
    description: 'An AI-powered bin that automatically identifies and sorts recyclables.',
    aliveSrc: '../assets/alive_jelly.gif',
    deadSrc: '../assets/dead_jelly.gif',
    image: '../assets/projects/sortify_popup.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    xp: 30,
    page: 3,
    eaten: false,
    type: 'jelly'
  },
  {
    id: 'jelly3',
    x: 2400,
    xp: 30,
    title: 'Cave CPU',
    description: 'An 8-bit CPU I designed from scratch on LogicIM.',
    aliveSrc: '../assets/alive_jelly.gif',
    deadSrc: '../assets/dead_jelly.gif',
    image: '../assets/projects/cavecpu_popup.png',
    skills: ['Arduino', 'PID', 'Sensors'],
    date: '2022',
    page: 5,
    eaten: false,
    type: 'jelly'
  }
];

const infoBubbleContent = {
  board1: {
    message: "💬 Welcome to INSAT! The adventure starts here.",
    buttonText: "Collect XP",
    xp: 30
  },
  board2: {
    message: "🪧 Prototype detected…",
    buttonText: "Inspect design",
    xp: 30
  },
  board3: {
    message: "🪧 Firmware logs found…",
    buttonText: "Access data",
    xp: 30
  },
  board4: {
    message: "🪧 Old schematics pinned here…",
    buttonText: "Read notes",
    xp: 30
  },
  board5: {
    message: "🎓 Graduation day unlocked!",
    buttonText: "Celebrate",
    xp: 50
  }
};

// Game container
const gameContainer = document.querySelector('.game-container');
const boardsContainer = document.getElementById('boards-container');
// -------- Background Music --------
const bgMusic = document.getElementById('bg-music');
const soundToggle = document.getElementById('sound-toggle');

// Set music volume and start playing (after user interacts)
bgMusic.volume = 0.3;

// Handle sound toggle
let musicPlaying = false;

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

milestones.forEach(m => {
  const board = document.createElement('img');
  board.src = '../assets/bulletin.png';
  board.id = m.id;
  board.classList.add('milestone-board');
  board.style.left = m.x + 'px';
  maxXP += m.xp;
  board.style.bottom = pathHeight;
  boardsContainer.appendChild(board);
   if (m.page && m.page > 0) { // only include if page > 0
    projects.push({
      id: m.id,
      title: m.title,
      description: m.description,
      get unlocked() { return m.eaten; },           // dynamic: true if project was built
      unlockedImg: m.image,        // use the project image
      lockedImg: '../assets/projects/locked.png',          // locked version (same image for now)
      page: m.page
    });
  }
});

// Dynamically create jellies
jellies.forEach(j => {
  maxXP += j.xp;
  const jelly = document.createElement('img');
  jelly.src = j.aliveSrc;
  jelly.id = j.id;
  jelly.classList.add('jelly');
  jelly.style.left = j.x + 'px';
  jelly.style.bottom = pathHeight + '180px'; // slightly above ground
  jelly.style.position = 'absolute';
  jelly.style.width = '64px';
  jelly.style.imageRendering = 'pixelated';

  // Add click behavior
  jelly.addEventListener('click', () => {
    // show popup regardless
    showPopup(j);
  });
  gameContainer.appendChild(jelly);

  if (j.page && j.page > 0) {
    projects.push({
      id: j.id,
      title: j.title,
      description: j.description,
      get unlocked() { return j.eaten; },           // dynamic
      unlockedImg: j.image,
      lockedImg: '../assets/projects/locked.png',          // same as locked
      page: j.page
    });
  }
});

// Sort projects by page order
projects.sort((a, b) => a.page - b.page);
const avatar = document.getElementById('avatar');

function moveAvatar(direction) {
    if (direction === 'right') {
        avatar.classList.remove('flipped');
    } else if (direction === 'left') {
        avatar.classList.add('flipped');
    }

    // existing code to update avatar position goes here
}

// Arrow key movement
document.addEventListener('keydown', (e) => {

  if (bookPopup.classList.contains('visible')) return;

  if (e.key === 'ArrowRight') {
    worldX -= 10;
    moveAvatar('right');
  }
  else if (e.key === 'ArrowLeft') {
    worldX += 10;
    moveAvatar('left');
  }
  // Move boards
  document.querySelectorAll('.milestone-board').forEach((board, i) => {
    board.style.left = (milestones[i].x + worldX) + 'px';
  });
  document.querySelectorAll('.jelly').forEach((jelly, i) => {
  jelly.style.left = (jellies[i].x + worldX) + 'px';
  });
});

function updateParallax() {
  // different speeds for depth illusion
  const skySpeed = 0.05;
  const hillsSpeed = 0.5;
  const grassSpeed = 1.2;
  const stoneSpeed = 1;

   document.getElementById('bg-sky').style.backgroundPositionX = worldX * skySpeed + 'px';

 // document.getElementById('bg-hills').style.backgroundPositionX = worldX * hillsSpeed + 'px';
 document.getElementById('bg-grass').style.backgroundPositionX = worldX * grassSpeed + 'px';
 document.getElementById('bg-stone').style.backgroundPositionX = worldX * stoneSpeed + 'px';
}

function checkMilestoneProximity() {
  const avatarX = window.innerWidth * 0.25;
  milestones.forEach((m, i) => {
    const board = document.getElementById(m.id);
    const rect = board.getBoundingClientRect();

    if (Math.abs(rect.left - avatarX) < 120 /*&& !m.completed*/) {
      // show bubble
      if (!activeBubble) showInfoBubble(board, m, i);
    } else {
      // remove bubble AND button if avatar moves away
      if (activeBubble && activeMilestoneIndex === i) {
        activeBubble.remove();
        if (activeButton) activeButton.remove();
        activeBubble = null;
        activeButton = null;
        activeMilestoneIndex = null;
      }
    }
  });
}

function showInfoBubble(board, milestone, index) {
  // Remove existing bubble & button
  if (activeBubble) {
    activeBubble.remove();
    if (activeButton) activeButton.remove();
    activeBubble = null;
    activeButton = null;
    activeMilestoneIndex = null;
  }

  const content = infoBubbleContent[milestone.id] || {
    message: milestone.title,
    buttonText: "View Project",
    xp: milestone.xp
  };

  // Create bubble
  const bubble = document.createElement('div');
  bubble.classList.add('info-bubble');
  bubble.textContent = content.message;
  gameContainer.appendChild(bubble);

  // Create button separately
  const btn = document.createElement('button');
  btn.classList.add('bubble-button');
 // Customize button text
// Set button text based on milestone and eaten status
if (milestone.id === 'board1') {
  btn.textContent = milestone.eaten ? "XP Collected" : `${content.buttonText} ⭐${content.xp}`;

} else if (milestone.id === 'board5') {
  btn.textContent = milestone.eaten ? "Celebrated 🎓" : `${content.buttonText} ⭐${content.xp}`;
} else {
  btn.textContent = `${content.buttonText}${milestone.eaten ? '' : ` ⭐${content.xp}`}`;
}gameContainer.appendChild(btn);

  activeBubble = bubble;
  activeButton = btn;
  activeMilestoneIndex = index;

  const boardRect = board.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();

  // Position bubble & button
  function updatePositions() {
    if (!document.body.contains(bubble)) return;

    const newBoardRect = board.getBoundingClientRect();
    const bubbleX = newBoardRect.left - containerRect.left + newBoardRect.width / 2 - bubble.offsetWidth / 2;
    const bubbleY = newBoardRect.top - containerRect.top - bubble.offsetHeight - 50;
    bubble.style.left = bubbleX + 'px';
    bubble.style.top = bubbleY + 'px';

    // Button directly below bubble
    btn.style.left = bubbleX + bubble.offsetWidth / 2 - btn.offsetWidth / 2 + 'px';
    btn.style.top = bubbleY + bubble.offsetHeight + 5 + 'px';

    requestAnimationFrame(updatePositions);
  }
  updatePositions();

  // Button click
  btn.addEventListener('click', () => {
    if (milestone.id === 'board1' || milestone.id === 'board5') {
      if (!milestone.eaten) {
        const avatarEl = document.getElementById('avatar');
        if (avatarEl && milestone.avatar) {
          avatarEl.src = milestone.avatar;
        }
        milestone.eaten = true; // mark as built
        xp += content.xp;        // grant XP
        updateXPBar();
        const jellyEl = document.getElementById(milestone.id);
        if (jellyEl) jellyEl.src = milestone.deadSrc;
        buildSound.play();       // play sound
              // Optional: show floating XP popup
      const xpPopup = document.createElement('div');
        xpPopup.classList.add('xp-popup');

     xpPopup.textContent = `+${content.xp} XP`;
      gameContainer.appendChild(xpPopup);

      const btnRect = btn.getBoundingClientRect();
      xpPopup.style.left = btnRect.left + btnRect.width/2 + 'px';
      xpPopup.style.top  = btnRect.top - 10 + 'px';
      xpPopup.style.transform = 'translateX(-50%)';
      xpPopup.addEventListener('animationend', () => xpPopup.remove());
      }

      // Remove bubble and button
      bubble.remove();
      btn.remove();
      activeBubble = null;
      activeButton = null;
      activeMilestoneIndex = null;
      if (milestone.title === "Graduation") { graduated = true; console.log('graduated'); startGraduationSequence();}

    } else {
      showPopup(milestone);
      bubble.remove();
      btn.remove();
      activeBubble = null;
      activeButton = null;
      activeMilestoneIndex = null;
    }
    });
}


function showPopup(project) {
  const popupEl = document.getElementById('popup');
  const popupContent = popupEl.querySelector('.popup-content');

  // Fill popup content
  document.getElementById('popup-img').src = project.image;

  // Remove any previous build button (to avoid duplicates)
  const oldButton = popupContent.querySelector('.popup-build-button');
  if (oldButton) oldButton.remove();

  // Create a new Build button
  const buildButton = document.createElement('button');
  buildButton.classList.add('popup-build-button');
  buildButton.textContent = project.eaten ? 'Built' : 'Build';

  // Add the proper class based on whether it's already built
  buildButton.classList.add(project.eaten ? 'inactive' : 'active');

  // Add event listener only if not built
  if (!project.eaten) {
    buildButton.addEventListener('click', () => {
      project.eaten = true; // Mark as built
      buildSound.play();
      // Add XP
      xp += project.xp;
      updateXPBar();
          buildSound.currentTime = 0; // start from beginning
      buildSound.play();
      // Update the jelly sprite if it's a jelly
      const jellyEl = document.getElementById(project.id);
      if (jellyEl) jellyEl.src = project.deadSrc;

      const xpPopup = document.createElement('div');
      xpPopup.classList.add('xp-popup');
      xpPopup.textContent = `+${project.xp} XP`;

      // Append to the current visible popup (milestone/project)
      popupEl.appendChild(xpPopup);

      // Position it above the build button
      const btnRect = buildButton.getBoundingClientRect();
      const popupRect = popupEl.getBoundingClientRect();
      const left = btnRect.left - popupRect.left + btnRect.width / 2;
      const top  = btnRect.top - popupRect.top - 10;
      xpPopup.style.left = left + 'px';
      xpPopup.style.top = top + 'px';
      xpPopup.style.transform = 'translateX(-50%)'; // center it horizontally

      // Remove popup after animation
      xpPopup.addEventListener('animationend', () => xpPopup.remove());
  // Glow effect
  buildButton.classList.add('build-glow');
  buildButton.addEventListener('animationend', () => buildButton.classList.remove('build-glow'));

  // Update button text
  buildButton.textContent = 'Built';
  buildButton.classList.remove('active');
  buildButton.classList.add('inactive');
  });
  }

  // Append the button inside popup
  popupContent.appendChild(buildButton);

  // Show popup
  popupEl.classList.add('visible');
}


function updateXPBar() {
  const xpBarFill = document.getElementById('xp-fill');
  const xpText = document.getElementById('xp-text');

  const xpPercentage = Math.min((xp / maxXP) * 100, 100);
  xpBarFill.style.width = `${xpPercentage}%`;

  // Update text inside the bar
  xpText.textContent = `${xp} / ${maxXP} XP`;

  // Add glow animation when XP changes
  xpBarFill.classList.add('glow-effect');
  setTimeout(() => xpBarFill.classList.remove('glow-effect'), 800);
}


function closePopup() {
  const popupEl = document.getElementById('popup');
  popupEl.classList.remove('visible');
}

// Close popup when clicking the close button
document.getElementById('closePopup').addEventListener('click', closePopup);

// Close popup when clicking outside the content
document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) { // clicked on overlay, not inner content
    closePopup();
  }
});


// ---------- Book Popup Logic ----------
const bookIcon = document.getElementById('book-icon');
const bookPopup = document.getElementById('book-popup');
const bookPageImg = document.getElementById('book-page');
const bookLeft = document.getElementById('book-left');
const bookRight = document.getElementById('book-right');
const bookClose = document.getElementById('book-close');

let currentPageIndex = 0;

// Function to update the page image based on current index
function updateBookPage() {
  if (projects.length === 0) return;

  const project = projects[currentPageIndex];
  if (!project) return;

  bookPageImg.src = project.unlocked ? project.unlockedImg : project.lockedImg;

  // Optionally, disable arrows at bounds
  bookLeft.disabled = currentPageIndex === 0;
  bookRight.disabled = currentPageIndex === projects.length - 1;
}

// Open book popup
bookIcon.addEventListener('click', () => {
  bookPopup.classList.add('visible');
  currentPageIndex = 0; // start at first page
  updateBookPage();
});

// Navigate left
bookLeft.addEventListener('click', () => {
  if (currentPageIndex > 0) {
            pageTurnSound.currentTime = 0; // rewind to start
  pageTurnSound.play();
    currentPageIndex--;
    updateBookPage();
  }
});

// Navigate right
bookRight.addEventListener('click', () => {
  if (currentPageIndex < projects.length - 1) {
            pageTurnSound.currentTime = 0; // rewind to start
  pageTurnSound.play();
    currentPageIndex++;
    updateBookPage();
  }
});

// Close book popup
bookClose.addEventListener('click', () => {
  bookPopup.classList.remove('visible');
});

// Optional: click outside book image closes popup
bookPopup.addEventListener('click', (e) => {
  if (e.target === bookPopup) {
    bookPopup.classList.remove('visible');
  }
});


// ---------- Book Popup Enhancements ----------

// Create page number element (only once)
const pageNumber = document.createElement('div');
pageNumber.id = 'book-page-number';
bookPopup.appendChild(pageNumber);

// Update function
function updateBookPage() {
  if (projects.length === 0) return;

  const project = projects[currentPageIndex];
  if (!project) return;


  // Update the book page image
  bookPageImg.src = project.unlocked ? project.unlockedImg : project.lockedImg;

  // Arrow visibility based on page
  bookLeft.style.display = currentPageIndex === 0 ? 'none' : 'block';
  bookRight.style.display = currentPageIndex === projects.length - 1 ? 'none' : 'block';
  // Play page turn sound

    // Fade out current image
  bookPageImg.style.opacity = 0;

  setTimeout(() => {
    bookPageImg.src = project.unlocked ? project.unlockedImg : project.lockedImg;
    bookPageImg.style.opacity = 1; // fade in
  }, 200); // duration of fade

  // Update page number
  pageNumber.textContent = `Page ${currentPageIndex + 1} / ${projects.length}`;
}

// Keyboard navigation for the book
document.addEventListener('keydown', (e) => {
  if (!bookPopup.classList.contains('visible')) return; // only if book open

  if (e.key === 'ArrowRight' && currentPageIndex < projects.length - 1) {
        pageTurnSound.currentTime = 0; // rewind to start
  pageTurnSound.play();
    currentPageIndex++;
    updateBookPage();
  } else if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
        pageTurnSound.currentTime = 0; // rewind to start
  pageTurnSound.play();
    currentPageIndex--;
    updateBookPage();
  }
});

const homeBtn = document.getElementById('home-button');

homeBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '../index.html'; // go back to homepage
    }, 400);
});


function spawnJellyfishFireworks() {
  for (let i = 0; i < 10; i++) {
    const jelly = document.createElement('div');
    jelly.className = 'jellyfish';
    jelly.style.left = `${Math.random() * window.innerWidth}px`;
    jelly.style.top = `${window.innerHeight}px`; // start off-screen
    document.body.appendChild(jelly);

    // Animate floating up
    const floatDuration = 3000 + Math.random() * 2000;
    jelly.animate([
      { transform: `translateY(0)`, opacity: 0 },
      { transform: `translateY(-${window.innerHeight * 0.8}px)`, opacity: 1 }
    ], { duration: floatDuration, easing: 'ease-out' });

    setTimeout(() => jelly.remove(), floatDuration);
  }
}

function spawnScroll() {
  const scroll = document.getElementById('message-bottle');
  scroll.style.display = 'block';
  scroll.style.position = 'absolute';
  scroll.style.top = '50%';
  scroll.style.left = '50%';
  scroll.style.transform = 'translate(-50%, -50%)';
  scroll.style.opacity = '0'; // start invisible

  // Trigger fade-in
  setTimeout(() => {
    scroll.style.transition = 'opacity 2s ease-in-out';
    scroll.style.opacity = '1';
  }, 50);

  scroll.classList.add('glow', 'float'); // add glow + float animation
}


function switchToGraduationMusic() {
  bgMusic.pause();
  graduationMusic.currentTime = 0;
  graduationMusic.play();
}
function startGraduationSequence() {

  // 2️⃣ Play jellyfish fireworks
  spawnJellyfishFireworks();
  setInterval(spawnJellyfishFireworks, 1500); // repeat every 1.5s

  // 3️⃣ Spawn scroll floating
  setTimeout(spawnScroll, 3000);

  // 4️⃣ Switch music
  switchToGraduationMusic();
  // edit :trigger this when the user clicks on the bottle instead
  setTimeout(spawnSeagullShadow, 7000)
  setTimeout(spawnSeagullBoss, 12000)
      // assuming the seagull flies off around 16s
    setTimeout(goToFinalBoss, 16000);
}

function spawnSeagullShadow() {
  const shadow = document.getElementById('seagull-shadow');

  // Stop other music
  bgMusic.pause();
  graduationMusic.pause();

  // Play albatross sound
  const seagull = new Audio('../assets/sounds/seagull.mp3');
  seagull.volume = 0.5;
  seagull.play();

  // Start sliding shadow from left to right
  setTimeout(() => {
    shadow.style.left = '110%'; // slide all the way across
  }, 100); // tiny delay for transition to trigger

  // Fade out when it reaches right
  setTimeout(() => {
    shadow.style.opacity = '0';
  }, 4800); // just before transition ends

  // Optional: remove from DOM after finished
  setTimeout(() => shadow.style.display = 'none', 5500);
}

function spawnSeagullBoss() {
  const seagull = document.getElementById('seagull');
  const scroll = document.getElementById('message-bottle');

  // Play seagull sound
  const caw = new Audio('../assets/sounds/seagull.mp3');
  caw.volume = 0.5;
  caw.play();

  // Step 1: compute center position for seagull
  const scrollRect = scroll.getBoundingClientRect();
  const seagullTargetLeft = scrollRect.left + scrollRect.width / 2 - seagull.offsetWidth / 2;
  const seagullTargetTop = scrollRect.top + scrollRect.height / 2 - seagull.offsetHeight / 2 - 100;

  // Start off-screen right
  seagull.style.left = window.innerWidth + 'px'; // off-screen right
  seagull.style.top = seagullTargetTop + 'px';

  // Trigger reflow for transition to work
  seagull.offsetHeight;

  // Step 2: animate to center
  setTimeout(() => {
    seagull.style.left = seagullTargetLeft + 'px';
  }, 50);

  // Step 3: hide scroll when seagull arrives
  setTimeout(() => {
    scroll.style.opacity = '0';
  }, 2000); // matches seagull slide duration

  // Step 4: fly off the screen
  setTimeout(() => {
    seagull.style.left = '-500px'; // off-screen left
    seagull.style.top = '10%';     // optional arc
  }, 2500); // slight delay after grabbing scroll
}

function goToFinalBoss() {
    document.body.style.transition = 'opacity 0.6s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '../final_boss/index.html'; // path to your final boss page
    }, 600);
}
function gameLoop() {
  updateParallax();
  checkMilestoneProximity(); // handles showing/removing bubble
  /*updateInfoBubble(); */        // keeps bubble moving with board
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
