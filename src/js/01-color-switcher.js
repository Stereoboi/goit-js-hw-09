const btnStartRef = document.querySelector('[data-start]');
const btnStoptRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body')

btnStartRef.addEventListener('click', startColorSwitch);
btnStoptRef.addEventListener('click', stopColorSwitch);

let startId = null;
btnStoptRef.setAttribute('disabled', 'disabled');

function startColorSwitch() {
    startId = setInterval(() => {
    changeColor();
    }, 1000);
    btnStartRef.setAttribute('disabled', 'disabled');
    btnStoptRef.removeAttribute('disabled');
}

function stopColorSwitch() {
    clearInterval(startId);
    btnStartRef.removeAttribute('disabled');
    btnStoptRef.setAttribute('disabled', 'disabled');
}

function changeColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}













function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

