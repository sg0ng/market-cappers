
//initialize score variables
let currentScore = 0;
let highScore = 0;
let guess;
let input = 1000;
let randomIndex;
let companyTitle;

//selects the correct and incorrect modals
let modalCorrect = document.querySelector(".modal__correct")
let modalIncorrect = document.querySelector(".modal__incorrect")
let modalStart = document.querySelector(".modal__start")
let companyText = document.querySelector(".company__text")
let capText = document.querySelector(".cap__text")

let data;

//Retrieving JSON file
fetch('capdata.json')
    .then((response) => response.json())
    .then((json) => getData(json));


function getData(json) {
    console.log("Done")
    data = json;
}

function numberWithCommas(x) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumber(x) {
    if (x >= 1000000000) {
        return "$" + (x / 1000000000) + " billion"
    }
    else if (x >= 1000000) {
        return "$" + (x / 1000000) + " million"
    }
}

function startup() {

    modalStart.classList.add("hidden")

    document.getElementById('currentScore').textContent = 0;
    document.getElementById('highScore').textContent = 0;

    randomIndex = getRandomIndex()

    companyTitle = data[randomIndex][0]
    input = data[randomIndex][1]
    input = input - (input % 100000000)

    inputstring = formatNumber(input)



    guess = parseInt(randomGenerate(input));
    guessstring = formatNumber(guess)
    capText.textContent = guessstring;
    companyText.textContent = companyTitle

    //Displays guess and user input in console for testing purposes
    console.log(`Guess: ${guessstring}, Answer: ${inputstring}`)

}


function getRandomIndex() {
    return Math.floor(Math.random() * data.length);
}


//Generates a random guess based on the answer
//Returns the random guess
function randomGenerate(ans) {
    let num = [];
    let temp = ans - ans * 0.5;   //design what are some possible answer range, right here I use 30% higher or lower
    let weights = [1, 2, 2, 2.5, 3, 3, 2.5, 2, 2, 1];
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
            return result - (result % 100000000);
        }
    }
}

//Checks if the user is correct with the guess that the answer is smaller and update score
function compareSmaller() {
    console.log(guess + " " + input)
    if (guess >= input) {
        currentScore = currentScore + 1;
        document.getElementById('currentScore').textContent = currentScore;
        document.getElementById('ansForCorrect').textContent = "The capital value of " + companyTitle + " is " + inputstring;
        modalCorrect.classList.remove("hidden")
        document.body.style.backgroundColor = "green"
    } else {
        document.getElementById('ansForIncorrect').textContent = "The capital value of " + companyTitle + " is " + inputstring;
        modalIncorrect.classList.remove("hidden")
        document.body.style.backgroundColor = "red"
    }
}

//Checks if the user is correct with the guess that the answer is larger and update score
function compareLarger() {
    console.log(guess + " " + input)
    if (guess <= input) {
        currentScore = currentScore + 1;
        document.getElementById('ansForCorrect').textContent = "The capital value of " + companyTitle + " is " + inputstring;
        document.getElementById('currentScore').textContent = currentScore;
        modalCorrect.classList.remove("hidden")
        document.body.style.backgroundColor = "green"
    } else {
        document.getElementById('ansForIncorrect').textContent = "The capital value of " + companyTitle + " is " + inputstring;
        modalIncorrect.classList.remove("hidden")
        document.body.style.backgroundColor = "red"
    }
}


//Has to generate a new input and new guess for that input.
//Has to update score
//Has to display all this information
function nextQuestion() {
    randomIndex = getRandomIndex()

    companyTitle = data[randomIndex][0]
    input = data[randomIndex][1]
    input = input - (input % 100000000)

    inputstring = formatNumber(input)



    guess = parseInt(randomGenerate(input));
    guessstring = formatNumber(guess)

    capText.textContent = guessstring;
    companyText.textContent = companyTitle

    console.log(`Guess: ${guessstring}, Answer: ${inputstring}`)

    modalCorrect.classList.add("hidden")
}

//Has to generate a new input and new guess for that input.
//Has to set score to 0
//Has to update highscore if score was greater than the past one
//Has to display all this information
function restartGame() {
    randomIndex = getRandomIndex()

    companyTitle = data[randomIndex][0]
    input = data[randomIndex][1]
    input = input - (input % 100000000)

    inputstring = formatNumber(input)



    guess = parseInt(randomGenerate(input));
    guessstring = formatNumber(guess)
    capText.textContent = guessstring;
    companyText.textContent = companyTitle

    if (currentScore > highScore) {
        highScore = currentScore;
        document.getElementById('highScore').textContent = currentScore;
    }
    currentScore = 0;
    document.getElementById('currentScore').textContent = currentScore;

    modalIncorrect.classList.add("hidden")
    document.body.style.backgroundColor = "white"
}

