
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

// side menu hamburger
function openMenu() {
    document.getElementById("slideMenu").style.width = "250px";
    document.getElementById("menuIcon").style.display = "none"; // 아이콘 숨기기
}

function closeMenu() {
    document.getElementById("slideMenu").style.width = "0";
    document.getElementById("menuIcon").style.display = "block"; // 아이콘 보이기
}

document.querySelectorAll('.slide-menu a').forEach(item => {
    item.addEventListener('click', event => {
        closeMenu();
    });
});

