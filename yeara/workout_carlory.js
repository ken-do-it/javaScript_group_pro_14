document.getElementById('weight').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateCalories();
    }
});

function calculateCalories() {
    let exerciseType = document.getElementById('exerciseType').value;
    let intensity = document.getElementById('intensity').value;
    let duration = document.getElementById('duration').value;
    let weight = document.getElementById('weight').value;

    if (!duration || !weight) {
        alert('Please fill out all input fields.');
        return;
    }

    let metValue;

    switch (exerciseType) {
        case 'aerobic':
            metValue = intensity === 'low' ? 4 : intensity === 'medium' ? 6 : 8;
            break;
        case 'weightlifting':
            metValue = intensity === 'low' ? 3 : intensity === 'medium' ? 4 : 6;
            break;
        case 'squash':
            metValue = intensity === 'low' ? 5 : intensity === 'medium' ? 7 : 9;
            break;
        case 'swimming':
            metValue = intensity === 'low' ? 5 : intensity === 'medium' ? 7 : 9;
            break;
        case 'running':
            metValue = intensity === 'low' ? 6 : intensity === 'medium' ? 8 : 10;
            break;
        case 'boxing':
            metValue = intensity === 'low' ? 6 : intensity === 'medium' ? 8 : 10;
            break;
        default:
            metValue = 0;
    }

    const caloriesBurned = (metValue * weight * duration) / 60;
    document.getElementById('result').innerHTML = `<i class="fa-solid fa-fire" style=color:red;></i> Calories Burned: ${caloriesBurned.toFixed(2)} kcal`;

    // Store values in localStorage
    localStorage.setItem('caloriesBurned', caloriesBurned);
    localStorage.setItem('workoutTime', duration);
}

document.getElementById('exerciseType').addEventListener('change', function() {
    const exerciseType = document.getElementById('exerciseType').value;
    const exerciseImage = document.getElementById('exerciseImage');
    switch (exerciseType) {
        case 'boxing':
            exerciseImage.src = '../imgYR/boxing52.jpg';
            break;
        case 'weightlifting':
            exerciseImage.src = '../imgYR/weight2.jpg';
            break;
        case 'aerobic':
            exerciseImage.src = '../imgYR/aerobic52.jpg';
            break;
        case 'squash':
            exerciseImage.src = '../imgYR/squash52.jpg';
            break;
        case 'swimming':
            exerciseImage.src = '../imgYR/swimming52.jpg';
            break;
        case 'running':
            exerciseImage.src = '../imgYR/running52.jpg';
            break;
    }
});

function goBack() {
    window.history.back();
}

function goMain() {
    window.location.href = '/index.html';
  }
  
