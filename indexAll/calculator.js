document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById("weight-input");
    let heightInput = document.getElementById("height-input");
    let ageInput = document.getElementById("age-input");
    let calculateStatusButton = document.getElementById("calculate-status");
    let resetButton = document.getElementById("reset-button");
    let resultSection = document.getElementById("calculator-result");
    let femaleRadio = document.getElementById("female-radio");
    let maleRadio = document.getElementById("male-radio");
    let femaleImage = document.getElementById("female-image");
    let maleImage = document.getElementById("male-image");
    let defaultImage = document.getElementById("default-image");

    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
          const content = button.nextElementSibling;
          content.classList.toggle('show');
        });
      });

    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    weightInput.addEventListener('input', validateInput);
    heightInput.addEventListener('input', validateInput);
    ageInput.addEventListener('input', validateInput);

    femaleRadio.addEventListener('change', () => {
        if (femaleRadio.checked) {
            femaleImage.style.display = 'block';
            maleImage.style.display = 'none';
            defaultImage.style.display = 'none';
        }
    });

    maleRadio.addEventListener('change', () => {
        if (maleRadio.checked) {
            femaleImage.style.display = 'none';
            maleImage.style.display = 'block';
            defaultImage.style.display = 'none';
        }
    });

    const checkForm = () => {
        if (heightInput.value === '') {
            alert("Please enter your height");
            heightInput.focus();
            return false;
        }

        if (weightInput.value === '') {
            alert("Please enter your weight");
            weightInput.focus();
            return false;
        }

        if (ageInput.value === '') {
            alert("Please enter your age");
            ageInput.focus();
            return false;
        }

        return true;
    };

    const calculateBMR = () => {
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        let age = parseFloat(ageInput.value);
        let gender = document.querySelector('input[name="gender"]:checked').value;

        let bmr = 0;

        if (gender === "Male") {
            bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(2);
        } else if (gender === "Female") {
            bmr = (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2);
        }

        return bmr;
    };

    const calculateBMI = () => {
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);

        let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

        return bmi;
    };

    const showResults = () => {
        if (!checkForm()) {
            return;
        }

        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        let age = parseFloat(ageInput.value);
        let gender = document.querySelector('input[name="gender"]:checked').value;

        let bmr = calculateBMR();
        let bmi = calculateBMI();

        renderResult({
            title: "Your Body Status",
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            bmrResult: bmr,
            bmiResult: bmi
        });
    };

    const renderResult = ({ title, weight, height, age, gender, bmrResult, bmiResult }) => {
        let resultHTML = `
         <div class="result-container">
            <h2 class="result-title">${title}</h2>
            <div class="result-details">
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Height:</strong> ${height} cm</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Gender:</strong> ${gender}</p>
            </div>
            <p class="result-value">Your BMI result is: <span>${bmiResult}</span></p>
            <p class="result-value">Your BMR result is: <span>${bmrResult} Calories / day</span></p>
        </div>
        `;

      
        resultSection.innerHTML =resultHTML;
        resultSection.style.border = '2px solid #ffc107';
        // Reassign the event listener for the new reset button
        document.getElementById("reset-button").addEventListener("click", resetForm);
    };

    const resetForm = () => {
        heightInput.value = '';
        weightInput.value = '';
        ageInput.value = '';
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        genderInputs.forEach(input => input.checked = false);
        resultSection.innerHTML = ''; // Clear the result div
        resultSection.style.border = 'none'
        // Hide the images
        femaleImage.style.display = 'none';
        maleImage.style.display = 'none';
        defaultImage.style.display = 'block';
    };

    calculateStatusButton.addEventListener("click", showResults);
    resetButton.addEventListener("click", resetForm);

    


const renderResultTable = () => {
    resultAccordionHTML =`
    <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
                  What is Basal Metabolic Rate?
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>BMR</strong> (Basal Metabolic Rate) is the number of calories your body needs to perform basic
                  life-sustaining functions (like breathing and circulation) while at rest. It reflects the energy
                  required to maintain vital bodily functions without any physical activity. BMR is influenced by
                  factors such as age, sex, weight, and height, and it's used to estimate total daily calorie needs when
                  combined with activity levels.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  What is BMI?
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>BMI</strong> (Body Mass Index) is a measure that uses an individual's weight and height to
                  classify them into different categories to assess whether they have a healthy body weight for their
                  height. The BMI categories are:
                  <li>
                    <ul>Underweight: BMI less than 18.5</ul>
                    <ul>Normal weight: BMI 18.5 to 24.9</ul>
                    <ul>Overweight: BMI 25 to 29.9</ul>
                    <ul>Obesity: BMI 30 or greater</ul>
                  </li>
                  While BMI is useful for screening potential weight problems, it doesn't directly measure body fat and
                  can sometimes be misleading, especially for athletes with high muscle mass.
                </div>
              </div>
            </div>
          </div>`

}
});