checkResetTime();

let totalWater = 0;

document
  .getElementById('waterIntakeForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    let waterAmount = parseInt(document.getElementById('waterAmount').value);
    let goodHeart = document.getElementById('water_heart_emoji');

    const recommendedWaterAmount = 2000;

    totalWater += waterAmount;
    localStorage.setItem('totalWater', totalWater);

    let waterHeight = (totalWater / recommendedWaterAmount) * 100;
    if (waterHeight > 100) waterHeight = 100;

    document.getElementById('water').style.height = waterHeight + '%';
    let waterLiters = (totalWater / 1000).toFixed(2);
    document.getElementById('water_figure').innerHTML = `${waterLiters}L`;

    if (totalWater > 2100) {
      showResult(
        '수분 섭취량이 과다합니다!',
        '권장량은 2 ~ 2.1L 입니다.',
        true
      );
      goodHeart.classList.remove('great_heart');
      document.getElementById('container_cup').style.borderColor = '#e20202';
    } else if (totalWater >= recommendedWaterAmount) {
      showResult('충분한 섭취량 입니다!', '', false);
      document.getElementById('container_cup').style.borderColor = '#4beaff';
      goodHeart.classList.add('great_heart');
    } else {
      let additionalWater = recommendedWaterAmount - totalWater;
      showResult(
        '수분 섭취가 부족합니다.',
        `추가로 ${additionalWater}ml의 물을 더 마셔야 합니다.`,
        false
      );
    }
    document.getElementById('waterAmount').value = '';

    // local storage
    let currentDate = new Date().toISOString().split('T')[0];
    let dailyTotalWater = localStorage.getItem(currentDate)
      ? parseInt(localStorage.getItem(currentDate))
      : 0;
    dailyTotalWater += waterAmount;
    localStorage.setItem(currentDate, dailyTotalWater);
  });

function showResult(message, additionalMessage, isWarning) {
  let resultElement = document.getElementById('evaluationResult');
  let additionalWaterElement = document.getElementById('additionalWater');
  let smileyElement = document.getElementById('smiley');
  let resultContainer = document.getElementById('result');
  let waterElement = document.getElementById('water');
  let cup = document.getElementById('container_cup');
  let skullWarning = document.getElementById('water_skull_emoji');

  resultElement.textContent = message;
  additionalWaterElement.textContent = additionalMessage;

  if (message === '충분한 섭취량 입니다!') {
    smileyElement.textContent = '😊';
    fireConfetti();
  } else if (message === '수분 섭취가 부족합니다.') {
    smileyElement.textContent = '😔';
  } else {
    smileyElement.textContent = '😫';
  }

  if (isWarning) {
    resultContainer.classList.add('warning');
    waterElement.classList.add('warning_water');
    cup.classList.add('warning_cup');
    skullWarning.classList.add('warning_skull');
  } else {
    resultContainer.classList.remove('warning');
    waterElement.classList.remove('warning_water');
    cup.classList.remove('warning_cup');
    skullWarning.classList.remove('warning_skull');
  }

  resultContainer.style.opacity = '1';
}

//  function to retrieve the daily water intake from local storage
function getDailyWaterIntake(date) {
  return localStorage.getItem(date);
}

function checkResetTime() {
  let lastResetTime = localStorage.getItem('lastResetTime');
  if (!lastResetTime) {
    localStorage.setItem('lastResetTime', Date.now());
    localStorage.setItem('totalWater', 0);
    localStorage.removeItem('dailyWaterIntake');
  } else {
    let currentTime = Date.now();
    let elapsed = currentTime - lastResetTime;
    let hoursElapsed = elapsed / (1000 * 60 * 60);
    if (hoursElapsed >= 24) {
      localStorage.setItem('lastResetTime', currentTime);
      localStorage.setItem('totalWater', 0);
      localStorage.removeItem('dailyWaterIntake');
    }
  }
}

//confetti
function fireConfetti() {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
