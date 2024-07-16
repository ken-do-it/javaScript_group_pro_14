const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysContainer = document.getElementById('days');
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

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
    const year = date.getFullYear(); //// 현재 연도 출력
    const month = date.getMonth(); //현재 달
    const firstDayOfMonth = new Date(year, month, 1).getDay(); //해당 월의 첫 번째 날의 요일
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); //해당 월의 마지막 날짜
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();// year와 month에 대해, 이전 달의 마지막 날짜를 가져오는 역할
    
    monthElement.textContent = monthNames[month];
    yearElement.textContent = year.toString();
    
    daysContainer.innerHTML = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('prev-month-day');
        dayElement.textContent = lastDayOfLastMonth - i + 1;
        daysContainer.appendChild(dayElement); 
    } //이전달이 요일 출력
    //firstDayOfMonth: 현재 월의 첫 번째 날의 요일을 나타내는 값으로, 0부터 시작하여 일요일(0)부터 토요일(6)까지의 값을 가집니다.
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        if (i === date.getDate() && year === new Date().getFullYear() 
            && month === new Date().getMonth()) 
        {
            dayElement.classList.add('today');
        }
        daysContainer.appendChild(dayElement);
    }

    const dayElements = daysContainer.querySelectorAll('.days div');
    dayElements.forEach(day => {
        day.style.margin = '20px'; // 일과 일사이 간격주기
    });
}

