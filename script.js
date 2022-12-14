/*
-----------------------
BUTTONS GETTING DISPLAYED ON CLICK
-----------------------
*/

//this var defines if the user has clicked on an operation button. 
//if they did, this will turn true and the next number input will not be added at the end of the displayed number
//instead, it will create the first digit of a new number
var lockdisplay = false


//we listen for click on buttons and we put it onto display
var numberDisplay = document.querySelector("#numberText")

//if the clicked button is any of the buttons that has the "display" as one of their classes, add the dataset.display attribute of the HTML to the end of the number
const clicked_button = document.querySelectorAll('.display');
clicked_button.forEach(button => 
    
    button.addEventListener('click', () => {
        console.log(button.dataset.display);

        //if numberDisplay has only 0, we don't want the number to go like: 09123, we want it to go like 9123. so we delete the 0.
        //if numberDisplay has only 0 and user clicks on ".", we want it to go like 0.123, so we add it into if condition as an exception 
        if (numberDisplay.innerHTML === "0" && button.dataset.display != ".") {

            numberDisplay.innerHTML = button.dataset.display
        }

        //if numberDisplay has only 0 and user clicks on ".", we want it to go like 0.123
        else if (numberDisplay.innerHTML === "0" && button.dataset.display === ".") {

            numberDisplay.innerHTML = "0."
        }

        //the first number user clicks on, deletes the zero and puts that number in the first digit
        else if (numberDisplay.innerHTML === "0") {

            numberDisplay.innerHTML = button.dataset.display
        }

        //if the string has "." in any part of it, nothing happens when the user clicks on "." again
        else if (numberDisplay.innerHTML.includes(".") === true && button.dataset.display === ".")

            numberDisplay.innerHTML = numberDisplay.innerHTML
            

        else{
            if (lockdisplay === true) {
                numberDisplay.innerHTML = button.dataset.display
                lockdisplay = false
            }
            else {
                numberDisplay.innerHTML+= button.dataset.display
            }

            
        }

        

      })
);
    


//if the clicked button is AC, turn the innerhtml of numberDisplay to zero
const acbutton = document.querySelector("#AC")
acbutton.addEventListener('click', () => {

    numberDisplay.innerHTML = 0
    lockdisplay = false
    operationTrigger = false
    num1 = 0
    num2 = 0
    currentoperation = ""

});
//if the clicked button is C, delete the last digit of the innerhtml of numberDisplay
const cbutton = document.querySelector("#C")
cbutton.addEventListener('click', () => {


    numberDisplay.innerHTML = numberDisplay.innerHTML.slice(0, -1)

    //if after deletion, there is nothing in innerHTML, turn innerHTML into zero
    if (numberDisplay.innerHTML === "") {
        numberDisplay.innerHTML = 0
    }

}); 

/*
-----------------------
MATHEMATICAL OPERATIONS:
ADD
SUBTRACT
MULTIPLY
DIVIDE
-----------------------
*/

var result
var operationTrigger = false
var num1 = 0
var num2 = 0
var currentoperation = ""


//if the clicked button is "+", store the number in innerhtml into "num1" and run the add operation
const addbutton = document.querySelector("#add")
addbutton.addEventListener('click', () => {

    //after clicking on the "+" button once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on + repeatedly, the app needs to do nothing, 
    //instead of adding the stored number over and over
    if (lockdisplay === true && currentoperation == "ADD") {
        return
    }

    //after clicking on an operation button "+,-,* or /" once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on +, the app needs to switch currentoperation to "ADD", 
    else if (lockdisplay === true && (currentoperation == "SUBTRACT" || currentoperation == "MULTIPLY" || currentoperation == "DIVIDE")) {
        currentoperation = "ADD" 
        return ;
    }

    //if the user clicks on "+" button while current operation is something other than "add", finish that operation first, display result and then switch current operation to "add"
    else if (lockdisplay === false && (currentoperation == "SUBTRACT" || currentoperation == "MULTIPLY" || currentoperation == "DIVIDE" )) {
        num2 = numberDisplay.innerHTML
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
        currentoperation = "ADD"
        return
    }

    
    currentoperation = "ADD"

    if (operationTrigger === true) {
        num2 = numberDisplay.innerHTML;
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
       }
    
    else {
    num1 = numberDisplay.innerHTML;
    operationTrigger = true;
    lockdisplay = true
    }


});


