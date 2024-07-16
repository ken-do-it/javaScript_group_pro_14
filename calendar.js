const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysContainer = document.getElementById('days');
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();
    
    monthElement.textContent = monthNames[month];
    yearElement.textContent = year.toString();
    
    daysContainer.innerHTML = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('prev-month-day');
        dayElement.textContent = lastDayOfLastMonth - i + 1;
        daysContainer.appendChild(dayElement);
    }
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        if (i === date.getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            dayElement.classList.add('today');
        }
        daysContainer.appendChild(dayElement);
    }

    const dayElements = daysContainer.querySelectorAll('.days div');
    dayElements.forEach(day => {
        day.style.margin = '20px'; // 일과 일사이 간격주기
    });
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
