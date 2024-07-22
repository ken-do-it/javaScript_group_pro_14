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
    animateWaterFigure(waterLiters);

    document.getElementById('water_figure').innerHTML = `${waterLiters}L`;

    if (totalWater > 2100) {
      showResult('Excessive water intake!', 'Recommended: 2 - 2.1L.', true);
      goodHeart.classList.remove('great_heart');
      document.getElementById('container_cup').style.borderColor = '#F1627D';
    } else if (totalWater >= recommendedWaterAmount) {
      showResult('Sufficient intake!', '', false);
      document.getElementById('container_cup').style.borderColor = '#4beaff';
      goodHeart.classList.add('great_heart');
      showResult('Sufficient intake!', '');

      fireConfetti();
    } else {
      let additionalWater = recommendedWaterAmount - totalWater;
      showResult(
        'Insufficient water intake!',
        `Drink an additional  ${additionalWater}ml Water.`,
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

    // 확인 필요 2
    // localStorage.setItem(currentDate, dailyTotalWater); 승혁님꺼

    localStorage.setItem('totalWater', totalWater); //예라
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

  if (message === 'Sufficient intake!') {
    smileyElement.textContent = '😊';
    // fireConfetti();
  } else if (message === 'Insufficient water intake!') {
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

// 승혁님꺼
//confetti
// function fireConfetti() {
//   const count = 200,
//     defaults = {
//       origin: { y: 0.7 },
//     };

//   function fire(particleRatio, opts) {
//     confetti(
//       Object.assign({}, defaults, opts, {
//         particleCount: Math.floor(count * particleRatio),
//       })
//     );
//   }

//   fire(0.25, {
//     spread: 26,
//     startVelocity: 55,
//   });

//   fire(0.2, {
//     spread: 60,
//   });

//   fire(0.35, {
//     spread: 100,
//     decay: 0.91,
//     scalar: 0.8,
//   });

//   fire(0.1, {
//     spread: 120,
//     startVelocity: 25,
//     decay: 0.92,
//     scalar: 1.2,
//   });

//   fire(0.1, {
//     spread: 120,
//     startVelocity: 45,
//   });
// }

//승혁님꺼

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

function animateWaterFigure(targetValue) {
  let currentValue = parseFloat(
    document.getElementById('water_figure').textContent
  );
  targetValue = parseFloat(targetValue);

  let increment = (targetValue - currentValue) / 50;

  let interval = setInterval(function () {
    currentValue += increment;
    document.getElementById('water_figure').textContent =
      currentValue.toFixed(2) + 'L';

    if (currentValue.toFixed(2) === targetValue.toFixed(2)) {
      clearInterval(interval);
    }
  }, 20);
}

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