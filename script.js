let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById("timer");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("laps");
const clickSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

startStopBtn.addEventListener("click", () => {
  playSound();
  if (!isRunning) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = "Pause";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  playSound();
  clearInterval(interval);
  elapsedTime = 0;
  display.textContent = "00:00.00";
  lapsList.innerHTML = "";
  startStopBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  isRunning = false;
});

lapBtn.addEventListener("click", () => {
  if (!isRunning) return;
  playSound();
  const li = document.createElement("li");
  li.textContent = display.textContent;
  lapsList.prepend(li);
});

document.getElementById("themeToggle").addEventListener("change", (e) => {
  playSound();
  document.body.classList.toggle("dark-mode", e.target.checked);
});
