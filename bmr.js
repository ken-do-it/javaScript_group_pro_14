document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById("weight-input");
    let heightInput = document.getElementById("height-input");
    let ageInput = document.getElementById("age-input");
    let calculateButton = document.getElementById("calculate-button");
    let resetButton = document.getElementById("reset-button");
    let bmrResultDiv = document.getElementById("bmr-result");

    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    weightInput.addEventListener('input', validateInput);
    heightInput.addEventListener('input', validateInput);
    ageInput.addEventListener('input', validateInput);

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

        const selectedGender = document.querySelector('input[name="gender"]:checked');
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
});
