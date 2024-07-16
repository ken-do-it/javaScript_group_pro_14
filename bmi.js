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

    const calculateBMI = () => {
        if (!checkForm()) {
            return;
        }

        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const age = parseFloat(ageInput.value);
        const genderInput = document.querySelector('input[name="gender"]:checked');
        const gender = genderInput.value;
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
    };

    calculateButton.addEventListener("click", calculateBMI);
});