const questionText = document.getElementById('question')
const choicesArr = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const timerText = document.getElementById('timer')
const timerBar = document.getElementById('timer-bar')

let score = 0
let questionCounter = 0
let currentQuestion = {}
let availableQuestions = []
// let acceptingAnswers = false
let timer

const MAX_QUESTIONS = 10
const CORRECT_BONUS = 10
const MAX_TIME = 15

let questionsArr = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: 'What does CSS stand for?',
    choice1: 'Colorful Style Sheets',
    choice2: 'Creative Style Sheets',
    choice3: 'Cascading Style Sheets',
    choice4: 'Computer Style Sheets',
    answer: 3,
  },
  {
    question: 'Which HTML attribute is used to define inline styles?',
    choice1: 'styles',
    choice2: 'style',
    choice3: 'class',
    choice4: 'font',
    answer: 2,
  },
  {
    question: 'Which is the correct CSS syntax?',
    choice1: 'body:color=black;',
    choice2: '{body;color:black;}',
    choice3: 'body {color: black;}',
    choice4: '{body:color=black;}',
    answer: 3,
  },
  {
    question: 'How do you insert a comment in a CSS file?',
    choice1: '/* this is a comment */',
    choice2: '// this is a comment',
    choice3: "' this is a comment",
    choice4: '// this is a comment //',
    answer: 1,
  },
  {
    question: 'Which property is used to change the background color?',
    choice1: 'bgcolor',
    choice2: 'background-color',
    choice3: 'color',
    choice4: 'bg-color',
    answer: 2,
  },
  {
    question: 'How do you add a background color for all <h1> elements?',
    choice1: 'all.h1 {background-color: #FFFFFF;}',
    choice2: 'h1.setAll {background-color: #FFFFFF;}',
    choice3: 'h1 {background-color: #FFFFFF;}',
    choice4: 'h1.all {background-color: #FFFFFF;}',
    answer: 3,
  },
  {
    question:
      'Which JavaScript event occurs when the user clicks on an HTML element?',
    choice1: 'onchange',
    choice2: 'onmouseover',
    choice3: 'onmouseclick',
    choice4: 'onclick',
    answer: 4,
  },
  {
    question: 'How do you declare a JavaScript variable?',
    choice1: 'v carName;',
    choice2: 'var carName;',
    choice3: 'variable carName;',
    choice4: 'var: carName;',
    answer: 2,
  },
  {
    question: 'Which operator is used to assign a value to a variable?',
    choice1: '*',
    choice2: 'x',
    choice3: '=',
    choice4: '-',
    answer: 3,
  },
  {
    question: 'What will the following code return: Boolean(10 > 9)',
    choice1: 'NaN',
    choice2: 'false',
    choice3: 'true',
    choice4: 'undefined',
    answer: 3,
  },
  {
    question:
      'Which JavaScript function is used to parse a string to an integer?',
    choice1: 'parseInt()',
    choice2: 'parseFloat()',
    choice3: 'parse()',
    choice4: 'intParse()',
    answer: 1,
  },
]

startGame = () => {
  score = 0
  currentQuestion = 0
  availableQuestions = [...questionsArr]
  getNewQuestion()
}

getNewQuestion = () => {
  timerBar.classList.add('round-time-bar')

  clearInterval(timer)

  questionCounter++

  if (questionCounter > MAX_QUESTIONS || availableQuestions.length === 0) {
    return window.location.assign('end.html')
  }

  // pegando a questão e jogando seu enunciado na tela
  const randomIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[randomIndex]
  questionText.innerText = currentQuestion.question

  console.log(timerBar)

  for (let i = 0; i < choicesArr.length; i++) {
    choicesArr[i].innerText = currentQuestion[`choice${i + 1}`]
  }

  // acceptingAnswers = true

  availableQuestions.splice(randomIndex, 1)

  progressText.innerText = `Progresso: Questão ${questionCounter} de ${MAX_QUESTIONS}`

  // start timer
  

  let time = MAX_TIME
  timerText.innerText = `Tempo restante: ${time}`
  // timer = setInterval(() => {
  //   time--
  //   timerText.innerText = `Tempo restante: ${time}`
  //   if (time <= 0) {
  //     console.log(timerBar)
  //     clearInterval(timer)
  //     timerBar.remove
  //     getNewQuestion()
  //   }
  // }, 1000)

  barTimeout = setTimeout(() => {
    timerBar.classList.remove('round-time-bar')
    console.log('Timeout end')
  }, 14900)
  
}

choicesArr.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    timerBar.classList.remove('round-time-bar')

    selectedChoice = e.target
    selectedAnswer = selectedChoice.dataset['number']

    const answerValue =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    selectedChoice.parentElement.classList.add(answerValue)

    if (answerValue == 'correct') {
      score += CORRECT_BONUS
      scoreText.innerText = `Score: ${score}`
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(answerValue)
      timerBar.classList.remove('round-time-bar')
      clearInterval(barTimeout)
      console.log('Timer bar removida')
      getNewQuestion()
    }, 1000)
  })
})

startGame()
