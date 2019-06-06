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

    $("#start-button").click(startGame);
    $(".choice-text").click(checkAnswer)


});

//An object full of questions and answers
var triviaObj = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timerId: '',
    timer: 20,
}

var questionsArr = [
{
    question: "What is the sigil of house Stark?",
    options: ['Direwolf', 'Dragon', 'Rose', 'Lion'],
    answer: "Direwolf",
    gif_url: ""
},
{
    question: "What is Dany\'s black dragon\s name?",
    options: ['Viserion', 'Drogon', 'Veraxes', 'Balerion'],
    answer: "Drogon",
    gif_url: ""
},
{
    question: "How many children did Ned Stark Have?",
    options: ['6', '2', '1', '3'],
    answer: "6",
    gif_url: ""
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

    triviaObj.correct = 0;
    triviaObj.incorrect = 0;
    startTimer();
    renderQuestion();
};


function renderQuestion() {
    // hide all the results-related elements first

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
        questionIndex++;

        // show the game-related elements
    }
    // If there aren't, render the end game screen.
    else {
        showResults();
    }
};

function checkAnswer() {
    var outcome;
    if ($(this).text() === questionsArr[questionIndex].answer) {
        // answered correctly
        outcome = "correct";
    }
    else {
        // answered incorrectly
        outcome = "incorrect";
    }
    // call the "showResult" function
    showResults(outcome);

    // at some point, we need to run renderQuestion again
};

function showResult(outcome) {
    // show either good or bad stuff, depending on what outcome is
    //  - start a 5-ish second timer, running "renderQuestion" function afterward
};

function endScreen() {
    // document.querySelector("#question").innerHTML = "Game Over!";
    // document.querySelector("#score").innerHTML = "Final Score: " + score + " out of " + questions.length;
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
            clearInterval(triviaObj.timerId);
            triviaObj.unanswered++;
            // alert("Time's Up!");
            showResults("unanswered");
        }
    };
};

// function nextQuestion() {
//     this.timer = 20;
//     questionCount = 0;
//     // for (var i = 0; i <= questions.length)
//     for (const key in questions) {
//         let value = obj[key];
//     }
//     if (questionCount === 0) {
//         $('#question-heading').text('Question: ' + this.questions.q1);
//         $('#choice-1').text(this.options.q1[0]);
//         $('#choice-2').text(this.options.q1[1]);
//         $('#choice-3').text(this.options.q1[2]);
//         $('#choice-4').text(this.options.q1[3]);

//     } else if (questionCount === 1) {
//         $('#question-heading').text('Question: ' + this.questions.q2);
//         $('#choice-1').text(this.options.q2[0]);
//         $('#choice-2').text(this.options.q2[1]);
//         $('#choice-3').text(this.options.q2[2]);
//         $('#choice-4').text(this.options.q2[3]);

//     } else if (questionCount === 2) {
//         $('#question-heading').text('Question: ' + this.questions.q3);
//         $('#choice-1').text(this.options.q3[0]);
//         $('#choice-2').text(this.options.q3[1]);
//         $('#choice-3').text(this.options.q3[2]);
//         $('#choice-4').text(this.options.q4[3]);

//     } else if (questionCount === 3) {
//         $('#question-heading').text('Question: ' + this.questions.q4);
//     } else if (questionCount === 4) {
//         $('#question-heading').text('Question: ' + this.questions.q5);
//     } else if (questionCount === 5) {
//         $('#question-heading').text('Question: ' + this.questions.q6);
//     } else if (questionCount === 6) {
//         $('#question-heading').text('Question: ' + this.questions.q7);
//     };
//     // };
// };