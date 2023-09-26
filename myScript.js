let num1 = null;
let num2 = null;
let result = null;
let prevOperator = null;
let currOperator = null;
let screen = document.body.querySelector('.calculator-screen');
let clearScreenFlag = false;


function debug(){
  console.log(num1, num2, currOperator);
  console.log("result: " + result);
  console.log("screen: " + screen.textContent);
  console.log("clearScreenFlag: " + clearScreenFlag);
}

function isCharacterANumber(char){
  return /^[0-9]*$/.test(char);
}

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
  else if(operator === "/")
    result = divide(num1, num2);

  return result;
}

function clearScreen(){
  screen.textContent = "";
  clearScreenFlag = false;
}

function buttonLogic(){
  let calculatorButtons = Array.from(document.body.querySelectorAll('.buttons-row-flex-container .button'));
  let operatorButtons = Array.from(document.body.querySelectorAll("#operators"));
  let numOfButtonsHighlighted = 0;

  calculatorButtons.forEach((button) => {
    
    
    if(isCharacterANumber(button.textContent) || button.textContent === '.'){
      button.addEventListener('click', () => {
        if(clearScreenFlag)
          clearScreen();

        screen.textContent += button.textContent;
      });
    }
    else if(button.textContent === 'AC'){
      button.addEventListener('click', () => {
        screen.textContent = "";
        num1 = null;
        num2 = null;
        currOperator = null;
        prevOperator = null;
        result = null;
      });
    }
    // +, -, *, /
    else if(isButtonAnOperator(button.textContent)){
      button.addEventListener('click', () => {

        prevOperator = currOperator;
        currOperator = button.textContent;
        // should only run for 1st run in a chain-computation.
        if(!prevOperator)
          prevOperator = currOperator;
        clearScreenFlag = true;

        // clear the screen.
        // we have put an operator, start entering next number.
        if(currOperator !== null && clearScreenFlag === true){
          if(!num1){
            num1 = +screen.textContent;
            clearScreen();
          }
          else if(num1 && !num2){
            num2 = +screen.textContent;
            clearScreen();
          }
          debug();
        }
        
        if(num1 && num2){
          result = operate(num1, num2, prevOperator);
          num1 = +result;
          num2 = null;
          clearScreen();
          screen.textContent = result;
          clearScreenFlag = true;
        }

        debug();
      });
    }

    else if(button.textContent === "="){

      button.addEventListener('click', () => {
        if(num1 && !num2){
          num2 = +screen.textContent;
          clearScreen();
        }

        result = operate(num1, num2, currOperator);
        screen.textContent = result;
        debug();
      });



    }

  });
}


function main(){
  buttonLogic(screen);
}

main();