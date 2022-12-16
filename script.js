/*
-----------------------
DISPLAY SETTINGS 
-----------------------
*/

//listen for click on buttons and put it onto display
var numberDisplay = document.querySelector("#numberText")

//if the clicked button is any of the buttons that has the "display" as one of their classes, add the dataset.display attribute of the HTML to the end of the number
const clicked_button = document.querySelectorAll('.display');
clicked_button.forEach(button => 
    
    button.addEventListener('click', () => {
        console.log(button.dataset.display);

        //if numberDisplay has only 0, prevent number from having 0 in front (e.g. 0123) , so delete the 0.
        //if numberDisplay has only 0 and user clicks on ".", numberDisplay should start with "0." (eg. 0.123), thus it's added here as an exception 
        if (numberDisplay.innerHTML === "0" && button.dataset.display != ".") {

            numberDisplay.innerHTML = button.dataset.display
        }

        //if numberDisplay has only 0 and user clicks on ".", numberDisplay should start with "0." (eg. 0.123)
        else if (numberDisplay.innerHTML === "0" && button.dataset.display === ".") {

            numberDisplay.innerHTML = "0."
        }

        //when the user clicks on a number, delete the zero and put that clicked number in the first digit
        else if (numberDisplay.innerHTML === "0") {

            numberDisplay.innerHTML = button.dataset.display
        }

        //if the string has "." in any part of it, nothing happens when the user clicks on "." again
        else if (numberDisplay.innerHTML.includes(".") === true && button.dataset.display === ".") {

            numberDisplay.innerHTML = numberDisplay.innerHTML

        }

        else{
            if (lockdisplay === true) {
                numberDisplay.innerHTML = button.dataset.display
                lockdisplay = false
            }
            //if the displayed number is 17 characters, nothing happens when the user clicks on buttons again (same as windows calculator)
            else if (numberDisplay.innerHTML.length == 17) {

            numberDisplay.innerHTML = numberDisplay.innerHTML
            
            }

            else {
                numberDisplay.innerHTML+= button.dataset.display
                checkExcessDisplay ()
            }

            
        }


        

      })
);
    


//if the clicked button is AC, change the variables accordingly and turn the innerhtml of numberDisplay to zero  
const acbutton = document.querySelector("#AC")
acbutton.addEventListener('click', () => {

    numberDisplay.innerHTML = 0
    lockdisplay = false
    operationTrigger = false
    num1 = 0
    num2 = 0
    currentoperation = ""
    checkExcessDisplay ()

});
//if the clicked button is C, delete the last digit of the innerhtml of numberDisplay
const cbutton = document.querySelector("#C")
cbutton.addEventListener('click', () => {


    numberDisplay.innerHTML = numberDisplay.innerHTML.slice(0, -1)

    //if after deletion, there is nothing in innerHTML, turn innerHTML into "0"
    if (numberDisplay.innerHTML === "") {
        numberDisplay.innerHTML = 0
    }
    checkExcessDisplay ()

}); 

//if the clicked button is plusminus, change the number to negative or positive accordingly
const plusminusbutton = document.querySelector("#plusminus")
plusminusbutton.addEventListener('click', () => {

    if (numberDisplay.innerHTML === "0") {
        return
    }
    else if (numberDisplay.innerHTML.charAt(0) === "-") {
        numberDisplay.innerHTML = numberDisplay.innerHTML.substring(1);
        checkExcessDisplay ()
    }
    else {
        numberDisplay.innerHTML = "-" + numberDisplay.innerHTML
        checkExcessDisplay ()
    }


}); 

//if the display window has more than 12 characters, make the font smaller (5 times)
function checkExcessDisplay () {

    let numberCharSize = numberDisplay.innerHTML.length

    //turn the displayed number into exponential (1.23e) after the character size limit (17)
    if (numberCharSize > 17) {
        numberDisplay.innerHTML = Number.parseFloat(numberDisplay.innerHTML).toExponential(11);
        document.getElementById("numberText").style.fontSize = "43.5px"
    }   

    if (numberCharSize == 13) {
        document.getElementById("numberText").style.fontSize = "60px"
    }
    if (numberCharSize == 14) {
        document.getElementById("numberText").style.fontSize = "56px"
    }
    if (numberCharSize == 15) {
        document.getElementById("numberText").style.fontSize = "52px"
    }
    if (numberCharSize == 16) {
        document.getElementById("numberText").style.fontSize = "49px"
    }
    if (numberCharSize == 17) {
        document.getElementById("numberText").style.fontSize = "46px"
    }

    if (numberCharSize < 13) {
        document.getElementById("numberText").style.fontSize = "65px"
    }





}


