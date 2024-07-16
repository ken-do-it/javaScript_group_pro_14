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

    const calculateBMR = () => {
        if (!checkForm()) {
            return;
        }
        if (gender === "Male") {
            bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(2);
        } else if (gender === "Female") {
            bmr = (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2);
        }

        console.log("Calculated BMR:", bmr);


    }
        

    const resetForm = () => {
        heightInput.value = '';
        weightInput.value = '';
        ageInput.value = '';
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        genderInputs.forEach(input => input.checked = false);
    };

    calculateButton.addEventListener("click", calculateBMI);
});