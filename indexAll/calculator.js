document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById("weight-input");
    let heightInput = document.getElementById("height-input");
    let ageInput = document.getElementById("age-input");
    let bmrCalculateButton = document.getElementById("calculate-bmr");
    let bmiCalculateButton = document.getElementById("calculate-bmi");
    let resetButton = document.getElementById("reset-button");
    let resultDiv = document.querySelector(".result-section");
    let femaleRadio = document.getElementById("female-radio");
    let maleRadio = document.getElementById("male-radio");
    let femaleImage = document.getElementById("female-image");
    let maleImage = document.getElementById("male-image");

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
        }
    });

    maleRadio.addEventListener('change', () => {
        if (maleRadio.checked) {
            femaleImage.style.display = 'none';
            maleImage.style.display = 'block';
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
            <h2>${title}</h2>
            <div>
                Weight: ${weight} kg <br>
                Height: ${height} cm <br>
                Age: ${age} <br>
                Gender: ${gender} <br>
            </div>
            Your result is: ${result}
            <br><button type="button" id="reset-button">Reset</button>
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
});
