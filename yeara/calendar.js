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

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);

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
            dayElement.classList.add('calendar-day'); // 클래스 추가
            if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                dayElement.classList.add('today');
                renderWorkoutInfo(dayElement);
            }
            daysContainer.appendChild(dayElement);
        }
    }

    function renderWorkoutInfo(dayElement) {
        let workoutTime = localStorage.getItem('workoutTime');
        let caloriesBurned = localStorage.getItem('caloriesBurned');

        if (!workoutTime) workoutTime = '0 minutes';
        if (!caloriesBurned) caloriesBurned = '0 kcal';

        const timeContainer = document.createElement('div');
        timeContainer.classList.add('time');
        timeContainer.innerHTML = `<span id="workoutTime"> Exercise - Time: ${workoutTime}</span>`;
        dayElement.appendChild(timeContainer);

        const caloriesContainer = document.createElement('div');
        caloriesContainer.classList.add('calories');
        
        caloriesBurned = parseFloat(caloriesBurned).toFixed(1);
        caloriesContainer.innerHTML = `<span id="caloriesBurned">Burn calories: ${caloriesBurned}</span>`;
        const exerciseRecord = document.getElementById('exercise-burn');
        exerciseRecord.innerHTML = "";
        exerciseRecord.appendChild(timeContainer);
        exerciseRecord.appendChild(caloriesContainer);
    }

    function renderDietRecord() {
        const foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || {};
        const dietRecord = document.getElementById('diet-record');
        dietRecord.innerHTML = '';

        if (foodLogs) {
            for (const date in foodLogs) {
                foodLogs[date].forEach(entry => {
                    dietRecord.innerHTML += `<div>${entry.food}: ${entry.calories.toLocaleString()} kcal</div>`;
                });
            }
        }
    }

    // 캘린더 렌더링 시 식단 기록을 자동으로 표시
    renderDietRecord();
});

let totalWater = localStorage.getItem('totalWater');
    
    // Update #waterIntake content
    if (totalWater !== null) {
        document.getElementById('waterIntake').textContent = `${(totalWater / 1000).toFixed(2)}L`;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const emojiContainer = document.getElementById('emoji');
        const selectedMood = localStorage.getItem('selectedMood');
        const selectedSleepIcon = localStorage.getItem('selectedSleepIcon');
        const selectedPoopIcon = localStorage.getItem('selectedPoopIcon');

        const moodEmojiMap = {
            happy: '😄',
            sad: '😢',
            angry: '😡',
            calm: '😌'
        };
    
        const sleepEmojiMap = {
            good: '💤',
            average: '😴',
            bad: '😵'
        };
    
        const poopEmojiMap = {
            success: '💩',
            gold: '💩🌟',
            hard: '💩😣',
            diarrhea: '💩💦',
            blood: '💩💉'
        };
    
        if (selectedMood && selectedSleepIcon && selectedPoopIcon) {
            const moodElement = document.createElement('div');
            moodElement.textContent = `Mood: ${moodEmojiMap[selectedMood]}`;
    
            const sleepElement = document.createElement('div');
            sleepElement.textContent = `Sleep: ${sleepEmojiMap[selectedSleepIcon]}`;
    
            const poopElement = document.createElement('div');
            poopElement.textContent = `Poop: ${poopEmojiMap[selectedPoopIcon]}`;
    
            emojiContainer.appendChild(moodElement);
            emojiContainer.appendChild(sleepElement);
            emojiContainer.appendChild(poopElement);
        }
    });