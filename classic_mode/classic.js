console.log("Classic mode loaded successfully!");


const toolItems = document.querySelectorAll('.tool-item');
const toolDesc = document.querySelector('.tool-desc');
const pageNumber = document.getElementById('book-page-number');


window.addEventListener('load', () => {
  document.querySelector('.bar-fill.hp').style.width = '100%';
  document.querySelector('.bar-fill.mana').style.width = '100%';
});

toolItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    toolDesc.textContent = item.dataset.desc;
  });
  item.addEventListener('mouseleave', () => {
    toolDesc.textContent = 'However, she believes that frameworks evolve, tools change, but a curious mind keeps learning';
  });
});

const homeBtn = document.getElementById('home-button');

homeBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '../index.html'; // go back to homepage
    }, 400);
});

//booki
const bookPageImg = document.getElementById('book-page');
const bookLeft = document.getElementById('book-left');
const bookRight = document.getElementById('book-right');
const bookContainer = document.getElementById('book-page');

let currentPageIndex = 0;

// Example projects array
const projects = [
  {
    id: 'jelly1',
    title: 'Mozmoz bash treasure',
    description: '',
    unlocked: false,  // set true if you want them visible immediately
    unlockedImg: '../assets/projects/project1.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git: false,
    github_link: ""
  },
  {
    id: 'board3',
    title: 'Parse2Hire',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project3.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git: true,
    github_link:"https://github.com/TayssirGh/Parse2Hire"
  },
  {
    id: 'board4',
    title: 'Comwork challenge',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project5.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git : true,
    github_link: "https://github.com/TayssirGh/devops-training"
  },
  {
    id: 'jelly3',
    title: 'Histograph',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project4.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git: true,
    github_link: "https://github.com/TayssirGh/Histograph"
  },
  {
    id: 'board2',
    title: '',
    description: 'Mozmoz bash treasure',
    unlocked: true,
    unlockedImg: '../assets/projects/project1.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git: true,
        github_link:"https://github.com/TayssirGh/mozmoz-bash-treasure"
  },

  {
    id: 'board5',
    title: 'CTS internship',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project6.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git : true,
    github_link: "https://github.com/TayssirGh/Hashtable-Visualization"
  },
  {
    id: 'jelly2',
    title: 'Mozmoz Puzzle game',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project2.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git: true,
    github_link: "https://github.com/TayssirGh/mozmoz-puzzle-game"
  },
  {
    id: 'board6',
    title: 'PS 1',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project7.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git : true,
    github_link: "https://github.com/TayssirGh/UTTT-frontEnd"
  },

  {
    id: 'final',
    title: 'final',
    description: '',
    unlocked: true,
    unlockedImg: '../assets/projects/project8.png',
    lockedImg: '../assets/projects/workbook.png',
    has_git : false,
    github_link: "https://github.com/TayssirGh"
  }
];


const pageTurnSound = new Audio('../assets/sounds/pageturn.mp3');
pageTurnSound.preload = 'auto';
const githubLinkEl = document.getElementById('github-link');

function updateBookPage() {
  if (projects.length === 0) return;

  const project = projects[currentPageIndex];
  if (!project) return;

  // Update book page image
  bookPageImg.src = project.unlocked ? project.unlockedImg : project.lockedImg;

  // Update GitHub link
  if (project.has_git) {
    githubLinkEl.href = project.github_link;
    githubLinkEl.classList.remove('hidden');
  } else {
    githubLinkEl.classList.add('hidden');
  }

  // Arrow visibility
  bookLeft.style.display = currentPageIndex === 0 ? 'none' : 'block';
  bookRight.style.display = currentPageIndex === projects.length - 1 ? 'none' : 'block';

  // Fade in effect
  bookPageImg.style.opacity = 0;
  setTimeout(() => { bookPageImg.style.opacity = 1; }, 200);

  // Page number
  pageNumber.textContent = `Page ${currentPageIndex + 1} / ${projects.length}`;
}

bookContainer.addEventListener('click', () => {
  if (currentPageIndex === projects.length - 1) {
    const finalProject = projects[currentPageIndex];
    if (finalProject.id === 'final' && finalProject.github_link) {
      window.open(finalProject.github_link, '_blank');
    }
  }
});

// Initialize book to first page
window.addEventListener('DOMContentLoaded', () => {
  currentPageIndex = 0;
  updateBookPage();
});

