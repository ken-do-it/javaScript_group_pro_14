let logs = JSON.parse(localStorage.getItem('foodLogs')) || {};

// side menu hamburger
function openMenu() {
    document.getElementById("slideMenu").style.width = "250px";
}

function closeMenu() {
    document.getElementById("slideMenu").style.width = "0";
}

document.querySelectorAll('.slide-menu a').forEach(item => {
    item.addEventListener('click', event => {
        closeMenu();
    });
});

function addLog() {
    const date = document.getElementById('date').value;
    const food = document.getElementById('food').value;
    const calories = document.getElementById('calories').value.replace(/,/g, '');

    if (date && food && calories && !isNaN(calories)) {
        if (!logs[date]) {
            logs[date] = [];
        }

        logs[date].push({ food, calories: parseInt(calories) });
        updateLog(date);

        // Store logs in localStorage
        localStorage.setItem('foodLogs', JSON.stringify(logs));

        document.getElementById('food').value = '';
        document.getElementById('calories').value = '';
    } else {
        alert('Please enter the date, food name, and valid calories.');
    }
}

function updateLog(date) {
    const log = document.getElementById('log');
    log.innerHTML = '';

    let totalCalories = 0;

    if (logs[date]) {
        logs[date].forEach((entry, index) => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `
                ${entry.food}: ${entry.calories.toLocaleString()} calories
                <div class="edit_del_icon">
                <button onclick="editLog('${date}', ${index})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteLog('${date}', ${index})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `;
            log.appendChild(logItem);

            totalCalories += entry.calories;
        });
    }

    document.getElementById('totalCalories').textContent = `Total Calories: ${totalCalories.toLocaleString()}`;
    localStorage.setItem('totalCalories', totalCalories);
}

function editLog(date, index) {
    const entry = logs[date][index];
    document.getElementById('food').value = entry.food;
    document.getElementById('calories').value = entry.calories.toLocaleString();
    deleteLog(date, index);
}

function deleteLog(date, index) {
    logs[date].splice(index, 1);
    if (logs[date].length === 0) {
        delete logs[date];
    }
    updateLog(date);
    localStorage.setItem('foodLogs', JSON.stringify(logs));
}

document.getElementById('date').addEventListener('change', (event) => {
    updateLog(event.target.value);
});

document.getElementById('food').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('calories').focus();
    }
});

document.getElementById('calories').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addLog();
    }
});

document.getElementById('calories').addEventListener('input', (event) => {
    const value = event.target.value.replace(/,/g, '');
    if (isNaN(value)) {
        alert('Only numbers please');
        event.target.value = '';
    } else {
        event.target.value = parseInt(value).toLocaleString();
    }
});

// Load logs from localStorage on page load
window.addEventListener('load', () => {
    const date = document.getElementById('date').value;
    if (date) {
        updateLog(date);
    }
});
