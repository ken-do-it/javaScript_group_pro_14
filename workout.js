function calculateCalories() {
    const exerciseType = document.getElementById('exerciseType').value;
    const intensity = document.getElementById('intensity').value;
    const duration = document.getElementById('duration').value;
    const weight = document.getElementById('weight').value;

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
    document.getElementById('result').textContent = `Calories Burned: ${caloriesBurned.toFixed(2)} kcal`;
}