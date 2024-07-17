document.addEventListener('DOMContentLoaded', (event) => {
    initializeTimer();
});

$(document).on('rex:ready', function (event, container) {
    initializeTimer();
});

function initializeTimer() {
    let timerElement = document.getElementById('minibartimetrack-timer');
    let resetButton = document.getElementById('minibartimetrack-reset');
    let copyButton = document.getElementById('minibartimetrack-copy');
    let calendarButton = document.getElementById('minibartimetrack-calendar');
    let messageElement = document.getElementById('minibartimetrack-message');

    let timer;
    let startTime;
    let startTimeString;
    let elapsedTime = 0; // Verstrichene Zeit in Sekunden
    let isRunning = false;
    let inactivityTime = 600 * 1000; // 10 Minutes
    let inactivityTimer;

    // Lade verstrichene Zeit und Startzeit aus den Cookies
    let elapsedTimeCookie = getCookie('timerElapsedTime');
    let startTimeStringCookie = getCookie('timerStartTimeString');
    let isRunningCookie = getCookie('timerIsRunning');

    if (elapsedTimeCookie && startTimeStringCookie) {
        elapsedTime = parseInt(elapsedTimeCookie, 10);
        startTimeString = startTimeStringCookie;
        isRunning = isRunningCookie === 'true';

        if (isRunning) {
            startTime = new Date(startTimeString);
            startTimer();
        } else {
            updateTimerDisplay(elapsedTime);
        }
    }

    timerElement.addEventListener('click', () => {
        if (!isRunning) {
            if (!startTimeString) {
                startTime = new Date();
                startTimeString = startTime.toISOString();
                setCookie('timerStartTimeString', startTimeString, 1);
            }
            setCookie('timerIsRunning', 'true', 1);
            startTimer();
        } else {
            clearInterval(timer);
            setCookie('timerIsRunning', 'false', 1);
            isRunning = false;
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        elapsedTime = 0;
        startTime = new Date();
        startTimeString = startTime.toISOString();
        updateTimerDisplay(0);
        setCookie('timerElapsedTime', elapsedTime, 1);
        setCookie('timerStartTimeString', startTimeString, 1);
        setCookie('timerIsRunning', 'false', 1);
        hideMessage();
    });

    copyButton.addEventListener('click', () => {
        let domain = window.location.hostname;
        let currentTime = new Date().toLocaleString();
        let endTime = new Date();
        let formattedElapsedTime = formatTime(elapsedTime);

        let copyText = `Domain: ${domain}\nDate and Time: ${currentTime}\nStart Time: ${new Date(startTimeString).toLocaleString()}\nEnd Time: ${endTime.toLocaleString()}\nElapsed Time: ${formattedElapsedTime}`;
        navigator.clipboard.writeText(copyText).then(() => {
            alert('Information copied to clipboard');
        });

        clearInterval(timer);
        timer = null;
        isRunning = false;
        elapsedTime = 0;
        startTime = new Date();
        startTimeString = startTime.toISOString();
        updateTimerDisplay(0);
        setCookie('timerElapsedTime', elapsedTime, 1);
        setCookie('timerStartTimeString', startTimeString, 1);
        setCookie('timerIsRunning', 'false', 1);
        hideMessage();
    });

    calendarButton.addEventListener('click', () => {
        let domain = window.location.hostname;
        let endTime = new Date();
        let formattedElapsedTime = formatTime(elapsedTime);

        let title = `${domain} - Elapsed Time: ${formattedElapsedTime}`;
        let description = `Domain: ${domain}\nStart Time: ${new Date(startTimeString).toLocaleString()}\nEnd Time: ${endTime.toLocaleString()}\nElapsed Time: ${formattedElapsedTime}`;
        let icalData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:uid1@${domain}\nDTSTAMP:${formatDateToICal(new Date())}\nORGANIZER;CN=Timer App:MAILTO:no-reply@${domain}\nDTSTART:${formatDateToICal(new Date(startTimeString))}\nDTEND:${formatDateToICal(endTime)}\nSUMMARY:${title}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`;
        let encodedData = encodeURIComponent(icalData);

        let link = document.createElement('a');
        link.href = `data:text/calendar;charset=utf8,${encodedData}`;
        link.download = `event_${Date.now()}.ics`;
        link.click();
    });

    function startTimer() {
        timer = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay(elapsedTime);
            setCookie('timerElapsedTime', elapsedTime, 1);
        }, 1000);
        isRunning = true;
        resetInactivityTimer();
    }

    function updateTimerDisplay(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        timerElement.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    function formatTime(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        return String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    function formatDateToICal(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (isRunning) {
                clearInterval(timer);
                setCookie('timerIsRunning', 'false', 1);
                isRunning = false;
                showMessage();
            }
        }, inactivityTime);
    }

    function showMessage() {
        messageElement.style.display = 'inline-block';
    }

    function hideMessage() {
        messageElement.style.display = 'none';
    }

    // Reset inactivity timer on user interactions
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
}
