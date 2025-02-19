const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-diplay');
    display.value = calculator.displayValue;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            displayValue === '0' ? digit : displayValue + digit;
    }

    updateDisplay();
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    //jika operator akar atau persen
    if (nextOperator === '√' || nextOperator === '%') {
        const valueToCalculate =
            firstOperand !== null ? firstOperand : inputValue;

        if (!isNaN(valueToCalculate)) {
            // menggunakan valueToCalculate
            const result = calculate(valueToCalculate, null, nextOperator);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            // update firstOperand untuk digunakan dalam operasi berikutnya
            calculator.firstOperand = result;
            // reset operator
            calculator.operator = null;
            // reset waiting
            calculator.waitingForSecondOperand = false;
            updateDisplay();
        }
        // hentikan pemrosesan lebih lanjut
        return;
    }
    // logika untuk operator lainnya
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    updateDisplay();
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operaror === '/') {
        return firstOperand / secondOperand;
    } else if (operator === '√') {
        // hanya untuk operator akar pangkat 2
        return Math.sqrt(firstOperand);
    } else if (operator === '%') {
        return firstOperand / 100;
    }

    return secondOperand;
}
