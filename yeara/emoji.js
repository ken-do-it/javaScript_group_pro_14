document.addEventListener('DOMContentLoaded', function () {
    const moodSelection = document.querySelector('.mood-selection');
    const sleepInfo = document.querySelector('.sleep-info');
    const poopInfo = document.querySelector('.poop-info');

    // Function to get selected radio button value
    function getSelectedValue(name) {
        const selected = document.querySelector(`input[name=${name}]:checked`);
        return selected ? selected.value : '';
    }

    // Update localStorage with selected values
    function updateLocalStorage() {
        const selectedMood = getSelectedValue('mood');
        const selectedSleepIcon = getSelectedValue('sleep-icon');
        const selectedPoopIcon = getSelectedValue('poop-icon');

        localStorage.setItem('selectedMood', selectedMood);
        localStorage.setItem('selectedSleepIcon', selectedSleepIcon);
        localStorage.setItem('selectedPoopIcon', selectedPoopIcon);
    }

    // Listen for changes in selection and update localStorage
    moodSelection.addEventListener('change', updateLocalStorage);
    sleepInfo.addEventListener('change', updateLocalStorage);
    poopInfo.addEventListener('change', updateLocalStorage);
});