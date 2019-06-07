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
    timer: 20,
}

var questionsArr = [
    {
        // number = 1
        question: "Which direwolf of House Stark was blamed and killed for an attack on Prince Joffrey Baratheon?",
        options: ["Nymeria", "Grey Wind", "Lady", "Summer"],
        answer: "Lady",
        gif: "https://media.giphy.com/media/DKa2S8IyZGf6g/giphy.gif",
        tidbit: "After Arya’s direwolf Nymeria flees into the woods following a defensive attack against Prince Joffrey, Queen Cersei Lannister orders the execution of her littermate, Lady."
    },
    {
        // number = 2
        question: "How many times has Beric Dondarrion been brought back to life?",
        options: ['Five Times', 'Three Times', 'Seven Times', 'Six Times'],
        answer: 'Six Times',
        gif: "https://66.media.tumblr.com/1a0196d5af0685cd6737cb31b6e3e320/tumblr_ov3rxm1Bva1s5m21go1_500.gif",
        tidbit: "Beric Dondarrion has been resurrected by the God of Light a total of six times. His constant cheating of death comes with a price: each time, he explains, he looses some of his memories and is less himself."
    },
    {
        // number = 3;
        question: "The phrase ‘Valar Morghulis’ or ‘All Men Must Die’ is customarily responded with ‘Valar Dohaeris’ which means ______?",
        options: ["All Men Must Live", "All Men Must Serve", "All Men Must Grow", "All Men Must Fight"],
        answer: "All Men Must Serve",
        gif: "https://media.giphy.com/media/c1oP0AunRfP7a/giphy.gif",
        tidbit: "The Season 2 finale was named \"Valar Morghulis\" while the Season 3 premiere was named \"Valar Dohaeris.\" In 2014, the Brewery Ommegang created a beer called \"Valar Morghulis,\" with each cork fire-branded with the response."
    },
    {
        // number = 4
        question: "What is the name of Tyrion Lannister’s first wife?",
        options: ["Sansa", "Roslin", "Anya", "Tysha"],
        answer: "Tysha",
        gif: "https://media2.giphy.com/media/NyvaiYod2ShwI/source.gif",
        tidbit: "Unbeknownst to Tyrion, Jamie paid the prostitute Tysha to lay with Tyrion as a gift, but Jaime did not expect them to get married, or for Tywin’s reaction to be so extreme."
    },
    {
        // number = 5
        question: "Which one of these phrases is not the words of a great Westerosi house?",
        options: ["Unbowed, Unbent, Unbroken", "Shadow Passes, Light Remains", "Ours is the Fury", "Hear Me Roar"],
        answer: "Shadow Passes, Light Remains",
        gif: "https://media.giphy.com/media/jDhSk15F65wzK/giphy.gif",
        tidbit: "The Lannisters are an unusual case from other houses in that their unofficial motto “A Lannister always pays his debts” is used far more often  their official motto, “Hear Me Roar”. "
    },
    {
        // number = 6
        question: "‘It’s nothing’ were the last words of this character:",
        options: ["Tywin Lannister", "Stannis Baratheon", "Khal Drogo", "Joffrey Baratheon"],
        answer: "Joffrey Baratheon",
        gif: "https://media.giphy.com/media/Az8qq276ke2BO/giphy.gif",
        tidbit: "King Joffrey Baratheon uttered these rather unremarkable last words after being poisoned on his wedding day. Joffrey was killed by a potion called 'The Strangler,' which causes the throat to immediately swell shut."
    },
    {
        // number = 7
        question: "What is the second biggest city in Westeros?",
        options: ["Kings Landing", "Lannisport", "Oldtown", "Highgarden"],
        answer: "Oldtown",
        gif: "https://media.giphy.com/media/xT8qBqOYRgZIVbI2u4/giphy.gif",
        tidbit: "Oldtown is the second largest and most populated city in the Six Kingdoms, and by far the oldest major city in Westeros, dating back to the time of the First Men."
    },
    {
        // number = 8
        question: "What is Sansa’s favorite dessert?",
        options: ["Strawberry Pie", "Lemon Cakes", "Sweetrolls", "Blueberry Tarts"],
        answer: "Lemon Cakes",
        gif: "https://66.media.tumblr.com/2510f12347c5b8ab3491b4da8e928dbb/tumblr_pbwt1aVGGG1whnnjso6_500.gif",
        tidbit: "Olenna and Margaery Tyrell share some lemon cakes with Sansa when they meet her in the gardens of the Red Keep to learn more about Joffrey Baratheon, now Margaery's future husband. Sansa reveals that Joffrey is \"a monster\"."
    },
    {
        // number = 9
        question: "Loras Tyrell's distinct birthmark was in the shape of which place?",
        options: ["Dorne", "The Iron Islands", "The Fingers", "Westeros"],
        answer: "Dorne",
        gif: "https://media.giphy.com/media/9ZHTZy6Z7asDu/giphy.gif",
        tidbit: "Loras is a skilled knight famed for his many tournament victories and his good looks, which make him popular with the smallfolk and with young women in particular. Loras is one of the few knights who has on rare occasion managed to defeat the formidable Jaime Lannister in a joust."
    },
    {
        // number = 10
        question: "Only Eastwatch by the sea, castle black and ____ are manned by the Nights Watch",
        options: ["Nightfort", "Greenguard", "Deep Lake", "Shadow Tower"],
        answer: "Shadow Tower",
        gif: "https://media.giphy.com/media/3oEjHUf7j0aFDce0dG/giphy.gif",
        tidbit: "The Night's Watch raised nineteen castles to guard the hundred leagues of the Wall, although they have never manned more than seventeen at one time. The most western castle, Shadow Tower, is garrisoned by two hundred men."
    },
    {
        // number = 11
        question: "Where is Melisandre from?",
        options: ["Naath", "Quarth", "Asshai", "Braavos"],
        answer: "Asshai",
        gif: "https://media1.giphy.com/media/1313Ip2xoD0mFa/giphy.gif",
        tidbit: "Asshai is a mysterious port city located in the far south-east of Essos near the Shadowlands and is where Dany’s dragon eggs are reportedly from."
    },
    {
        // number = 12
        question: "Who’s name has not been on Arya’s kill list at any time?",
        options: ["Jamie Lannister", "Thoros of Myr", "The Hound", "Melisandre"],
        answer: "Jamie Lannister",
        gif: "https://media2.giphy.com/media/msWAqLGnlgvvi/giphy.gif?cid=790b76115cf9da7538725477456d1efe&rid=giphy.gif",
        tidbit: "Out of 13 people on Arya’s kill list, she only killed Rorge, Ser Meryn Trant, Polliver and Walder Frey. Others are removed from the list, died in other ways or in Ser Ilyn Payne’s case, removed from the show."
    },
    {
        // number = 13
        question: "Who are Daenerys’ parents?",
        options: ["Aemon & Ellia", "Aerys II & Rhaella", "Aegon & Rhaenys", "Duncan & Daenerys"],
        answer: "Aerys II & Rhaella",
        gif: "https://media.giphy.com/media/mA7FB3kQ7JEnJEqvc1/giphy-downsized-large.gif",
        tidbit: "Queen Daenerys I Targaryen, also known as Dany and Daenerys Stormborn, was the younger sister of Rhaegar Targaryen and Viserys Targaryen and only daughter of King Aerys II Targaryen and Queen Rhaella Targaryen."
    },
    {
        // number = 14
        question: "What is the surname given to bastards in the Reach?",
        options: ["Thorn", "Flowers", "Garden", "Hill"],
        answer: "Flowers",
        gif: "https://media.giphy.com/media/PfzDNs7r1tw88/giphy.gif",
        tidbit: "Waters for King’s Landing and Dragonstone, Snow for the North, Pyke for the Iron Islands, Rivers for the Riverlands, Stone for the Vale, Hill for the Westerlands, Flowers for the Reach, Storm for the Stormlands and Sand for Dorne."
    },
    {
        // number = 15
        question: "Which one of these is not a poison in the GoT Universe?",
        options: ["Manticore Venom", "Lily of the Valley", "Basilisk’s Blood", "Tears of Lys"],
        answer: "Lily of the Valley",
        gif: "https://media.giphy.com/media/3o6ozubtomwzbU6msM/source.gif",
        tidbit: "Common poisons include nightshade and powdered greycap, derived from a plant and a variety of toadstool respectively. Animal and insect venoms such as basilisk and manticore venom are also known to be used, though they are harder to gather."
    },
    {
        // number = 16
        question: "Which shellfish species did Arya Stark sell on the docks in Braavos?",
        options: ["Mussles", "Clams", "Crabs", "Scallops"],
        answer: "Clams",
        gif: "https://media1.tenor.com/images/2879af71b7f6080c435c6db214bf053a/tenor.gif",
        tidbit: "Arya's first assignment from the House of Black and White is to pose as a shellfish merchant to study a target known as \"the Thin Man\" but she gets distracted when she sees Ser Meryn Trant who is on her kill list."
    },
    {
        // number = 17
        question: "What is Hodor’s real name?",
        options: ["Willam", "Wylis", "Walis", "Walder"],
        answer: "Wylis",
        gif: "https://media.giphy.com/media/hz69YUpLt247u/giphy.gif",
        tidbit: "Meera shouting the phrase \"Hold the door!\" through Bran and begins repeating it, eventually slurring the sentence together until it becomes \"Hodor\". Through Bran's warging, young Wylis experiences his own future death, damaging his mind, and explaining his simplistic and monotonous nature."
    },
    {
        // number = 18
        question: "Which of these characters dies first?",
        options: ["Myranda", "Myrcella Baratheon", "Meryn Trant", "Stannis Baratheon"],
        answer: "Stannis Baratheon",
        gif: "https://media.giphy.com/media/2eLDc0Wtx29Nu/giphy.gif",
        tidbit: "Stannis Baratheon dies in Season 5, episode 5. Other characters that die in season 5 include: Mance Rayder, Ser Barristan Selmy, Maester Aemon, Shireen Baratheron, Myranda, Marcella Baratheon and Jon Snow."
    },
    {
        // number = 19
        question: "Which of these titles does not belong to Daenerys?",
        options: ["Breaker of Chains", "Mother of Dragons", "The Unbroken", "Protector of the Seven Kingdoms"],
        answer: "The Unbroken",
        gif: "https://media1.tenor.com/images/37ca645867080e61f0daba3c94d975d7/tenor.gif",
        tidbit: "Daenerys earned the nickname The Unburnt after she survived walking into a funeral pyre at the end of the first season."
    },
    {
        // number = 20
        question: "What is the name of the Valyrian steel sword belonging to House Tarly? ",
        options: ["Heartsbane", "Lightbringer", "Longclaw", "Dawn"],
        answer: "Heartsbane",
        gif: "https://i.gifer.com/KyEP.gif",
        tidbit: "In Westeros there are only six Valyrian Steel weapons in possession of characters. There are three that have been lost in the time since the Blackfyre Rebellion."
    }
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

    //Populates first question
    renderQuestion();
};


