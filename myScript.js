let num1 = null;
let num2 = null;
let result = null;
let prevOperator = null;
let currOperator = null;
let screen = document.body.querySelector('.calculator-screen');
let clearScreenFlag = false;

// for debugging purposes only.
function debug(){
  console.log(num1, num2);
  console.log("currOperator: " + currOperator);
  console.log("prevOperator: " + prevOperator);
  console.log("result: " + result);
  console.log("screen: " + screen.textContent);
  console.log("clearScreenFlag: " + clearScreenFlag);
}

// utilizes regex to tell if a given string (preferably 1 character) is a number.
function isCharacterANumber(char){
  return /^[0-9]*$/.test(char);
}

// tells if a button contains an arithmetic operator on the calculator.
function isButtonAnOperator(char){
  if(char === "+" || char === "-" || char === "/" || char ==="*") return true;
  return false;
}

function add(num1, num2){
  return num1 + num2;
}

function subtract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  return num1/num2;
}

// takes in 2 number params (as Strings or Numbers). Returns a number in string-format.
function operate(num1, num2, operator){
  let result = 0;
  num1 = +num1;
  num2 = +num2;

  if(operator === "+")
    result = add(num1, num2);
  else if(operator === "-")
    result = subtract(num1, num2);
  else if(operator === "*")
    result = multiply(num1, num2);
  else if(operator === "/"){
    result = divide(num1, num2);
  }

  // round results so they will not overflow the screen.
  if(+result%1 !== 0)
    result = String(Math.round(+result * 1e21)/1e21);

  return result;
}

// will clear the screen and reset the clearScreenFlag.
function clearScreen(){
  screen.textContent = "";
  clearScreenFlag = false;
}

function backspaceFunctionality(){
  if(screen.textContent === String(result))
    return;
  screen.textContent = screen.textContent.substring(0, screen.textContent.length-1);
}

function clearButtonFunctionality(){
  screen.textContent = "";
  num1 = null;
  num2 = null;
  currOperator = null;
  prevOperator = null;
  result = null;
}

function equalsButtonFunctionality(){
  // do nothing because there is operator
  if(!currOperator){
    return;
  }

  // take in the 2nd operator from the screen and clear the screen.
  if(num1 && !num2){
    num2 = +screen.textContent;
    clearScreen();
  }
  
  // if we are asked to divide by 0.
  if(currOperator === "/" && num2 === 0){
    screen.textContent = "x-x";
    clearScreenFlag = true;
    alert("Well now you've gone and done it! Trying to divide by 0? You're a madman! You've killed the poor calculator. ): You can revive him by clearing the cache. (AC)");
  }
  // perform computation with CURRENT operator, since this is the most UPDATED computation. 
  // and display result on screen.
  else{
    result = operate(num1, num2, currOperator);
    screen.textContent = result;
    clearScreenFlag = true;
  }

}

function numbersDecimalLogic(button){
  if(clearScreenFlag)
  clearScreen();

  // will only allow 1 decimal on screen.
  if(button.textContent === "." && screen.textContent.includes(".")){
    screen.textContent += "";
  }
  else{
    screen.textContent += button.textContent;
  }
}

function operatorsFunctionality(button){
  prevOperator = currOperator;
  currOperator = button.textContent;
  clearScreenFlag = true;

  // clear the screen.
  // we have put an operator, start entering next number store.
  if(currOperator !== null && clearScreenFlag === true){
    if(!num1){
      num1 = +screen.textContent;
      clearScreen();
    }
    else if(num1 && !num2){
      num2 = +screen.textContent;
      clearScreen();
    }
  }
  
  // perform computation on the current 2 numbers, however, use the PREVIOUS operator.
  // we want to use the previous operator because we just entered a new one for another number we want to put in
  // for chaining another operation.
  if(num1 && num2){
    if(!prevOperator)
      result = operate(num1, num2, currOperator);
    else
      result = operate(num1, num2, prevOperator);
    num1 = +result;
    num2 = null;
    clearScreen();
    screen.textContent = result;
    clearScreenFlag = true;
  }
}

function buttonLogic(){
  let calculatorButtons = Array.from(document.body.querySelectorAll('.buttons-row-flex-container .button'));

  calculatorButtons.forEach((button) => {
    // backspace
    if(button.textContent === "<-"){
      button.addEventListener('click', backspaceFunctionality);
    }
    // numbers and decimals
    if(isCharacterANumber(button.textContent) || button.textContent === '.'){
      button.addEventListener('click', () => {
        numbersDecimalLogic(button);
      });
    }
    // clear button
    else if(button.textContent === 'AC')
      button.addEventListener('click', clearButtonFunctionality);
    // operators buttons
    else if(isButtonAnOperator(button.textContent)){
      button.addEventListener('click', () => {
        operatorsFunctionality(button);
      });
    }
    // equals button
    else if(button.textContent === "=")
      button.addEventListener('click', equalsButtonFunctionality);
  });
}

buttonLogic();