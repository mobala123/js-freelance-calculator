// 1. Select Elements (The DOM)
const incomeInput = document.getElementById('annual-income');
const expensesInput = document.getElementById('monthly-expenses');
const hoursInput = document.getElementById('billable-hours');
const vacationInput = document.getElementById('vacation-weeks');
const calculateBtn = document.getElementById('calculate-btn');
const resultArea = document.querySelector('.result-area');
const rateDisplay = document.getElementById('hourly-rate');

// 2. The Logic Function
function calculateRate() {
    // Get values (or default to 0)
    const annualIncome = parseFloat(incomeInput.value) || 0;
    const monthlyExpenses = parseFloat(expensesInput.value) || 0;
    const weeklyHours = parseFloat(hoursInput.value) || 0;
    const vacationWeeks = parseFloat(vacationInput.value) || 0;

    // The Freelance Math
    const totalExpenses = monthlyExpenses * 12;
    const totalTarget = annualIncome + totalExpenses;
    
    const workingWeeks = 52 - vacationWeeks;
    const totalBillableHours = workingWeeks * weeklyHours;

    // Avoid dividing by zero
    if (totalBillableHours <= 0) {
        alert("Please enter valid working hours!");
        return;
    }

    const hourlyRate = totalTarget / totalBillableHours;

    // 3. Update the UI
    rateDisplay.innerText = hourlyRate.toFixed(2); // 2 decimal places
    resultArea.classList.remove('hidden');
}

// 4. Add Event Listener
calculateBtn.addEventListener('click', calculateRate);