function renderQuestion() {
    // hide all the results-related elements first
    $("#result-gif-row").hide();
    $("#results-row").hide();

    //restarting timer
    triviaObj.timer = 20;
    startTimer();

    //If the game has been played once, add to the questionsIndex
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

        //Showing all "Game Screen" page elements
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
    //storing outcome value to call in the showResults function
    var outcome;
    console.log(questionsArr[questionIndex].answer)
    //If the choice-block that matches the answer is clicked...
    if ($(this).text() === questionsArr[questionIndex].answer) {
        // add point to correct
        triviaObj.correct++;
        // var outcome is now correct
        outcome = "correct";
    } else {
        // add point to incorrect
        triviaObj.incorrect++;
        // var outcome is now incorrect
        outcome = "incorrect";
    }
    // call the "showResult" function
    showResult(outcome);
};

function showResult(outcome) {
    //Hiding all the "Game" elements
    $("#question-row").hide();
    $(".padding-row").hide();
    $("#choice1-row").hide();
    $("#choice2-row").hide();

    //Showing all the "Results" elements
    $("#result-gif-row").show();
    $("#results-row").show();

    //Stoping timer
    stopTimer();

    //Function to start a 15 second timer until the next question is displayed
    function resultTimer() {
        //Result timer set to 15s
        var showResultTimer = 15;
        //Timerid is decreased every second
        triviaObj.timerId = setInterval(decrement, 1000);
        //Showing how much time is left in the timer heading
        $("#timer-heading").text("Time Left: " + showResultTimer);

        //decreases interval by 1 every second
        function decrement() {
            // Result timer is decreased by 1 every second
            showResultTimer--;
            //Showing how much time is left in the timer heading
            $("#timer-heading").text("Time Left: " + showResultTimer);
            // When the timer is 0...
            if (showResultTimer === 0) {
                //Show the next question
                renderQuestion();
            }
        }
    };

    //Start timer for the "results page"
    resultTimer();

    //The gif for the answer is displayed
    $("#gif-result").attr("src", questionsArr[questionIndex].gif);
    //The tidbit for the answer is displayed
    $("#result-p").text(questionsArr[questionIndex].tidbit);


    // If the user presses the correct block...
    if (outcome === "correct") {
        //Result text is, "You are correct"
        $("#result-text").text("You are correct!");
        console.log("You are correct! " + triviaObj.correct + ".");
    }
    // If the user presses the incorrect block...
    else if (outcome === "incorrect") {
        //Result text is, "You are incorrect"
        $("#result-text").text("You are incorrect! The correct answer was " + questionsArr[questionIndex].answer + ".");
        console.log("You are correct! " + triviaObj.correct);
    }
    //If the user lets the timer runout...
    else if (outcome === "unanswered") {
        //Result text is, "Time's run out"
        $("#result-text").text("Time has run out! The correct answer was " + questionsArr[questionIndex].answer + ".");
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

    //If correct answer is 17-20 then...
    if (triviaObj.correct >= 17) {
        $("#endscreen-text").text("You're a real fan!! You got " + triviaObj.correct + " out of 20 right!");
    } 
        //If correct answer is 13-16 then...
        else if (triviaObj.correct >= 13 && triviaObj.correct <= 16) {
        $("#endscreen-text").text("Pretty good, you got " + triviaObj.correct + " out of 20 right!");
    }   
        //If correct answer is 10-12 then...
        else if (triviaObj.correct >= 10 && triviaObj.correct <= 12) {
        $("#endscreen-text").text("Pretty good, you got " + triviaObj.correct + " out of 20 right!");
    }   
        //If correct answer is 5-9 then...
        else if (triviaObj.correct >= 5 && triviaObj.correct <= 9) {
        $("#endscreen-text").text("Meh, you got " + triviaObj.correct + " out of 20 right. Try again!");
    }   
        //If correct answer is 0-4 then...
        else if (triviaObj.correct <= 4) {
        $("#endscreen-text").text("Ouch. You got " + triviaObj.correct + " out of 20 right. Try again!");
    }

    //Displays all scores
    $("#correct-count-text").text("Correct: " + triviaObj.correct);
    $("#incorrect-count-text").text("Incorrect: " + triviaObj.incorrect);
    $("#unanswered-count-text").text("Unanswered: " + triviaObj.unanswered);
};


//Function that starts the timer
function startTimer() {
    //TimerID is cleared
    clearInterval(triviaObj.timerId);
    //timerId is decreased every second
    triviaObj.timerId = setInterval(decrement, 1000);
    //displays the time remaining in the timerheading
    $("#timer-heading").text("Time Left: " + triviaObj.timer);

    //decreases interval by 1 every second
    function decrement() {
        //timer decreases by one
        triviaObj.timer--;
        //displays the time remaining in the timerheading
        $("#timer-heading").text("Time Left: " + triviaObj.timer);
        //When the timer runs out...
        if (triviaObj.timer === 0) {
            //Stop/Clear the timer;
            clearInterval(triviaObj.timer);
            //Unanswered count increased by one
            triviaObj.unanswered++;
            //Run the showResult function with the arguement "Unanswered"
            showResult("unanswered");
        }
    };
};

//Function stops the timer
function stopTimer() {
    clearInterval(triviaObj.timerId);
}

//Function resets everything that's needed in a new game.
function resetGame() {
    triviaObj.timer = 15;
    triviaObj.correct = 0;
    triviaObj.incorrect = 0;
    triviaObj.unanswered = 0;
    questionIndex = 0;
    //hides the "End Screen"
    $("#endscreen-row").hide();
    //Starts the game over from the beginning
    startGame();
}