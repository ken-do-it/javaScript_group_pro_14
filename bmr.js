document.addEventListener('DOMContentLoaded', (event) => {
    let heightInput = document.getElementById("height-input");
    let weightInput = document.getElementById("weight-input");
    let ageInput = document.getElementById("age");
    let calculateButton = document.getElementById("calculate-button");

    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    heightInput.addEventListener('height-input', validateInput);
    weightInput.addEventListener('weight-input', validateInput);
    ageInput.addEventListener('age', validateInput);
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

        return true;
    };

    const calculateBMR = () => {
        if (!checkForm()) {
            return;
        }

      
    const calculateBMR = (weight, height, age, gender) => {
        if (gender === "Male") {
            return (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(2);
        } else if (gender === "Female") {
            return (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2);
        }
        return 0;
    };

        document.getElementById('bmr-result').innerHTML = `
            Your BMI is: ${bmr}<br>
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
    };

    calculateButton.addEventListener("click", calculateBMR);
});