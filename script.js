const timerSeconds = document.getElementById('seconds');
const timerMilliseconds = document.getElementById('ms');
const interval = document.getElementById('interval');
let endTime;

function resetTimer() {
    endTime = (new Date()).getTime() + interval.value * 1000;
    endTime += 50
}
document.getElementById('playpause').addEventListener('click', resetTimer)
function update() {
    const leftMs = endTime - (new Date());
    wrapper.className = '';
    timer.className = '';
    if (!endTime) {
        timerSeconds.textContent = Math.round(interval.value);
        timerMilliseconds.textContent = '000';
        wrapper.className = '';
    } else if (leftMs < 0) {
        timerSeconds.textContent = 'DONE';
        timerMilliseconds.textContent = '';
        wrapper.className = 'ending';
        timer.className = 'out';
    } else {
        timerSeconds.textContent = Math.floor(leftMs / 1000);
        timerMilliseconds.textContent = leftMs % 1000;
        if (leftMs < 11000) {
            wrapper.className = 'ending';
        } else if (leftMs < 21000) {
            wrapper.className = 'warn';
        }
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);

window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case " ":
        case "enter":
        case "r":
            resetTimer()
            break;
        case "escape":
        case "p":
            endTime = null;
            break;

    }
})