let num1 = null;
let num2 = null;
let result = null;
let operator = null;
let screen = document.body.querySelector('.calculator-screen');
let clearScreenFlag = false;


function debug(){
  console.log(num1, num2, operator);
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

function buttonLogic(){
  let calculatorButtons = Array.from(document.body.querySelectorAll('.buttons-row-flex-container .button'));

  calculatorButtons.forEach((button) => {
    // handle screen-content
    if(isCharacterANumber(button.textContent) || button.textContent === '.'){
      button.addEventListener('click', () => {
        if(clearScreenFlag == true){
          screen.textContent = "";
          clearScreenFlag = false;
        }
        screen.textContent += button.textContent;
      });
    }
    else if(button.textContent === 'AC'){
      button.addEventListener('click', () => {
        screen.textContent = "";
        num1 = null;
        num2 = null;
        operator = null;
        result = null;
      });
    }
    else if(isButtonAnOperator(button.textContent)){
      button.addEventListener('click', () => {
        operator = button.textContent;

        // show the 1st number.
        if(!num1)
          num1 = +screen.textContent;

        // do computation for 2nd number and update result.
        else{
          num2 = +screen.textContent;
          result = operate(num1, num2, operator);
          num1 = +result;
        }

        // for when we have computed 2 numbers.
        // - display new result, open up num2 for next input, set calc to clear the screen on next-input.
        if(num2 !== null){
          screen.textContent = result;
          num2 = null;
          clearScreenFlag = true;
        }
        // for when we have only input 1 number.
        else{
          screen.textContent = "";
        }
        debug();
      });
    }
    // handle computation
    else if(button.textContent === "="){
      button.addEventListener('click', () =>{
        if(!num2)
          num2 = +screen.textContent;
        result = operate(num1, num2, operator);
        if(screen.textContent !== "")
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