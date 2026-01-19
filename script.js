// 1. Select Elements
const incomeInput = document.getElementById('annual-income');
const expensesInput = document.getElementById('monthly-expenses');
const hoursInput = document.getElementById('billable-hours');
const vacationInput = document.getElementById('vacation-weeks');
const calculateBtn = document.getElementById('calculate-btn');
const resultArea = document.querySelector('.result-area');
const rateDisplay = document.getElementById('hourly-rate');

// 2. NEW: Load data from LocalStorage when the page opens
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('freelanceData'));
    
    if (savedData) {
        incomeInput.value = savedData.income;
        expensesInput.value = savedData.expenses;
        hoursInput.value = savedData.hours;
        vacationInput.value = savedData.vacation;
        calculateRate(); // Automatically calculate if data exists
    }
});

// 3. The Logic Function
function calculateRate() {
    const annualIncome = parseFloat(incomeInput.value) || 0;
    const monthlyExpenses = parseFloat(expensesInput.value) || 0;
    const weeklyHours = parseFloat(hoursInput.value) || 0;
    const vacationWeeks = parseFloat(vacationInput.value) || 0;

    // Save inputs to an object
    const dataToSave = {
        income: annualIncome,
        expenses: monthlyExpenses,
        hours: weeklyHours,
        vacation: vacationWeeks
    };

    // Store in LocalStorage (must be a string)
    localStorage.setItem('freelanceData', JSON.stringify(dataToSave));

    const totalTarget = annualIncome + (monthlyExpenses * 12);
    const totalBillableHours = (52 - vacationWeeks) * weeklyHours;

    if (totalBillableHours <= 0) return;

    const hourlyRate = totalTarget / totalBillableHours;

    rateDisplay.innerText = hourlyRate.toFixed(2);
    resultArea.classList.remove('hidden');
}

calculateBtn.addEventListener('click', calculateRate);