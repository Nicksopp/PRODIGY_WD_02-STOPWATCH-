let timer;
let startTime;
let elapsedTime = 0;
let running = false;

function startStopwatch() {
  playClickSound();
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById('startBtn').textContent = 'Pause';
  } else {
    clearInterval(timer);
    running = false;
    document.getElementById('startBtn').textContent = 'Resume';
  }
}

function pauseStopwatch() {
  playClickSound();
  clearInterval(timer);
  running = false;
  document.getElementById('startBtn').textContent = 'Resume';
}

function resetStopwatch() {
  playClickSound();
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  document.getElementById('startBtn').textContent = 'Start';
  document.getElementById('lapsList').innerHTML = '';
}

function recordLap() {
  playClickSound();
  const lapsList = document.getElementById('lapsList');
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.querySelector('.display').textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = Math.floor((milliseconds % 1000) / 10);
  return (
    padTime(minutes) + ':' +
    padTime(seconds) + ':' +
    padTime(millis)
  );
}

function padTime(time) {
  return time < 10 ? '0' + time : time;
}

function playClickSound() {
  const clickSound = document.getElementById('clickSound');
  clickSound.currentTime = 0;
  clickSound.play();
}
