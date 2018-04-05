
var newGameBtn = document.getElementById('js-newGameButton'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    name = document.getElementById('js-playerName');

//function who don't allow more than 15 letters in name  
function lenghtName () {
   var playerName = player.name.length;
    if (playerName >= 15){
        alert('Your name is to long');
        newGame();
    }
} 

// Define a listener on buttons who start function the player choise 
newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock'); });
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });

// Define status game and store objects (player and computer)
var gameState = 'notStarted' || 'started' || 'ended',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

// function who store status game
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        break;
    case 'ended':
        newGameBtn.innerText = 'One more time';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

// Function who started when click button 'new game'/'one more time'.
function newGame() {
    player.name = prompt('Your name', '');
    lenghtName();
    
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

// Function who random choice computer, integer betwen 0 and 2
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// Function who put player and computer choices on the site

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

//Check who won && add points && display points on the site
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick === computerPick) {
        winnerIs = 'noone';
        playerResultElem.innerHTML = computerResultElem.innerHTML = 'Remis';
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
    gameEnd();
}

// Display result game on the page
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// function check who (player or computer) has 10 points.
function gameEnd () {
    if (player.score == 10){
        alert('Congratulation! ' + player.name + '. ' + ' You Win!');
        gameState = 'ended';
        setGameElements();
    }
    else if (computer.score == 10) {
        alert("I'm sorry. " + player.name +'. ' + 'You lose.');
        gameState = 'ended';
        setGameElements();
    }
}
