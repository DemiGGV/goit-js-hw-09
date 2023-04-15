import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
// Time to finish
let delayTime;
// Choosen time
let selectedTime;
// Indentifier for interval function
let myTimer;
// Access to "panel"
let panelTimer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const buttonEl = document.querySelector('[data-start]');
buttonEl.disabled = true;

// Let call the flatpicker...
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    buttonEl.addEventListener('click', onBtnStart);
    buttonEl.disabled = true;
  },
  onClose(selectedDates) {
    delayTime = new Date(selectedDates[0] - new Date()).getTime();
    if (delayTime > 0) {
      buttonEl.disabled = false;
      selectedTime = new Date(selectedDates[0]).getTime();
      updateTimer();
    } else {
      buttonEl.disabled = true;
      Notify.failure('Please choose a date in the future!');
    }
  },
};
flatpickr(inputEl, options);

// onClick function here...
function onBtnStart() {
  if (myTimer) {
    clearInterval(myTimer);
    console.log('clear old timer');
  }
  myTimer = setInterval(updateTimer, 1000);
  buttonEl.removeEventListener('click', onBtnStart);
}

function updateTimer() {
  delayTime = selectedTime - new Date().getTime();
  if (delayTime < 1000) {
    clearInterval(myTimer);
    Notify.success('You are the Winner!');
    // Ended here...
  }

  showTimer(convertMs(delayTime));
}
//update the HTML panel
function showTimer({ days, hours, minutes, seconds }) {
  panelTimer.days.textContent = addLeadingZero(days);
  panelTimer.hours.textContent = addLeadingZero(hours);
  panelTimer.minutes.textContent = addLeadingZero(minutes);
  panelTimer.seconds.textContent = addLeadingZero(seconds);
}
// adding leading "0" if necessary
function addLeadingZero(val) {
  if (val < 10) {
    val = val.toString().padStart(2, '0');
  }
  return val;
}
// converting ms to time
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
