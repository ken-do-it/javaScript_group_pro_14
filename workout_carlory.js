let exercisesPhoto = document.getElementById('exercises-photo')

document.getElementById('weight').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateCalories();
    } //엔터키 활성화
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
    document.getElementById('result').textContent = `Calories Burned: ${caloriesBurned.toFixed(2)} kcal`;
}

document.getElementById('exerciseType').addEventListener('change', function() {
    const exerciseType = document.getElementById('exerciseType').value;
    const exerciseImage = document.getElementById('exerciseImage');
    if (exerciseType === 'boxing') {
        exerciseImage.src = 'imgYR//boxing52.jpg';
    } else if (exerciseType === 'weightlifting') {
        exerciseImage.src = 'imgYR//weight2.jpg';
    } else if (exerciseType === 'aerobic') {
        exerciseImage.src = 'imgYR//aerobic52.jpg';
    } else if (exerciseType === 'squash') {
        exerciseImage.src = 'imgYR//squash52.jpg';
    } else if (exerciseType === 'swimming') {
        exerciseImage.src = 'imgYR//swimming52.jpg';
    }  else if (exerciseType === 'running') {
        exerciseImage.src = 'imgYR//running52.jpg';
    } 
});


//enter 기능 추가시키기
//에어로빅 운동을 선택하면 에어로빅 운동사진이 
// 수영을 선택하면 수영 사진이 img src에 나와야한다 
