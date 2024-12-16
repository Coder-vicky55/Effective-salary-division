document.getElementById("autoCalcBtn").addEventListener("click", calculateAutomatically);
document.getElementById("manualCalcBtn").addEventListener("click", showManualInput);
document.getElementById("calculateManual").addEventListener("click", calculateManually);

function calculateAutomatically() {
    const salary = parseFloat(document.getElementById("salary").value) || 0;
    const emi = parseFloat(document.getElementById("emi").value) || 0;
    const availableAmount = salary - emi;
    
    const savings = availableAmount * 0.2;
    const medical = availableAmount * 0.15;
    const shopping = availableAmount * 0.25;
    const personal = availableAmount * 0.2;
    const extra = availableAmount * 0.2;

    displayResults(savings, medical, shopping, personal, extra);
}

function showManualInput() {
    document.getElementById("manualInput").style.display = "block";
}

function calculateManually() {
    let salary = parseFloat(document.getElementById("salary").value) || 0;
    const emi = parseFloat(document.getElementById("emi").value) || 0;
    salary = salary - emi; // Subtract EMI from salary

    // Parse inputs for savings, medical, shopping, personal, extra
    const savingsInput = parseInput(document.getElementById("savingsInput").value);
    const medicalInput = parseInput(document.getElementById("medicalInput").value);
    const shoppingInput = parseInput(document.getElementById("shoppingInput").value);
    const personalInput = parseInput(document.getElementById("personalInput").value);
    const extraInput = parseInput(document.getElementById("extraInput").value);

    // Check if total percentage is exactly 100%
    let totalPercentage = 0;
    if (savingsInput.isPercentage) totalPercentage += savingsInput.value * 100;
    if (medicalInput.isPercentage) totalPercentage += medicalInput.value * 100;
    if (shoppingInput.isPercentage) totalPercentage += shoppingInput.value * 100;
    if (personalInput.isPercentage) totalPercentage += personalInput.value * 100;
    if (extraInput.isPercentage) totalPercentage += extraInput.value * 100;

    if (totalPercentage !== 100) {
        alert("Total percentage must equal exactly 100%");
        return;
    }

    // Validate individual percentages and amounts
    if (savingsInput.value > salary && !savingsInput.isPercentage) {
        alert("Savings amount cannot exceed salary");
        return;
    }
    if (medicalInput.value > salary && !medicalInput.isPercentage) {
        alert("Medical amount cannot exceed salary");
        return;
    }
    if (shoppingInput.value > salary && !shoppingInput.isPercentage) {
        alert("Shopping amount cannot exceed salary");
        return;
    }
    if (personalInput.value > salary && !personalInput.isPercentage) {
        alert("Personal amount cannot exceed salary");
        return;
    }
    if (extraInput.value > salary && !extraInput.isPercentage) {
        alert("Extra amount cannot exceed salary");
        return;
    }

    // Subtract the absolute amounts from salary
    let remainingAmount = salary;

    if (!savingsInput.isPercentage) remainingAmount -= savingsInput.value;
    if (!medicalInput.isPercentage) remainingAmount -= medicalInput.value;
    if (!shoppingInput.isPercentage) remainingAmount -= shoppingInput.value;
    if (!personalInput.isPercentage) remainingAmount -= personalInput.value;
    if (!extraInput.isPercentage) remainingAmount -= extraInput.value;

    // Now, the remainingAmount is considered 100% for percentage calculations
    const savings = savingsInput.isPercentage ? remainingAmount * savingsInput.value : savingsInput.value;
    const medical = medicalInput.isPercentage ? remainingAmount * medicalInput.value : medicalInput.value;
    const shopping = shoppingInput.isPercentage ? remainingAmount * shoppingInput.value : shoppingInput.value;
    const personal = personalInput.isPercentage ? remainingAmount * personalInput.value : personalInput.value;
    const extra = extraInput.isPercentage ? remainingAmount * extraInput.value : extraInput.value;

    displayResults(savings, medical, shopping, personal, extra);
}

function parseInput(input) {
    const trimmedInput = input.trim();
    if (trimmedInput.endsWith("%")) {
        const percentageValue = parseFloat(trimmedInput.slice(0, -1)) / 100;
        if (percentageValue > 1) {
            alert("Individual percentage cannot exceed 100%");
            return { value: 0, isPercentage: true };
        }
        return { value: percentageValue, isPercentage: true };
    } else {
        return { value: parseFloat(trimmedInput), isPercentage: false };
    }
}

function displayResults(savings, medical, shopping, personal, extra) {
    document.getElementById("savingsAmount").textContent = "₹" + savings.toFixed(2);
    document.getElementById("medicalAmount").textContent = "₹" + medical.toFixed(2);
    document.getElementById("shoppingAmount").textContent = "₹" + shopping.toFixed(2);
    document.getElementById("personalAmount").textContent = "₹" + personal.toFixed(2);
    document.getElementById("extraAmount").textContent = "₹" + extra.toFixed(2);

    document.getElementById("results").style.display = "block";
}

