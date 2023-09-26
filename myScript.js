let num1 = 0;
let num2 = 0;
let operator = "none";
let screen = document.body.querySelector('.calculator-screen');


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

function operate(num1, num2, operator){
  let result = 0;

  if(operator === "+")
    result = add(num1, num2);
  else if(operator === "-")
    result = subtract(num1, num2);
  else if(operator === "*")
    result = multiply(num1, num2);
  else if(operator === "/")
    result = divide(num1, num2);

  console.log(result);
  return result;
}

  // format: num1OperatorNum2 -> (global-variables) num1, num2, operator
function parseNumsAndOperator(str){
  let idxForOperator = -1;
  // find the operator firsst
  for(let i=0; i<str.length; i++){
    if(str[i] === "+" || str[i] === "-" ||
    str[i] === "/" || str[i] === "*"){
      idxForOperator = i;
      break;
    }
  }
  operator = str.charAt(idxForOperator);
  num1 = +(str.substring(0, idxForOperator));
  num2 = +(str.substring(idxForOperator+1));
}

function buttonLogic(){
  let calculatorButtons = Array.from(document.body.querySelectorAll('.buttons-row-flex-container .button'));

  calculatorButtons.forEach((button) => {
    // handle screen-content
    if(isCharacterANumber(button.textContent) || isButtonAnOperator(button.textContent) ||
    button.textContent === '.'){
      button.addEventListener('click', () => {
        screen.textContent += button.textContent;
      });
    }
    else if(button.textContent === 'C'){
      button.addEventListener('click', () => {
        screen.textContent = "";
      });
    }
    // handle computation
    else if(button.textContent === "="){
      button.addEventListener('click', () =>{
        parseNumsAndOperator(screen.textContent);
        console.log(num1, num2, operator);
        operate(num1, num2, operator);
      });
    }
  });
}

function main(){
  buttonLogic(screen);
}

main();