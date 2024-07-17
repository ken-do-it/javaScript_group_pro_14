
document.addEventListener('DOMContentLoaded', function() {
    let caloriesBurned = localStorage.getItem('caloriesBurned');
    let workoutTime = localStorage.getItem('workoutTime');
    
    if (caloriesBurned) {
        caloriesBurned = parseFloat(caloriesBurned).toFixed(0);//소수점 반올림
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
