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
        alert('Please enter the date, food name, and calories.');
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
            logItem.textContent = `${entry.food}: ${entry.calories.toLocaleString()} calories`;
            log.appendChild(logItem);

            totalCalories += entry.calories;
        });
    }

    document.getElementById('totalCalories').textContent = `Total Calories: ${totalCalories.toLocaleString()}`;
}

document.getElementById('date').addEventListener('change', (event) => {
    updateLog(event.target.value);
});

document.getElementById('calories').addEventListener('input', (event) => {
    const value = event.target.value.replace(/,/g, '');
    event.target.value = parseInt(value).toLocaleString();
});
