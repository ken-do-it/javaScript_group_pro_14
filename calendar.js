document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const daysContainer = document.getElementById('days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const today = new Date();
    let currentDate = new Date();

    // 이전 월 버튼 클릭 시
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // 다음 월 버튼 클릭 시
    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 캘린더 초기 렌더링
    renderCalendar(currentDate);

    // 캘린더 렌더링 함수
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();

        monthElement.textContent = monthNames[month];
        yearElement.textContent = year.toString();

        daysContainer.innerHTML = "";

        // 이전 달 날짜 렌더링
        for (let i = firstDayOfMonth; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('prev-month-day');
            dayElement.textContent = lastDayOfLastMonth - i + 1;
            daysContainer.appendChild(dayElement);
        }

        // 현재 달 날짜 렌더링
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                dayElement.classList.add('today');
                renderWorkoutInfo(dayElement);
            }
            daysContainer.appendChild(dayElement);
        }
    }

    // 오늘의 운동 정보 렌더링 함수
    function renderWorkoutInfo(dayElement) {
        let workoutTime = localStorage.getItem('workoutTime');
        let caloriesBurned = localStorage.getItem('caloriesBurned');

        if (!workoutTime) workoutTime = '0 minutes';
        if (!caloriesBurned) caloriesBurned = '0 kcal';

        const timeContainer = document.createElement('div');
        timeContainer.classList.add('time');
        timeContainer.innerHTML = `<span id="workoutTime">Time: ${workoutTime}</span>`;
        dayElement.appendChild(timeContainer);

        const caloriesContainer = document.createElement('div');
        caloriesContainer.classList.add('calories');
        
        caloriesBurned = parseFloat(caloriesBurned).toFixed(1)
        caloriesContainer.innerHTML = `<span id="caloriesBurned">calories: ${caloriesBurned}</span>`;
        dayElement.appendChild(caloriesContainer);
    }

    const dayElements = daysContainer.querySelectorAll('.days div');
    dayElements.forEach(day => {
        day.style.padding = '50px'; // Adjusting space between days
    });
});
