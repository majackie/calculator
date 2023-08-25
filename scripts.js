const previousOperandDisplay = document.querySelector("[data-previous-operand]");
const currentOperandDisplay = document.querySelector("[data-current-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");

class Calculator {
  constructor(previousOperandDisplay, currentOperandDisplay) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clear();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperator(operator) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.previousOperand = this.currentOperand;
    this.operator = operator;
    this.currentOperand = "";
  }

  calculate() {
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) {
      return;
    }
    let result = "";
    switch (this.operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operator = undefined;
    this.previousOperand = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  clear() {
    this.previousOperand = "";
    this.operator = undefined;
    this.currentOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let formattedIntegerDigits = "";
    if (!isNaN(integerDigits)) {
      formattedIntegerDigits = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return formattedIntegerDigits + "." + decimalDigits;
    } else {
      return formattedIntegerDigits;
    }
  }

  updateDisplay() {
    this.currentOperandDisplay.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operator != null) {
      this.previousOperandDisplay.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operator;
    } else {
      this.previousOperandDisplay.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

document.addEventListener("click", (event) => {
  const target = event.target;
  switch (true) {
    case target.matches("[data-number]"):
      calculator.appendNumber(target.innerText);
      break;
    case target.matches("[data-operator]"):
      calculator.chooseOperator(target.innerText);
      break;
    case target.matches("[data-equal]"):
      calculator.calculate();
      break;
    case target.matches("[data-delete]"):
      calculator.delete();
      break;
    case target.matches("[data-clear]"):
      calculator.clear();
      break;
    default:
      return;
  }
  calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      calculator.appendNumber(key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      calculator.chooseOperator(key);
      break;
    case "=":
    case "Enter":
      event.preventDefault();
      calculator.calculate();
      break;
    case "Backspace":
      calculator.delete();
      break;
    case "Escape":
      calculator.clear();
      break;
    default:
      return;
  }
  calculator.updateDisplay();
});