//if the clicked button is "-", store the number in innerhtml into "num1" and run the subtract operation
const subtractbutton = document.querySelector("#subtract")
subtractbutton.addEventListener('click', () => {

    //after clicking on the "-" button once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on - repeatedly, the app needs to do nothing, 
    //instead of adding the stored number over and over
    if (lockdisplay === true && currentoperation == "SUBTRACT") {
        return
    }

    //after clicking on an operation button "+,-,* or /" once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on -, the app needs to switch currentoperation to "SUBTRACT", 
    else if (lockdisplay === true && (currentoperation == "ADD" || currentoperation == "MULTIPLY" || currentoperation == "DIVIDE")) {
        currentoperation = "SUBTRACT" 
        return ;
    }

    //if the user clicks on "-" button while current operation is something other than "subtract", finish that operation first, display result and then switch current operation to "subtract"
    else if (lockdisplay === false && (currentoperation == "ADD" || currentoperation == "MULTIPLY" || currentoperation == "DIVIDE" )) {
        num2 = numberDisplay.innerHTML
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
        currentoperation = "SUBTRACT"
        return
    }

    
    currentoperation = "SUBTRACT"

    if (operationTrigger === true) {
        num2 = numberDisplay.innerHTML;
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
       }
    
    else {
    num1 = numberDisplay.innerHTML;
    operationTrigger = true;
    lockdisplay = true
    }


});

//if the clicked button is "x", store the number in innerhtml into "num1" and run the multiply operation
const multiplybutton = document.querySelector("#multiply")
multiplybutton.addEventListener('click', () => {

    //after clicking on the "x" button once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on x repeatedly, the app needs to do nothing, 
    //instead of adding the stored number over and over
    if (lockdisplay === true && currentoperation == "MULTIPLY") {
        return
    }

    //after clicking on an operation button "+,-,x or /" once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on x, the app needs to switch currentoperation to "MULTIPLY", 
    else if (lockdisplay === true && (currentoperation == "ADD" || currentoperation == "SUBTRACT" || currentoperation == "DIVIDE")) {
        currentoperation = "MULTIPLY" 
        return ;
    }

    //if the user clicks on "x" button while current operation is something other than "MULTIPLY", finish that operation first, display result and then switch current operation to "MULTIPLY"
    else if (lockdisplay === false && (currentoperation == "ADD" || currentoperation == "SUBTRACT"|| currentoperation == "DIVIDE" )) {
        num2 = numberDisplay.innerHTML
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
        currentoperation = "MULTIPLY"
        return
        }
    
    currentoperation = "MULTIPLY"

    if (operationTrigger === true) {
        num2 = numberDisplay.innerHTML;
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
       }
    
    else {
    num1 = numberDisplay.innerHTML;
    operationTrigger = true;
    lockdisplay = true
    }


});

//if the clicked button is "÷", store the number in innerhtml into "num1" and run the divide operation
const dividebutton = document.querySelector("#divide")
dividebutton.addEventListener('click', () => {

    //after clicking on the "÷" button once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on ÷ repeatedly, the app needs to do nothing, 
    //instead of adding the stored number over and over
    if (lockdisplay === true && currentoperation == "DIVIDE") {
        return
    }

    //after clicking on an operation button "+,-,x or /" once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on ÷, the app needs to switch currentoperation to "DIVIDE", 
    else if (lockdisplay === true && (currentoperation == "ADD" || currentoperation == "SUBTRACT" || currentoperation == "MULTIPLY")) {
        currentoperation = "DIVIDE" 
        return ;
    }

    //if the user clicks on "÷" button while current operation is something other than "DIVIDE", finish that operation first, display result and then switch current operation to "DIVIDE"
    else if (lockdisplay === false && (currentoperation == "ADD" || currentoperation == "SUBTRACT"|| currentoperation == "MULTIPLY" )) {
        num2 = numberDisplay.innerHTML
        var operationresult = operate (num1, num2, currentoperation)
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true
        currentoperation = "DIVIDE"
        return
        }
    
    currentoperation = "DIVIDE"

    if (operationTrigger === true) {
        num2 = numberDisplay.innerHTML;
        var operationresult = operate (num1, num2, currentoperation);
        num1 = operationresult;
        numberDisplay.innerHTML = operationresult;
        lockdisplay = true;
       }
    
    else {
    num1 = numberDisplay.innerHTML;
    operationTrigger = true;
    lockdisplay = true;
    }


});





function operate (num1, num2, operation) {


    if (operation == "ADD") {
        result = parseFloat(num1) + parseFloat(num2)
    }
    else if (operation == "SUBTRACT") {
        result = parseFloat(num1) - parseFloat(num2)
    }
    else if (operation == "MULTIPLY") {
        result = parseFloat(num1) * parseFloat(num2)
    }
    else if (operation == "DIVIDE") {
        result = parseFloat(num1) / parseFloat(num2)
    }
    
    return result;

}

