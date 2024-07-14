// Get reference to the high scores list element
const highScoresList = document.getElementById('highScoresList');

// Retrieve the high scores from localStorage, or initialize an empty array if not found
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// Generate HTML list items for each high score and set the innerHTML of the high scores list
highScoresList.innerHTML = highScores
    .map(score => `<li>${score.name} - ${score.score}</li>`) // Map each score object to a list item string
    .join('');// Join all list items into a single string and set as innerHTML of highScoresList
