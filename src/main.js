const messages = [
  "Hey..",
  "I’ve been meaning to tell you something.",
  "..figured today was a good excuse to say that.",
  "Meeting you was unexpected..!",
  "But somehow, it felt right.",
  "It wasn’t planned, but I’m glad it happened.",
  "and now here we are, a little quiet..",
  "And that’s okay, sometimes space just happens.",
  "didn't want to make it dramatic.",
  "but also couldn't pretend like I don't care.",
  "So, I thought I would write in \"S.P.A.C.E\", just like this...",
  "then you could see from anywhere ;) ",
  "Happy valentine's day Divya ❤️ ",
];

const textEl = document.getElementById("text");
const bgMusic = document.getElementById("bg-music");
const typeSound = document.getElementById("type-sound");
const playBtn = document.getElementById("play-btn");
const overlay = document.getElementById("overlay");

let msgIndex = 0;
let charIndex = 0;

// Create a starfield
const starsContainer = document.getElementById("stars");
const numStars = 120; // adjust for density

for (let i = 0; i < numStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // random position
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";

  // random size
  const size = Math.random() * 2 + 1; // 1-3px
  star.style.width = size + "px";
  star.style.height = size + "px";

  // random twinkle delay & duration
  const delay = Math.random() * 3;
  const duration = 2 + Math.random() * 2; // 2-4s
  star.style.animationDelay = delay + "s";
  star.style.animationDuration = duration + "s";

  starsContainer.appendChild(star);
}

const initializeScreen = () => {
  overlay.classList.remove("fade-out");
  msgIndex = 0;
  charIndex = 0;
  setTimeout( () => {
    overlay.classList.add("fade-in");
    document.body.appendChild(overlay);
    textEl.textContent = "";
    document.getElementById("balloon-container").innerHTML = "";
  }, 1200);


}

function typeMessage() {
  // typeSound.currentTime = 0;
  // typeSound.play();
  if (charIndex < messages[msgIndex].length) {
    textEl.textContent += messages[msgIndex][charIndex];
    // typeSound.currentTime = 3;
    typeSound.playbackRate = 1.2;
    typeSound.volume = 0.5;
    typeSound.play();
    charIndex++;
    setTimeout(typeMessage, 70);
  } else {
    setTimeout(() => {
      msgIndex++;
      charIndex = 0;
      if(msgIndex != messages.length){
        textEl.textContent = "";
      }
      if (msgIndex < messages.length) {
        if (msgIndex == messages.length - 1){
          launchBalloons();
        }
        typeMessage();
      }else{
        typeSound.pause();
        setTimeout(() => {
          bgMusic.pause();
          initializeScreen();
        }, 5000)
      }
    }, 1200);
  }
}

playBtn.addEventListener("click", async () => {
  await bgMusic.play();

  overlay.classList.add("fade-out");

  setTimeout(() => {
    overlay.remove();   // 🔥 THIS IS THE KEY
    typeMessage();      // 🔥 TEXT NOW HAS NO OBSTRUCTION
  }, 800);
});


function createFallingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  // Random horizontal position
  star.style.left = Math.random() * window.innerWidth + "px";

  // Random size variation
  const size = 2 + Math.random() * 2;
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Random fall duration (slightly varied)
  const duration = 6 + Math.random() * 4; // 6–10 seconds
  star.style.animationDuration = `${duration}s, 2s`;

  document.getElementById("stars").appendChild(star);

  // Remove after animation
  setTimeout(() => {
    star.remove();
  }, duration * 1000);
}

// Create multiple slow falling stars
setInterval(() => {
  createFallingStar();

  // Occasionally create a second one
  if (Math.random() > 0.7) {
    setTimeout(createFallingStar, 1000);
  }

}, 3000);


// Celebratation 

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Random horizontal position
  balloon.style.left = Math.random() * 100 + "vw";

  // Random color
  const colors = ["#ff4d6e91", "#32943595", "#2543b996", "#b5179d8b", "#7109b788"];
  balloon.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  // Random animation duration
  const duration = 6 + Math.random() * 4;
  balloon.style.animationDuration = duration + "s";

  document.getElementById("balloon-container").appendChild(balloon);

  // Remove after animation
  setTimeout(() => {
    balloon.remove();
  }, duration * 1000);
}

function launchBalloons() {
  let count = 0;
  const interval = setInterval(() => {
    createBalloon();
    count++;

    if (count > 25) {
      clearInterval(interval);
    }
  }, 300);
}


