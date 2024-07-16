
document.addEventListener('DOMContentLoaded', function() {
    let caloriesBurned = localStorage.getItem('caloriesBurned');
    let workoutTime = localStorage.getItem('workoutTime');
    
    if (caloriesBurned) {
        caloriesBurned = parseFloat(caloriesBurned).toFixed(2);//소수점 2자리까지 반올림
        document.getElementById('caloriesBurned').innerHTML = `<i class="fa-solid fa-fire" style=color:red;></i> Burn calories: ${caloriesBurned} kcal`;
    } else {
        document.getElementById('caloriesBurned').textContent = 'Burn calories: 0 kcal';
    }

    if (workoutTime) {
        document.getElementById('workoutTimeDisplay').textContent = workoutTime;
    } else {
        document.getElementById('workoutTimeDisplay').textContent = '0';
    }
});
