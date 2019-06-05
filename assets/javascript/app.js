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
        console.log("Inside the onclick for the start button");

        //An object full of questions and answers
        var questionsObj = {
            correct: 0;
            incorrect: 0;
            timer: 20;
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

            nextQuestion: function () {
                trivia.timer = 0;
            }
        };


        
    });



    //

});