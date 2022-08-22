import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const { dateInput, startBtn, days, hours, minutes, seconds } = refs;

let startId = null;
let countdownTimer = null;
let currentDate = null;
startBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', startCountdown);


function startCountdown() {
  startBtn.setAttribute('disabled', 'disabled');
  startBtn.classList.remove('startr_btn--active');
  startId = setInterval(() => {
    if (countdownTimer < Date.now()) {
      countdownEndsNotification();
    }
    timeLogic(countdownTimer);
  }, 1000); 
  
  
}

function countdownEndsNotification () {
      clearInterval(startId);
      Notiflix.Notify.success('Timer is up');
}

function timeLogic(countdownTimer) {
  const currentDate = Date.now();
  const deltaTime = convertMs(countdownTimer - currentDate);
  if (countdownTimer > currentDate) {
    updateTimeInterface(deltaTime);
  }
}

function updateTimeInterface(deltaTime) {
    days.textContent = deltaTime.days;
    hours.textContent = deltaTime.hours;
    minutes.textContent = deltaTime.minutes;
    seconds.textContent = deltaTime.seconds;
}
  
const options = {
  enableTime: true,
  clickOpens: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  countdownTimer = selectedDates[0].getTime();
  currentDate = Date.now();
  checkDate(currentDate, countdownTimer);
  },
};

flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

 function pad (value) {
    return String(value).padStart(2, '0');
}
  
function checkDate(currentDate, countdownTimer) {
  if (currentDate > countdownTimer) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.setAttribute('disabled', 'disabled');
    return;
  }
  startBtn.removeAttribute('disabled');
  startBtn.classList.add('startr_btn--active');
}
