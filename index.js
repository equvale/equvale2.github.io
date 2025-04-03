const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            currentInput = '0';
            firstOperand = null;
            operator = null;
            waitForSecondOperand = false;
        } else if (value === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString();
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator) {
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                currentInput = result.toString();
                firstOperand = result;
            }
            operator = value;
            waitForSecondOperand = true;
        } else if (value === '=') {
            if (firstOperand !== null && operator) {
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                currentInput = result.toString();
                firstOperand = null;
                operator = null;
            }
        } else {
            if (currentInput === '0' || waitForSecondOperand) {
                currentInput = value;
                waitForSecondOperand = false;
            } else {
                currentInput += value;
            }
        }
        
        updateDisplay();
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}