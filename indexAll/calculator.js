document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById("weight-input");
    let heightInput = document.getElementById("height-input");
    let ageInput = document.getElementById("age-input");
    let bmrCalculateButton = document.getElementById("bmr-calculate-button");
    let bmiCalculateButton = document.getElementById("bmi-calculate-button");
    let resetButton = document.getElementById("reset-button");
    let resultDiv = document.querySelector('.result-analysis');

    // Checks whether the input is string or number
    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    // Validates input from the above function
    weightInput.addEventListener('input', validateInput);
    heightInput.addEventListener('input', validateInput);
    ageInput.addEventListener('input', validateInput);

    // Checks the form for missing inputs
    const checkForm = () => {
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        if (!selectedGender) {
            alert("Please select your gender");
            return false;
        }

        if (ageInput.value === '') {
            alert("Please enter your age");
            ageInput.focus();
            return false;
        }

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
            type: 'BMR',
            result: `${bmr} Calories / day`,
            explanation: `Your BMR (Basal Metabolic Rate) indicates the number of calories your body needs to maintain basic physiological functions at rest. This is the minimum amount of calories you need to keep your body functioning, even when you are not physically active.`
        });
    };

    const calculateBMI = () => {
        if (!checkForm()) {
            return;
        }

        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);

        let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

        let bmiCategory = '';
        if (bmi < 16) bmiCategory = 'Severe Thinness';
        else if (bmi < 17) bmiCategory = 'Moderate Thinness';
        else if (bmi < 18.5) bmiCategory = 'Mild Thinness';
        else if (bmi < 25) bmiCategory = 'Normal';
        else if (bmi < 30) bmiCategory = 'Overweight';
        else if (bmi < 35) bmiCategory = 'Obese Class I';
        else if (bmi < 40) bmiCategory = 'Obese Class II';
        else bmiCategory = 'Obese Class III';

        renderResult({
            type: 'BMI',
            result: `${bmi}`,
            explanation: `Your BMI (Body Mass Index) is a measure of your body weight relative to your height. A BMI in the ${bmiCategory} range can indicate whether you are underweight, normal weight, overweight, or obese.`
        });
    };

    const renderResult = ({ type, result, explanation }) => {
        let resultHTML = `
            <div class="result-container">
                <h2 class="result-title">Your ${type} Result:</h2>
                <p class="result-value">Your ${type} is: <span>${result}</span></p>
                <p class="result-explanation">${explanation}</p>
            </div>
        `;

        resultDiv.innerHTML = resultHTML;
        // Reassign the event listener for the new reset button
        resetButton.addEventListener("click", resetForm);
    };

    const resetForm = () => {
        heightInput.value = '';
        weightInput.value = '';
        ageInput.value = '';
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        genderInputs.forEach(input => input.checked = false);
        resultDiv.innerHTML = ''; // Clear the result div
    };

    bmrCalculateButton.addEventListener("click", calculateBMR);
    bmiCalculateButton.addEventListener("click", calculateBMI);
    resetButton.addEventListener("click", resetForm);
});
