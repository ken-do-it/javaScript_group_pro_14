let weightInput = document.getElementById("weight-input");
let heightInput = document.getElementById("height-input");
let ageInput = document.getElementById("age-input");
let bmrCalculateButton = document.getElementById("calculate-bmr");
let bmiCalculateButton = document.getElementById("calculate-bmi");
let resetButton = document.getElementById("reset-button");
let resultDiv = document.getElementById("calculator-result"); // 수정된 부분
let femaleRadio = document.querySelector('input[name="gender"][value="Female"]'); // 수정된 부분
let maleRadio = document.querySelector('input[name="gender"][value="Male"]'); // 수정된 부분
let femaleImage = document.getElementById("female-image");
let maleImage = document.getElementById("male-image");

document.addEventListener('DOMContentLoaded', (event) => {
    weightInput.addEventListener('input', validateInput);
    heightInput.addEventListener('input', validateInput);
    ageInput.addEventListener('input', validateInput);

    femaleRadio.addEventListener('change', () => {
        if (femaleRadio.checked) {
            femaleImage.style.display = 'block';
            maleImage.style.display = 'none';
        }
    });

    maleRadio.addEventListener('change', () => {
        if (maleRadio.checked) {
            femaleImage.style.display = 'none';
            maleImage.style.display = 'block';
        }
    });
});

const validateInput = (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
};

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
    if (!checkForm()) {
        return;
    }

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

    renderResult({
        title: "Your BMR Result",
        weight: weight,
        height: height,
        age: age,
        gender: gender,
        result: `${bmr} Calories / day`
    });
};

const calculateBMI = () => {
    if (!checkForm()) {
        return;
    }

    let weight = parseFloat(weightInput.value);
    let height = parseFloat(heightInput.value);
    let age = parseFloat(ageInput.value);
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

    renderResult({
        title: "Your BMI Result",
        weight: weight,
        height: height,
        age: age,
        gender: gender,
        result: bmi
    });
};

const renderResult = ({ title, weight, height, age, gender, result }) => {
    let resultHTML = `
    <div class="result-container">
            <h2 class="result-title">${title}</h2>
            <div class="result-details">
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Height:</strong> ${height} cm</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Gender:</strong> ${gender}</p>
            </div>
            <p class="result-value">Your result is: <span>${result}</span></p>
            <button type="button" id="reset-button" class="result-reset-button">Reset</button>
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    // Reassign the event listener for the new reset button
    document.getElementById("reset-button").addEventListener("click", resetForm);
};

const resetForm = () => {
    heightInput.value = '';
    weightInput.value = '';
    ageInput.value = '';
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(input => input.checked = false);
    resultDiv.innerHTML = ''; // Clear the result div

    // Hide the images
    femaleImage.style.display = 'none';
    maleImage.style.display = 'none';

    // Optionally, you can set a placeholder text or adjust height of container
    // bodyImgContainer.style.height = '200px'; // Adjust the height as needed
};

bmrCalculateButton.addEventListener("click", calculateBMR);
bmiCalculateButton.addEventListener("click", calculateBMI);
resetButton.addEventListener("click", resetForm);
