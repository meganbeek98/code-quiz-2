                        // COME BACK AND MAKE CHANGES TO id's
// DECLARE VARIABLES
var startBtn = document.getElementById("startButton");
var submitBtn = document.querySelector("button.submitBtn");
var secondsLeft = (questions.length * 20 + 1);
var timerElement = document.getElementById("timer");
var submitScoreElement = document.querySelector("#submitScore");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;

function startTimer() {

    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // timer for 120
    setTimer();

    // questions pop up
    makeQuestions();

}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// pop up -- option to enter name to save to highscores
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submitScore").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}

// Event Listeners -- for buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './scores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // creates objec (name and score keys)
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // checks for scores in local storage, THEN takes value || OTHERWISE, black array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings (stringify) || + puts into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function(event) {
    var pElement = document.getElementsByClassName("feedback")[0]
    
    // analizes user's answers/choices + gives feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "Correct!😁";
        setTimeout(hideFeedback,1225);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "Wrong🚫";
        setTimeout(hideFeedback,1225);
        secondsLeft = secondsLeft - 20;
        showFeedback();
    }    
    makeQuestions();
});