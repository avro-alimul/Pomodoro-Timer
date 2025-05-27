// Language translations
const langText = {
    en: {
        title: "Pomodoro Timer",
        work: "Work",
        break: "Break",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        session: "Session"
    },
    bn: {
        title: "পোমোডোরো টাইমার",
        work: "কাজ",
        break: "বিরতি",
        start: "শুরু",
        pause: "থামান",
        reset: "রিসেট",
        session: "সেশন"
    }
};

// Timer configuration
let workDuration = 25 * 60;   // 25 minutes
let breakDuration = 5 * 60;   // 5 minutes
let longBreakDuration = 15 * 60; // 15 minutes
let currentDuration = workDuration;
let isWork = true;
let timerInterval = null;
let currentSession = 1;
let totalSessions = 4;
let currentLanguage = 'en';

// DOM Elements
const title = document.getElementById('title');
const modeLabel = document.getElementById('modeLabel');
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const languageSelect = document.getElementById('language');
const sessionCount = document.getElementById('sessionCount');
const dingSound = document.getElementById('ding');

// Update UI text based on selected language
function updateLanguage() {
    currentLanguage = languageSelect.value;
    title.textContent = langText[currentLanguage].title;
    modeLabel.textContent = isWork ? langText[currentLanguage].work : langText[currentLanguage].break;
    startBtn.textContent = langText[currentLanguage].start;
    pauseBtn.textContent = langText[currentLanguage].pause;
    resetBtn.textContent = langText[currentLanguage].reset;
    sessionCount.textContent = `${langText[currentLanguage].session}: ${currentSession}/${totalSessions}`;
}

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(currentDuration);
}

// Switch between work and break modes
function switchMode() {
    isWork = !isWork;
    modeLabel.textContent = isWork ? langText[currentLanguage].work : langText[currentLanguage].break;
    modeLabel.classList.toggle('break');
    
    if (isWork) {
        currentDuration = workDuration;
        currentSession++;
        if (currentSession > totalSessions) {
            currentSession = 1;
        }
        sessionCount.textContent = `${langText[currentLanguage].session}: ${currentSession}/${totalSessions}`;
    } else {
        currentDuration = currentSession === totalSessions ? longBreakDuration : breakDuration;
    }
    
    updateDisplay();
}

// Start timer
function startTimer() {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
        currentDuration--;
        updateDisplay();
        
        if (currentDuration <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            dingSound.play();
            switchMode();
        }
    }, 1000);
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Reset timer
function resetTimer() {
    pauseTimer();
    isWork = true;
    currentSession = 1;
    currentDuration = workDuration;
    modeLabel.textContent = langText[currentLanguage].work;
    modeLabel.classList.remove('break');
    sessionCount.textContent = `${langText[currentLanguage].session}: ${currentSession}/${totalSessions}`;
    updateDisplay();
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
languageSelect.addEventListener('change', updateLanguage);

// Initialize
updateLanguage();
updateDisplay(); 