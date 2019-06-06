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
    //Hiding all the Unneeded HTML elements
    $("#timer-row").hide();
    $("#question-row").hide();
    $(".padding-row").hide();
    $("#choice1-row").hide();
    $("#choice2-row").hide();

    $("#start-button").on("click", triviaObj.startGame);

});

//An object full of questions and answers
var triviaObj = {
    correct: 0,
    incorrect: 0,
    timerId: '',
    timer: 20,
    questions: {
        q1: 'What is the sigil of house Stark?',
        q2: 'What is Dany\'s black dragon\s name?',
        q3: 'How many children did Ned Stark Have?',
        q4: 'What does Tyrion do?',
        q5: "Where does Viserys die?",
        q6: 'How many days does the Fight for the living take?',
        q7: "Who is the leader of the wildings?"
    },
    options: {
        q1: ['Direwolf', 'Dragon', 'Rose', 'Lion'],
        q2: ['Viserion', 'Drogon', 'Veraxes', 'Balerion'],
        q3: ['6', '2', '1', '3'],
        q4: ['Drink and Know Things', 'Plot and Murder', 'Play and Eat', 'Nothing'],
        q5: ['In Quarth', 'In the Red Keep', 'In Vaes Dothrak', 'In the Great Grass Sea'],
        q6: ['7', '2', '4', '1'],
        q7: ['Jon', 'Ygritte', 'Mance', 'The Night King']
    },
    answers: {
        q1: 'Direwolf',
        q2: 'Drogon',
        q3: '6',
        q4: 'Drink and Know Things',
        q5: 'In Vaes Dothrak',
        q6: '1',
        q7: 'Mance'
    },

    //Function that starts the timer
    startTimer: function () {
        clearInterval(triviaObj.timerId);
        triviaObj.timerId = setInterval(decrement, 1000);
        //decreases interval by 1 every second
        function decrement() {
            triviaObj.timer--;
            $("#timer-heading").text("Time Left: " + triviaObj.timer);
            if (triviaObj.timer === 0) {
                stop();
                alert("Time's Up!");
            }
        }

        function stop() {
            clearInterval(triviaObj.timerId);
        }
    },

    startGame: function () {
        //Shows all elements for the trivia question
        //Hides instructions
        $("#instructions-row").hide();
        $("#ready-gif-row").hide();
        $("#timer-row").show()
        $("#question-row").show();
        $(".padding-row").show();
        $("#choice1-row").show();
        $("#choice2-row").show();

        //testing
        console.log("Inside the onclick for the startgame function");

        this.correct = 0;
        this.incorrect = 0;
        triviaObj.startTimer();
        triviaObj.nextQuestion();

    },

    nextQuestion: function () {
        this.timer = 20;
        questionCount = 0;
        // $("#").empty();
        if (questionCount === 0) {
            $('#question-heading').text('Question: ' + this.questions.q1);
            $('#choice-1').text(this.options.q1[0]);
            $('#choice-2').text(this.options.q1[1]);
            $('#choice-3').text(this.options.q1[2]);
            $('#choice-4').text(this.options.q1[3]);

        } else if (questionCount === 1) {
            $('#question-heading').text('Question: ' + this.questions.q2);
            $('#choice-1').text(this.options.q2[0]);
            $('#choice-2').text(this.options.q2[1]);
            $('#choice-3').text(this.options.q2[2]);
            $('#choice-4').text(this.options.q2[3]);

        } else if (questionCount === 2) {
            $('#question-heading').text('Question: ' + this.questions.q3);
            $('#choice-1').text(this.options.q3[0]);
            $('#choice-2').text(this.options.q3[1]);
            $('#choice-3').text(this.options.q3[2]);
            $('#choice-4').text(this.options.q4[3]);

        } else if (questionCount === 3) {
            $('#question-heading').text('Question: ' + this.questions.q4);
        } else if (questionCount === 4) {
            $('#question-heading').text('Question: ' + this.questions.q5);
        } else if (questionCount === 5) {
            $('#question-heading').text('Question: ' + this.questions.q6);
        } else if (questionCount === 6) {
            $('#question-heading').text('Question: ' + this.questions.q7);
        };
    },
};