/*
-----------------------
MATHEMATICAL OPERATIONS:
ADD
SUBTRACT
MULTIPLY
DIVIDE

EQUALS BUTTON
-----------------------
*/

var result
var operationTrigger = false
var num1 = 0
var num2 = 0
var currentoperation = ""

//var lockdisplay defines if the user has clicked on an operation button (+, -, x, ÷). 
//if they did, lockdisplay turns true and the next number input doesn't get added at the end of the displayed number
//instead, it creates the first digit of a new number
var lockdisplay = false




//if the clicked button is "+", check for the operationsettings and exceptions to see if a pause is required, then run the operation 
const addbutton = document.querySelector("#add")
addbutton.addEventListener('click', () => {

    let checkPause = operationSettings ("ADD")

    if (checkPause === "pause here" ) {
        return
    }

    currentoperation = "ADD"

    operate (currentoperation)


});


//if the clicked button is "-", check for the operationsettings and exceptions to see if a pause is required, then run the operation 
const subtractbutton = document.querySelector("#subtract")
subtractbutton.addEventListener('click', () => {

    let checkPause = operationSettings ("SUBTRACT")

    if (checkPause === "pause here" ) {
        return
    }

    currentoperation = "SUBTRACT"

    operate (currentoperation)


});

//if the clicked button is "x", check for the operationsettings and exceptions to see if a pause is required, then run the operation 
const multiplybutton = document.querySelector("#multiply")
multiplybutton.addEventListener('click', () => {

    let checkPause = operationSettings ("MULTIPLY")

    if (checkPause === "pause here" ) {
        return
    }

    currentoperation = "MULTIPLY"

    operate (currentoperation)


});

//if the clicked button is "÷", check for the operationsettings and exceptions to see if a pause is required, then run the operation 
const dividebutton = document.querySelector("#divide")
dividebutton.addEventListener('click', () => {

    let checkPause = operationSettings ("DIVIDE")

    if (checkPause === "pause here" ) {
        return
    }

    currentoperation = "DIVIDE"

    operate (currentoperation)

});

//if the clicked button is "=", run the current operation only if operatintrigger has been triggered before (if the user typed a number and clicked on an operation button before) 
const equalsbutton = document.querySelector("#equals")
equalsbutton.addEventListener('click', () => {

    //also check for the operationsettings in case user clicks on other operation buttons 
    if (operationTrigger === true) {
        let checkPause = operationSettings (currentoperation)

        if (checkPause === "pause here" ) {
            return
        }
        else {
        operate (currentoperation)
        }
    }

    else {
        return
    }

});


function operationSettings (operation) {

    //after user clicks on an operation button (+,-,x, ÷) once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on the same operation button repeatedly, do nothing. 
    if (lockdisplay === true && currentoperation == operation) {
        return "pause here";
    }

    //after user clicks on an operation button (+,-,x, ÷) once, the user is expected to click on a number
    //instead of clicking on a number, if the user clicks on another operation button, the app switches currentoperation to the clicked operation 
    else if (lockdisplay === true && (currentoperation != operation && currentoperation != "")) {
        currentoperation = operation
        return "pause here";
    }

    //if the user clicks on a different operation button while ongoing operation is something else (user clicks on "1, +, 2 , -" consecutively), 
    //finish the ongoing operation first (add operation in our example), display result and then switch current operation to clicked operation (subtract operation)
    else if (lockdisplay === false && (currentoperation != operation && currentoperation != "")) {
        num2 = numberDisplay.innerHTML
        operate (currentoperation)
        lockdisplay = true
        currentoperation = operation
        return "pause here";
    }


}

//run the mathematical operation and change the innerhtml of numberdisplay with result
function operate (operation) {

    if (operationTrigger === true) {
        num2 = numberDisplay.innerHTML;

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
        num1 = result;
        numberDisplay.innerHTML = result;
        checkExcessDisplay ()
        lockdisplay = true;
    }

    //if entering number for the first time, don't run any operation, store the number
    else {
        num1 = numberDisplay.innerHTML;
        operationTrigger = true;
        lockdisplay = true;
        }

}

