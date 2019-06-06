//Start button appears when page loads.
//When user click on start button, it disappears and ...
//The timer starts, the first question displays, four choices are displayed
//User presses a button
//If they choose the right answer...
//The score is increased by one.
//Show you're right! with the appropriate gif and blurb
//Show next question button that goes to next question after clicked
//If they choose the wrong answer...
//Show you're wrong with the appropriate gif and correct answer
//The next question is displayed with new options
//Show next question button that goes to next question after clicked


//At the end, the score is displayed like 7/10 or 4/10
//Theres a reset button that...
//Resets the score and displays the first question again


//Start JS
$(document).ready(function () {
    console.log("Inside the documentready");
    //Hiding all the Unneeded HTML elements
    $("#timer-row").hide();
    $("#question-row").hide();
    $(".padding-row").hide();
    $("#choice1-row").hide();
    $("#choice2-row").hide();
    $("#result-gif-row").hide();
    $("#results-row").hide();
    $("#endscreen-row").hide();


    $("#start-button").click(startGame);
    $(".choice-text").click(checkAnswer);
    $("#next-button").click(renderQuestion);
    $("#playagain-button").click(resetGame);

});

//An object full of questions and answers
var triviaObj = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timerId: '',
    timer: 5,
}

var questionsArr = [
    {
        question: "What is the sigil of house Stark?",
        options: ['Direwolf', 'Dragon', 'Rose', 'Lion'],
        answer: "Direwolf",
        gif: "https://media.giphy.com/media/iwVHUKnyvZKEg/giphy.gif"
    },
    {
        question: "What is Dany\'s black dragon\s name?",
        options: ['Viserion', 'Drogon', 'Veraxes', 'Balerion'],
        answer: "Drogon",
        gif: "https://media.giphy.com/media/iwVHUKnyvZKEg/giphy.gif"
    },
    {
        question: "How many children did Ned Stark Have?",
        options: ['6', '2', '1', '3'],
        answer: "6",
        gif: "https://media.giphy.com/media/iwVHUKnyvZKEg/giphy.gif"
    }
    // ...
];

//Keeps track of which question we're on
var questionIndex = 0;

//Runs when the "Start" button is clicked
function startGame() {
    //Hides instructions
    $("#instructions-row").hide();
    $("#ready-gif-row").hide();
    $("#timer-row").show();

    //clears score
    triviaObj.correct = 0;
    triviaObj.incorrect = 0;

    // startTimer();
    renderQuestion();
};


function renderQuestion() {
    // hide all the results-related elements first
    $("#result-gif-row").hide();
    $("#results-row").hide();

    //restarting timer
    triviaObj.timer = 5;
    startTimer();

    //If the game has been played once, add tothe questionsIndex
    if (triviaObj.correct > 0 || triviaObj.incorrect > 0 || triviaObj.unanswered > 0) {
        questionIndex++;
    }

    // If there are still more questions, render the next one.
    if (questionIndex < questionsArr.length) {
        console.log(questionIndex);
        console.log(questionsArr[questionIndex].question);
        // change the text for question
        $("#question-heading").text(questionsArr[questionIndex].question);
        // change the text for all the answer choices
        $("#choice-1").text(questionsArr[questionIndex].options[0]);
        $("#choice-2").text(questionsArr[questionIndex].options[1]);
        $("#choice-3").text(questionsArr[questionIndex].options[2]);
        $("#choice-4").text(questionsArr[questionIndex].options[3]);


        $("#question-row").show();
        $(".padding-row").show();
        $("#choice1-row").show();
        $("#choice2-row").show();
    }
    // If there aren't any questions left, render the end game screen.
    else { 
        showEndscreen();
    }
};

function checkAnswer() {
    var outcome;
    console.log(questionsArr[questionIndex].answer)
    if ($(this).text() === questionsArr[questionIndex].answer) {
        // answered correctly
        triviaObj.correct++;
        outcome = "correct";
    } else {
        // answered incorrectly
        triviaObj.incorrect++;
        outcome = "incorrect";
    }
    // call the "showResult" function
    showResult(outcome);

    // at some point, we need to run renderQuestion again
};