// Arrow navigation
bookLeft.addEventListener('click', () => {
  if (currentPageIndex > 0) {
    pageTurnSound.currentTime = 0;
    pageTurnSound.play();
    currentPageIndex--;
    updateBookPage();
  }
});
bookRight.addEventListener('click', () => {
  if (currentPageIndex < projects.length - 1) {
    pageTurnSound.currentTime = 0;
    pageTurnSound.play();
    currentPageIndex++;
    updateBookPage();
  }
});

// Optional keyboard navigation
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'ArrowLeft') bookLeft.click();
//   if (e.key === 'ArrowRight') bookRight.click();
// });


// ----------certificates-------
const certificates = [
  {
    name: "AZ-900: Azure Fundamentals (Microsoft)",
    image: "../assets/certs/Azure.png",
    link: "https://drive.google.com/drive/u/1/folders/1cw93Dfqwc--G9TQJVvt4xp6-oCoyZMcM"
  },
  {
    name: "TOEIC (Amideast)",
    image: "../assets/certs/Toiec.png",
    link: "https://drive.google.com/drive/u/1/folders/1HkSiuPp_SSgCbSzePlHSCu7L_eze_-vQ"
  },
  {
    name: "Linux Foundation, System admin (kodekloud)",
    image: "../assets/certs/linux_foundation.png",
    link: "https://drive.google.com/drive/u/1/folders/1BwIoTKy4fwZpGvzPGlB6eQ-4XaP7HB81"
  },
  {
    name: "Red Hat OpenShift Development I- Introduction to Containers with Podman (RedHat)",
    image: "../assets/certs/redhat.png",
    link: "https://drive.google.com/drive/u/1/folders/1Nla8PUA9RQ9YPy9YWgy0jJGf6qAunx7h"
  },
  {
    name: "Advanced Bash scripting (kodekloud)",
    image: "../assets/certs/bash.png",
    link: "https://drive.google.com/drive/u/1/folders/1Q3U9dcwx5U3S3ajSDkUbXTKIjw5FSfzn"
  },
  {
    name: "Pulumi essentials (kodekloud)",
    image: "../assets/certs/Pulumi.png",
    link: "https://drive.google.com/drive/u/1/folders/12fFWAPGuW0LKMp3g_3T3EBuLwqW8e8zu"
  },
  {
    name: "Leetcode 50 days badge (leetcode)",
    image: "../assets/certs/leetcodebadge.png",
    link: "https://leetcode.com/u/TayssirGh"
  },
  {
    name: "Docker Essentials",
    image: "../assets/certs/docker.png",
    link: "https://drive.google.com/drive/u/1/folders/1xg76HfF7lERiGUvCH9nKJTuUso_vrehr"
  }
];

const certTrack = document.getElementById('certTrack');
const certName = document.getElementById('certName');
const defaultText = "Hover a badge to see its title";
certName.textContent = defaultText;
certName.style.opacity = 1;


certificates.forEach(cert => {
  const item = document.createElement('div');
  item.classList.add('cert-item');
  item.innerHTML = `<img src="${cert.image}" alt="${cert.name}">`;

  // Hover: show cert name
  item.addEventListener('mouseenter', () => {
    certName.textContent = cert.name;
  });

  // Leave: restore default text
  item.addEventListener('mouseleave', () => {
    certName.textContent = defaultText;
  });

  // Click: open link
  item.addEventListener('click', () => {
    window.open(cert.link, '_blank');
  });

  certTrack.appendChild(item);
});

// Scroll buttons
document.querySelector('.left-btn').addEventListener('click', () => {
  certTrack.scrollBy({ left: -200, behavior: 'smooth' });
});
document.querySelector('.right-btn').addEventListener('click', () => {
  certTrack.scrollBy({ left: 200, behavior: 'smooth' });
});


// -------- Background Music --------
const bgMusic = document.getElementById('bg-music');
const soundToggle = document.getElementById('sound-toggle');


document.querySelector('.pixel-button').addEventListener('click', () => {
  const audio = new Audio('../assets/sounds/click.mp3');
  audio.play();
});
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
['click', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, firstInteraction, { once: true });
});

// Toggle button
soundToggle.addEventListener('click', () => {
  updateMusicState(!musicPlaying);
});
