document.addEventListener('DOMContentLoaded', (event) => {
    let weightInput = document.getElementById("weight-input");
    let heightInput = document.getElementById("height-input");
    let ageInput = document.getElementById("age-input");
    let bmrCalculateButton = document.getElementById("bmr-calculate-button");
    let bmiCalculateButton = document.getElementById("bmi-calculate-button");
    let resetButton = document.getElementById("reset-button");
    let resultDiv = document.querySelector('.result-analysis');
    let femaleRadio = document.getElementById("female-radio");
    let maleRadio = document.getElementById("male-radio");
    let femaleImage = document.getElementById("female-image");
    let maleImage = document.getElementById("male-image");
    let defaultImage = document.getElementById("default-image");

    // Store the original HTML of the .result-analysis section
    const originalResultHTML = resultDiv.innerHTML;

    // Checks whether the input is string or number
    const validateInput = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    // Validates input from the above function
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
            explanation: `Your BMR (Basal Metabolic Rate) indicates the number of calories your body needs to maintain basic physiological functions at rest. This is the minimum amount of calories you need to keep your body functioning, even when you are not physically active.`,
            bmr: parseFloat(bmr) // Ensure bmr is passed as a number
        });
    };

    const getBMICategory = (bmi) => {
        if (bmi < 16) return 'Severely underweight';
        if (bmi < 16.9) return 'Underweight';
        if (bmi < 18.5) return 'Mildly underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        if (bmi < 35) return 'Obesity Class I';
        if (bmi < 40) return 'Obesity Class II';
        return 'Obesity Class III';
    };
    
    const calculateBMI = () => {
        if (!checkForm()) {
            return;
        }
    
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
    
        let bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
        let bmiCategory = getBMICategory(bmi);
    
        renderResult({
            type: 'BMI',
            result: `${bmi}`,
            explanation: `Your BMI (Body Mass Index) is a measure of your body weight relative to your height. A BMI in the ${bmiCategory} range can indicate whether you are underweight, normal weight, overweight, or obese.`,
            bmr: 0 // Not used for BMI but required to maintain the function signature
        });
    };

    const renderResult = ({ type, result, explanation, bmr }) => {
        let additionalInfoHTML = '';
    
        if (type === 'BMI') {
            additionalInfoHTML = `
                <div class="bmi-table">
                    <h3>BMI Classification</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Classification</th>
                                <th>BMI Range (kg/m<sup>2</sup>)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-danger">
                                <td>Severe Thinness</td>
                                <td>&lt; 16</td>
                            </tr>
                            <tr class="table-warning">
                                <td>Moderate Thinness</td>
                                <td>16 - 17</td>
                            </tr>
                            <tr class="table-warning">
                                <td>Mild Thinness</td>
                                <td>17 - 18.5</td>
                            </tr>
                            <tr class="table-success">
                                <td>Normal</td>
                                <td>18.5 - 25</td>
                            </tr>
                            <tr class="table-warning">
                                <td>Overweight</td>
                                <td>25 - 30</td>
                            </tr>
                            <tr class="table-danger">
                                <td>Obese Class I</td>
                                <td>30 - 35</td>
                            </tr>
                            <tr class="table-danger">
                                <td>Obese Class II</td>
                                <td>35 - 40</td>
                            </tr>
                            <tr class="table-danger">
                                <td>Obese Class III</td>
                                <td>&gt; 40</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (type === 'BMR') {
            additionalInfoHTML = `
                <div class="bmr-table">
                    <h6>Daily Calorie Needs</h6>
                    <p>Your BMR is the number of calories your body needs to maintain basic physiological functions at rest. To estimate your daily calorie needs, you can multiply your BMR by an activity factor based on your level of physical activity:</p>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Activity Level</th>
                                <th>Multiplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sedentary (little or no exercise)</td>
                                <td>1.2</td>
                            </tr>
                            <tr>
                                <td>Lightly active (light exercise/sports 1-3 days/week)</td>
                                <td>1.375</td>
                            </tr>
                            <tr>
                                <td>Moderately active (moderate exercise/sports 3-5 days/week)</td>
                                <td>1.55</td>
                            </tr>
                            <tr>
                                <td>Very active (hard exercise/sports 6-7 days a week)</td>
                                <td>1.725</td>
                            </tr>
                            <tr>
                                <td>Extra active (very hard exercise/physical job)</td>
                                <td>1.9</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>For example, if your BMR is ${result} and you are moderately active, your estimated daily caloric needs would be: <strong>${(bmr * 1.55).toFixed(2)} Calories/day</strong>.</p>
                </div>
            `;
        }
    
        let resultHTML = `
            <div class="result-container">
                <h2 class="result-title">Your ${type} Result:</h2>
                <p class="result-value">Your ${type} is: <span>${result}</span></p>
                <p class="result-explanation">${explanation}</p>
                ${additionalInfoHTML}
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
        resultDiv.innerHTML = originalResultHTML; // Restore the original HTML
        femaleImage.style.display = 'none';
        maleImage.style.display = 'none';
        defaultImage.style.display = 'block';
    };

    bmrCalculateButton.addEventListener("click", calculateBMR);
    bmiCalculateButton.addEventListener("click", calculateBMI);
    resetButton.addEventListener("click", resetForm);
});