function showResult(outcome) {
    $("#question-row").hide();
    $(".padding-row").hide();
    $("#choice1-row").hide();
    $("#choice2-row").hide();
    $("#result-gif-row").show();
    $("#results-row").show();

    stopTimer();
    //function to start a 5 second timer
    function resultTimer() {
        var showResultTimer = 5;
        triviaObj.timerId = setInterval(decrement, 1000);
        $("#timer-heading").text("Time Left: " + showResultTimer);

        //decreases interval by 1 every second
        function decrement() {
            showResultTimer--;
            $("#timer-heading").text("Time Left: " + showResultTimer);
            if (showResultTimer === 0) {
                renderQuestion();
            }
        }
    };

    resultTimer();
    $("#gif-result").attr("src", questionsArr[questionIndex].gif);

    // If the user presses the correct block...
    if (outcome === "correct") {
        $("#result-text").text("You are correct!");
        console.log("You are correct! " + triviaObj.correct);
    }
        // If the user presses the incorrect block...
        else if (outcome === "incorrect") {
        $("#result-text").text("You are incorrect! The correct answer was " + questionsArr[questionIndex].answer);
        console.log("You are correct! " + triviaObj.correct );
    }
        //If the user lets the timer runout...
        else if (outcome === "unanswered") {
        $("#result-text").text("Time has run out! The correct answer was " + questionsArr[questionIndex].answer);
        console.log("Left Unanswered. " + triviaObj.unanswered);
    }
};

//Function that's run when we're at the end of the questions array
function showEndscreen() {
    //Hides the Game Screen Blocks
    $("#timer-row").hide();
    $("#question-row").hide();
    $("#padding-row").hide();
    $("#choice1-row").hide();
    $("#choice2-row").hide();

    //Shows the Endscreen Blocks
    $("#endscreen-row").show();

    //Stops the timer
    stopTimer();

    //If correct answer is 13-15 then...
    if (triviaObj.correct >= 13) {
        $("#endscreen-text").text("You got " + triviaObj.correct + " out of 15 right! Great Job!");
    //If correct answer is 10-12 then...
    } else if (triviaObj.correct >= 10 && triviaObj.correct <= 12 ) {
        $("#endscreen-text").text("Pretty good, you got " + triviaObj.correct + " out of 15 right!");
    //If correct answer is 5-9 then...
    } else if (triviaObj.correct >= 5 && triviaObj.correct <= 9 ) {
        $("#endscreen-text").text("Meh, you got " + triviaObj.correct + " out of 15 right. Try again!"); 
    //If correct answer is 0-4 then...
    } else if (triviaObj.correct <= 4 ) {
        $("#endscreen-text").text("Ouch. You got " + triviaObj.correct + " out of 15 right. Try again!"); 
    }

    //Displays all scores
    $("#correct-count-text").text("Correct: " + triviaObj.correct); 
    $("#incorrect-count-text").text("Incorrect: " + triviaObj.incorrect); 
    $("#unanswered-count-text").text("Unanswered: " + triviaObj.unanswered); 
};


//Function that starts the timer
function startTimer() {
    clearInterval(triviaObj.timerId);
    triviaObj.timerId = setInterval(decrement, 1000);
    $("#timer-heading").text("Time Left: " + triviaObj.timer);

    //decreases interval by 1 every second
    function decrement() {
        triviaObj.timer--;
        $("#timer-heading").text("Time Left: " + triviaObj.timer);
        if (triviaObj.timer === 0) {
            clearInterval(triviaObj.timer);
            triviaObj.unanswered++;
            showResult("unanswered");
        }
    };
};

//Function stops the timer
function stopTimer() {
    clearInterval(triviaObj.timerId);
}

//Function resets everything that's needed in a new game.
function resetGame () {
    triviaObj.timer = 15;
    triviaObj.correct = 0;
    triviaObj.incorrect = 0;
    triviaObj.unanswered = 0;
    questionIndex = 0;
    $("#endscreen-row").hide();
    startGame();
}