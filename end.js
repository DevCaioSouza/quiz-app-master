// Get references to DOM elements
const finalScore = document.getElementById('finalScore');
const saveScoreForm = document.getElementById('saveScoreForm');
const username = document.getElementById('username');

//To Get the recent score from the localStorage
const mostRecentScore = localStorage.getItem('mostRecentScore');
// Get the high scores from localStorage, or initialize an empty array if not found
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// maximum number of high score to keep
const MAX_HIGH_SCORES = 5;

// Will Display the recent score on the page
finalScore.innerText = `Your score is: ${mostRecentScore}`;

//to handle form Submission 
saveScoreForm.addEventListener('submit', e => {
//Prevent the default form submission behavior
    e.preventDefault();

 // Create a score object with the most recent score and the username from the input field
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    // Add the new score to the high scores array
    highScores.push(score);
    // Sort the high scores array in descending order based on score
    highScores.sort((a, b) => b.score - a.score);
    
    // Keep only the max scores
    highScores.splice(MAX_HIGH_SCORES);

    // Save the updated high scores array to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirect the user to the highscores.html page
    window.location.assign("highscores.html");
});
