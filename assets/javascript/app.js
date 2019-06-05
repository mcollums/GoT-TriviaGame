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

    $("#start-button").click(function () {
        //Shows all elements for the trivia question
        //Hides instructions
        $("#instructions-row").hide();
        $("#ready-gif-row").hide();
        $("#timer-row").show()
        $("#question-row").show();
        $(".padding-row").show();
        $("#choice1-row").show();
        $("#choice2-row").show();
       });

    //An object full of questions and answers

    //

});