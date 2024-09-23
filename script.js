let startTime;
let timerInterval;

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timer');
const postArea = document.getElementById('postArea');
const wordCountDisplay = document.getElementById('wordCount');
const themeButton = document.getElementById('themeButton');
const progress = document.getElementById('progress');
const goalInput = document.getElementById('goalInput');

startButton.addEventListener('click', () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    startButton.disabled = false;
});

postArea.addEventListener('input', updateWordCount);

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateWordCount() {
    const text = postArea.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    wordCountDisplay.textContent = wordCount;

    const goal = parseInt(goalInput.value) || 150; // Цель по умолчанию 150 слов
    const progressPercentage = Math.min((wordCount / goal) * 100, 100);
    progress.style.width = `${progressPercentage}%`;

    // Изменение цвета прогресс-бара при достижении цели
    if (progressPercentage === 100) {
        progress.style.backgroundColor = '#4caf50'; // Зеленый цвет при достижении цели
    } else {
        progress.style.backgroundColor = '#6200ea'; // Основной цвет
    }
}

// Переключение темы
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    postArea.classList.toggle('dark');
    startButton.classList.toggle('dark');
    resetButton.classList.toggle('dark');
    themeButton.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        themeButton.textContent = 'Switch to Light Theme';
    } else {
        themeButton.textContent = 'Switch to Dark Theme';
    }
});
