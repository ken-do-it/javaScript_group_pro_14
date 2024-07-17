checkResetTime();

let totalWater = 0;

document
  .getElementById('waterIntakeForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    let waterAmount = parseInt(document.getElementById('waterAmount').value);

    const recommendedWaterAmount = 2000;

    totalWater += waterAmount;

    let waterHeight = (totalWater / recommendedWaterAmount) * 100;
    if (waterHeight > 100) waterHeight = 100;

    document.getElementById('water').style.height = waterHeight + '%';
    let waterLiters = (totalWater / 1000).toFixed(2);
    document.getElementById('water_figure').innerHTML = `${waterLiters}L`;
    if (totalWater > 2100) {
      showResult('수분 섭취량이 과다합니다!', '권장량은 2 ~ 2.1L 입니다.');
    } else if (totalWater >= recommendedWaterAmount) {
      showResult('충분한 섭취량 입니다!', '');

      fireConfetti();

    } else {
      let additionalWater = recommendedWaterAmount - totalWater;
      showResult(
        '수분 섭취가 부족합니다.',
        `추가로 ${additionalWater}ml의 물을 더 마셔야 합니다.`
      );
    }
    document.getElementById('waterAmount').value = '';

    localStorage.setItem('totalWater', totalWater);//예라
  });

function showResult(message, additionalMessage) {
  let resultElement = document.getElementById('evaluationResult');
  let additionalWaterElement = document.getElementById('additionalWater');
  resultElement.textContent = message;
  additionalWaterElement.textContent = additionalMessage;
  document.getElementById('result').style.display = 'block';
}

function checkResetTime() {
  let lastResetTime = localStorage.getItem('lastResetTime');
  if (!lastResetTime) {
    localStorage.setItem('lastResetTime', Date.now());
    localStorage.setItem('totalWater', 0);
  } else {
    let currentTime = Date.now();
    let elapsed = currentTime - lastResetTime;
    let hoursElapsed = elapsed / (1000 * 60 * 60);
    if (hoursElapsed >= 24) {
      localStorage.setItem('lastResetTime', currentTime);
      localStorage.setItem('totalWater', 0);
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