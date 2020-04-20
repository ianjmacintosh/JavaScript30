const timeLeft = document.querySelector(".display .display__time-left");
const timeEnd = document.querySelector(".display .display__end-time");
const timerButtons = document.querySelectorAll(".timer__button");
let secondsRemaining = 0;
let timer;

function handleButtonClick() {
    seconds = parseInt(this.dataset.time, 10);
    addTimeToClock(seconds);
}

function handleFormSubmission(e) {
    e.preventDefault();

    addTimeToClock(this.minutes.value * 60);
}

function addTimeToClock(seconds) {
    const now = Date.now();
    secondsRemaining = parseInt(seconds, 10);

    const then = now + (secondsRemaining * 1000);

    timeLeft.textContent = stringifyTime(Math.round((then - Date.now()) / 1000));
    displayEndTime(then);

    clearTimeout(timer);

    timer = setInterval(() => {
        secondsRemaining = Math.round((then - Date.now()) / 1000);
        if (secondsRemaining <= 0) { clearInterval(timer); }
        timeLeft.textContent = stringifyTime(secondsRemaining);
        document.title = stringifyTime(secondsRemaining);
    }, 1000);
}

function stringifyTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    timeEnd.textContent = `Back by ${hours > 12 ? hours - 12 : hours}:${minutes > 9 ? minutes : "0" + minutes}`;
}

timerButtons.forEach(timerButton => {
    timerButton.addEventListener("click", handleButtonClick);
});

document.customForm.addEventListener("submit", handleFormSubmission);