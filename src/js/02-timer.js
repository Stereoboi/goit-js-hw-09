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
startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', startCountdown);


function startCountdown() {
  startBtn.setAttribute('disabled', 'disabled');
  startId = setInterval(() => {
    if (selected < Date.now()) {
      countdownEndsNotification();
    }
    timeLogic(selected);
  }, 1000);
  
  
}


function countdownEndsNotification () {
      console.log("aф");
      clearInterval(startId);
      Notiflix.Notify.success('Timer is up');
}
    


// class CountdownTimer {
//     constructor(countdownDate) {
//       this.countdownDate = countdownDate;
//   }
// }

function timeLogic(selected) {
  const currentDate = Date.now();
  const deltaTime = convertMs(selected - currentDate);
  if (selected > currentDate) {
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
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  selected: null,
  onClose(selectedDates) {
    console.log(selectedDates);
    selected = selectedDates[0].getTime();
    console.log(selectedDates[0].getTime());
    currentDate = Date.now();
    checkDate(currentDate, selected);

  },
};

console.log();

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
  
function checkDate(currentDate, selected) {
  if (currentDate > selected) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.setAttribute('disabled', 'disabled');
    return;
  }
  startBtn.removeAttribute('disabled');
  
}
console.log(convertMs(Date.now())); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}