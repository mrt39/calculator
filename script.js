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

        //if the string has "." in any part of it, nothing happens when the user clicks on "." again
        else if (numberDisplay.innerHTML.includes(".") === true && button.dataset.display === ".")

            numberDisplay.innerHTML = numberDisplay.innerHTML
            

        else{
        numberDisplay.innerHTML+= button.dataset.display
        }

        

      })
);
    


//if the clicked button is AC, turn the innerhtml of numberDisplay to zero
const acbutton = document.querySelector("#AC")
acbutton.addEventListener('click', () => {

    numberDisplay.innerHTML = 0

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
