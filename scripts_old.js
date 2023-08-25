"use strict";

let firstNum = "";
let operator = "";
let secondNum = "";

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

function isOperator(input) {
  return ["+", "-", "*", "/"].includes(input);
}

function calculate() {
  const parsedFirstNum = parseInt(firstNum);
  const parsedSecondNum = parseInt(secondNum);

  if (operator === "+") {
    return parsedFirstNum + parsedSecondNum;
  } else if (operator === "-") {
    return parsedFirstNum - parsedSecondNum;
  } else if (operator === "*") {
    return parsedFirstNum * parsedSecondNum;
  } else if (operator === "/") {
    return parsedFirstNum / parsedSecondNum;
  }
}

buttons.addEventListener("click", event => {
  const input = event.target.textContent;

  if (!isNaN(input)) {
    if (operator === "") {
      firstNum += input;
      display.textContent = firstNum;
    } else {
      secondNum += input;
      display.textContent = secondNum;
    }
  } else if (isOperator(input)) {
    operator = input;
  } else if (input === "=") {
    const result = performCalculation();
    display.textContent = result;
    firstNum = result.toString();
    operator = "";
    secondNum = "";
  } else if (input === "CLR") {
    firstNum = "";
    operator = "";
    secondNum = "";
    display.textContent = "";
  }
});