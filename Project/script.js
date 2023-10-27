// import data from "../WebScraping/capdata.json" assert { type: 'json' }

// console.log(data)


//Asks the user for an answer (Testing purposes)
let input = prompt();
// let input = 1000

//set highscore and currentscore to show 0 at round start
document.getElementById('currentScore').textContent = 0;
document.getElementById('highScore').textContent = 0;

//Generates a random guess based on the answer
//Returns the random guess
function randomGenerate(ans) {
    let num = [];
    let temp = ans - ans * 0.3;   //design what are some possible answer range, right here I use 30% higher or lower
    let weights = [1, 2, 2, 2.5, 3, 3, 2.5, 2, 2, 1];   //use this array to modify weight
    let totalWeight = 0;
    let index = -1;
    while (true) {
        for (let i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }
        let random = Math.random() * totalWeight;
        for (let i = 0; i < weights.length; i++) {
            if (random < weights[i]) {
                index = i;
                break;
            }
            random -= weights[i];
        }
        for (let i = 0; i < 10; i++) {    //this for loop is use to connect weight and range
            num[i] = temp;
            temp += ans * 0.06;
        }
        let result = Math.random() * ans * 0.06 + num[index];
        if (ans !== result) {
            return result;
        }
    }
}

//Creates the guess and displays it on the screen
let guess = parseInt(randomGenerate(input));
document.getElementById('rand').textContent = guess;

//Displays guess and user input in console for testing purposes
console.log(`Guess: ${guess}, Answer: ${input}`)

//initialize score variables
let currentScore = 0;
let highScore = 0;

//selects the correct and incorrect modals
let modalCorrect = document.querySelector(".modal__correct")
let modalIncorrect = document.querySelector(".modal__incorrect")

//Checks if the user is correct with the guess that the answer is smaller and update score
function compareSmaller() {
    console.log(guess + " " + input)
    if (guess >= input) {
        currentScore = currentScore + 1;
        document.getElementById('currentScore').textContent = currentScore;
        modalCorrect.classList.remove("hidden")
    } else {
        modalIncorrect.classList.remove("hidden")
    }
}

//Checks if the user is correct with the guess that the answer is larger and update score
function compareLarger() {
    console.log(guess + " " + input)
    if (guess <= input) {
        currentScore = currentScore + 1;
        document.getElementById('currentScore').textContent = currentScore;
        modalCorrect.classList.remove("hidden")
    } else {
        modalIncorrect.classList.remove("hidden")
    }
}


//Has to generate a new input and new guess for that input.
//Has to update score
//Has to display all this information
function nextQuestion() {
    input = prompt(); //input 
    guess = parseInt(randomGenerate(input));
    document.getElementById('rand').textContent = guess;
    console.log(`Guess: ${guess}, Answer: ${input}`)

    modalCorrect.classList.add("hidden")
}

//Has to generate a new input and new guess for that input.
//Has to set score to 0
//Has to update highscore if score was greater than the past one
//Has to display all this information
function restartGame() {
    input = prompt(); //input
    guess = parseInt(randomGenerate(input));
    document.getElementById('rand').textContent = guess;

    if (currentScore > highScore) {
        highScore = currentScore;
        document.getElementById('highScore').textContent = currentScore;
    }
    currentScore = 0;
    document.getElementById('currentScore').textContent = currentScore;

    modalIncorrect.classList.add("hidden")
}

