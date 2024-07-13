const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');

// added timer
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;

// I've added few more questions
let questions = [
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "choice1": "<script>",
        "choice2": "<javascript>",
        "choice3": "<js>",
        "choice4": "<scripting>",
        "answer": 1
    },
    {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "choice1": "<script href='xxx.js'>",
        "choice2": "<script name='xxx.js'>",
        "choice3": "<script src='xxx.js'>",
        "choice4": "<script file='xxx.js'>",
        "answer": 3
    },
    {
        "question": "How do you write 'Hello World' in an alert box?",
        "choice1": "msgBox('Hello World');",
        "choice2": "alertBox('Hello World');",
        "choice3": "msg('Hello World');",
        "choice4": "alert('Hello World');",
        "answer": 4
    },
    {
        "question": "What does CSS stand for?",
        "choice1": "Colorful Style Sheets",
        "choice2": "Creative Style Sheets",
        "choice3": "Cascading Style Sheets",
        "choice4": "Computer Style Sheets",
        "answer": 3
    },
    {
        "question": "Which HTML attribute is used to define inline styles?",
        "choice1": "styles",
        "choice2": "style",
        "choice3": "class",
        "choice4": "font",
        "answer": 2
    },
    {
        "question": "Which is the correct CSS syntax?",
        "choice1": "body:color=black;",
        "choice2": "{body;color:black;}",
        "choice3": "body {color: black;}",
        "choice4": "{body:color=black;}",
        "answer": 3
    },
    {
        "question": "How do you insert a comment in a CSS file?",
        "choice1": "/* this is a comment */",
        "choice2": "// this is a comment",
        "choice3": "' this is a comment",
        "choice4": "// this is a comment //",
        "answer": 1
    },
    {
        "question": "Which property is used to change the background color?",
        "choice1": "bgcolor",
        "choice2": "background-color",
        "choice3": "color",
        "choice4": "bg-color",
        "answer": 2
    },
    {
        "question": "How do you add a background color for all <h1> elements?",
        "choice1": "all.h1 {background-color: #FFFFFF;}",
        "choice2": "h1.setAll {background-color: #FFFFFF;}",
        "choice3": "h1 {background-color: #FFFFFF;}",
        "choice4": "h1.all {background-color: #FFFFFF;}",
        "answer": 3
    },
    {
        "question": "Which JavaScript event occurs when the user clicks on an HTML element?",
        "choice1": "onchange",
        "choice2": "onmouseover",
        "choice3": "onmouseclick",
        "choice4": "onclick",
        "answer": 4
    },
    {
        "question": "How do you declare a JavaScript variable?",
        "choice1": "v carName;",
        "choice2": "var carName;",
        "choice3": "variable carName;",
        "choice4": "var: carName;",
        "answer": 2
    },
    {
        "question": "Which operator is used to assign a value to a variable?",
        "choice1": "*",
        "choice2": "x",
        "choice3": "=",
        "choice4": "-",
        "answer": 3
    },
    {
        "question": "What will the following code return: Boolean(10 > 9)",
        "choice1": "NaN",
        "choice2": "false",
        "choice3": "true",
        "choice4": "undefined",
        "answer": 3
    },
    {
        "question": "Which JavaScript function is used to parse a string to an integer?",
        "choice1": "parseInt()",
        "choice2": "parseFloat()",
        "choice3": "parse()",
        "choice4": "intParse()",
        "answer": 1
    }
];

// Define constants for score bonus, maximum questions, and maximum time per question
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// set to 15
const MAX_TIME = 15;



startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    clearInterval(timer);

    // If there are no more available questions or the question counter exceeds the max, end the game
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    // Select a random question from the available questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

    // Start the timer for the current question
    let time = MAX_TIME;
    timerText.innerText = `Time: ${time}`;
    timer = setInterval(() => {
        time--;
        timerText.innerText = `Time: ${time}`;
        if (time <= 0) {
            clearInterval(timer);
            getNewQuestion();
        }
    }, 1000);
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Remove the applied class and get a new question after a delay
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// To increment the score
incrementScore = num => {
    score += num;
    scoreText.innerText = `Score: ${score}`;
};

startGame();
