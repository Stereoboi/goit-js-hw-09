import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const firstDelayInputRef = document.querySelector('[name="delay"]');
const delayStepInputRef = document.querySelector('[name="step"]');
const amountInputRef = document.querySelector('[name="amount"]');
const submitRef = document.querySelector('.form');

submitRef.addEventListener('submit', onSubmitPromiseForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
  });
}

function onSubmitPromiseForm(event) {
  event.preventDefault();
  let firstDelayValue = Number(firstDelayInputRef.value);
  let delayStepValue = Number(delayStepInputRef.value);
  let amountInputValue = Number(amountInputRef.value);

  for (let i = 1; i <= amountInputValue; i += 1) {
    createPromise(i, firstDelayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelayValue += delayStepValue;
   }
}

