const messages = [
  "Hey.",
  "I’ve been meaning to tell you something.",
  "Meeting you was unexpected...",
  "But somehow, it felt right.",
  "Will you be my Valentine? ❤️"
];

const textEl = document.getElementById("text");
const bgMusic = document.getElementById("bg-music");
const typeSound = document.getElementById("type-sound");
const playBtn = document.getElementById("play-btn");
const overlay = document.getElementById("overlay");

let msgIndex = 0;
let charIndex = 0;

function typeMessage() {
  if (charIndex < messages[msgIndex].length) {
    textEl.textContent += messages[msgIndex][charIndex];
    typeSound.currentTime = 5;
    typeSound.play();
    charIndex++;
    setTimeout(typeMessage, 70);
  } else {
    setTimeout(() => {
      msgIndex++;
      charIndex = 0;
      textEl.textContent = "";
      if (msgIndex < messages.length) {
        typeMessage();
      }else{
        typeSound.pause();
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
