let logs = {};

function addLog() {
    const date = document.getElementById('date').value;
    const food = document.getElementById('food').value;
    const calories = document.getElementById('calories').value.replace(/,/g, '');

    if (date && food && calories) {
        if (!logs[date]) {
            logs[date] = [];
        }

        logs[date].push({ food, calories: parseInt(calories) });
        updateLog(date);

        document.getElementById('food').value = '';
        document.getElementById('calories').value = '';
    } else {
        alert('날짜, 음식명과 칼로리를 입력하세요.');
    }
}

function updateLog(date) {
    const log = document.getElementById('log');
    log.innerHTML = '';

    let totalCalories = 0;

    if (logs[date]) {
        logs[date].forEach(entry => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.textContent = `${entry.food}: ${entry.calories.toLocaleString()} 칼로리`;
            log.appendChild(logItem);

            totalCalories += entry.calories;
        });
    }

    document.getElementById('totalCalories').textContent = `총 칼로리: ${totalCalories.toLocaleString()}`;
}

document.getElementById('date').addEventListener('change', (event) => {
    updateLog(event.target.value);
});

document.getElementById('calories').addEventListener('input', (event) => {
    const value = event.target.value.replace(/,/g, '');
    event.target.value = parseInt(value).toLocaleString();

    localStorage.setItem('caloriesBurned', caloriesBurned);
    localStorage.setItem('workoutTime', duration);
});
