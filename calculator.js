document.addEventListener('DOMContentLoaded', (event) => {
    let bmrWeightInput = document.getElementById("bmr-weight-input");
    let bmrHeightInput = document.getElementById("bmr-height-input");
    let bmrAgeInput = document.getElementById("bmr-age-input");
    let bmrCalculateButton = document.getElementById("bmr-calculate-button");
    let bmrResetButton = document.getElementById("bmr-reset-button");
    let bmrResultDiv = document.getElementById("bmr-result");

    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    bmrWeightInput.addEventListener('input', validateInput);
    bmrHeightInput.addEventListener('input', validateInput);
    bmrAgeInput.addEventListener('input', validateInput);

    bmiWeightInput.addEventListener('input', validateInput);
    bmiHeightInput.addEventListener('input', validateInput);
    bmiAgeInput.addEventListener('input', validateInput);


    const bmrFromCheck = () => {
        if (bmrHeightInput.value === '') {
            alert("Please enter your height");
            bmrHeightInput.focus();
            return false;
        }

        if (bmrWeightInput.value === '') {
            alert("Please enter your weight");
            bmrWeightInput.focus();
            return false;
        }

        if (bmrAgeInput.value === '') {
            alert("Please enter your age");
            bmrAgeInput.focus();
            return false;
        }

        const bmrSelectedGender = document.querySelector('input[name="gender"]:checked');
        if (!selectedGender) {
            alert("Please select your gender");
            return false;
        }

        return true;
    };

    const calculateBMR = () => {
        if (!checkForm()) {
            return;
        }

        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseFloat(ageInput.value);
        const gender = document.querySelector('input[name="gender"]:checked').value;

        let bmr = 0;

        if (gender === "Male") {
            bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(2);
        } else if (gender === "Female") {
            bmr = (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2);
        }

        console.log("Calculated BMR:", bmr);

        bmrResultDiv.innerHTML = `
            <h2>Your BMR Result</h2>
            <div>
                Weight: ${weight} kg <br>
                Height: ${height} cm <br>
                Age: ${age} <br>
                Gender: ${gender} <br>
            </div>
            Your BMR is: ${bmr} Calories / day
        `;
    };

    const calculateBMI = () => {
        if (!checkForm()) {
            return;
        }
        
        let height = parseFloat(heightInput.value);
        let weight = parseFloat(weightInput.value);
        let age = parseFloat(ageInput.value);
        let genderInput = document.querySelector('input[name="gender"]:checked');
        let gender = genderInput.value;
        let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

        document.getElementById('bmi-result').innerHTML = `
            Your BMI is: ${bmi}<br>
            Height: ${heightInput.value} cm<br>
            Weight: ${weightInput.value} kg<br>
            Age: ${ageInput.value}<br>
            Gender: ${gender}
        `;
        resetForm();
    };


    const resetForm = () => {
        heightInput.value = '';
        weightInput.value = '';
        ageInput.value = '';
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        genderInputs.forEach(input => input.checked = false);
        bmrResultDiv.innerHTML = ''; // Clear the result div
    };

    calculateButton.addEventListener("click", calculateBMR);
    resetButton.addEventListener("click", resetForm);
    calculateButton.addEventListener("click", calculateBMI);
});
