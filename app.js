/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Initialise the game
var scores, roundScore, activePlayer, gamePlaying;
init();

//Instructions
document.getElementById("popup").addEventListener("click", function() {
  document.getElementById("main").style.visibility = "hidden";
  document.getElementById("instructions").style.visibility = "visible";
});

//Exit Instructions
document.getElementById("closepopup").addEventListener("click", function() {
  document.getElementById("instructions").style.visibility = "hidden";
  document.getElementById("main").style.visibility = "visible";
});

//Roll Dice Button
document.querySelector(".btn-roll").addEventListener("click", function() {

//Game Play 1
  if (gamePlaying) {
    //1. Generate random dice number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display corresponding dice image for the random dice number
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //3. Update the round score only IF the rolled number was not a 1, otherwise it's the next players turn
    if (dice !== 1) {
      //Update round score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore; //Displays updated round score for the relevant player
    } else {
      //Pass to next player
      document.querySelector("img").src = "dice-1.png";
      nextPlayer();
    }
  }
});

// Hold Button
document.querySelector(".btn-hold").addEventListener("click", function() {

//Game Play 2
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Update UI to show updated score
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    //1. Check if the player has won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      //2. Hide dice if they win
      document.querySelector(".dice").style.display = "none";
      //3. Add the .winner CSS class to the style of the background & remove 'active' class
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      //Pass it to the next player
      nextPlayer();
    }
  }
});

//Next Player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //Set round score back to zero
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //Make active player visible in user interface
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //When someone rolls a 1 to hide the dice before the next person has a go
  //document.querySelector(".dice").style.display = "none";
}

//New Game Button / Init Function
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; //Start at 0. Player 1 will be 0, Player 2 will be 1.
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0"; //Sets the main 'score' for player 1 to 0
  document.getElementById("score-1").textContent = "0"; //Sets the main 'score' for player 2 to 0
  document.getElementById("current-0").textContent = "0"; //Sets the 'current' score for player 1 to 0
  document.getElementById("current-1").textContent = "0"; //Sets the 'current' score for player 2 to 0
  document.getElementById("name-0").textContent = "Player 1"; //Resets the player 1 and player 2 names
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner"); //remove winner class in case of both players
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active"); //remove the active class and re-add
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active"); //only add it back to the first one
}

// Made by Susan Johnson
//github.com/cybero
