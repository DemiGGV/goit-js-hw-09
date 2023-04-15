function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');

buttonStartEl.addEventListener('click', onButtonStart);
buttonStopEl.addEventListener('click', onButtonStop);
buttonStopEl.disabled = true;
let timerId = 0;

function onButtonStart() {
  buttonStartEl.disabled = true;
  buttonStopEl.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onButtonStop() {
  clearInterval(timerId);

  buttonStartEl.disabled = false;
  buttonStopEl.disabled = true;
}
