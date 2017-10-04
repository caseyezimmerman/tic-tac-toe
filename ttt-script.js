




var player1Squares = []
var player2Squares = []
var playerMoves = 0
var player1img = `<img src="turtle.png" />`
var player2img = `<img src="whale.png" />`
var gameOver = false
var whosTurn = 1
var numplayers = 1
var score = [
	0,
	0
]

// ##CREATE VARIABLE OR ARRAYS FOR EACH WINNING COMBO
var winningCombos = [
	["A1", "A2", "A3"],
	["B1", "B2", "B3"],
	["C1", "C2", "C3"],
	["A1", "B1", "C1"],
	["A2", "B2", "C2"],
	["A3", "B3", "C3"],
	["A1", "B2", "C3"],
	["A3", "B2", "C1"],
]


// ##CREATE markSquare FUNCTION FOR WHEN THE USER CLICKS A SQUARE
var markSquare = function(squareClicked){
	if(squareClicked.innerHTML !== "*"){
		document.getElementById('message').innerHTML = ('Sorry, that square is taken')
	}else if(whosTurn === 1){
		squareClicked.innerHTML = player1img
		playerMoves++
		player1Squares.push(squareClicked.id)
		// console.log(player1Squares)
		whosTurn = 2
		document.getElementById('message').innerHTML = ''
		checkWin(player1Squares, 1)
		// console.log("click")
		if((numplayers == 1) && (!gameOver)){
			setTimeout(function(){
				computerMove();
			}, 1000)
			// computerMove();

		}
	}else {
		squareClicked.innerHTML = player2img
		player2Squares.push(squareClicked.id)
		playerMoves++
		console.log(playerMoves)
		// console.log(player2Squares)
		whosTurn = 1
		document.getElementById('message').innerHTML = ''
		checkWin(player2Squares, 2)
	}
}

//###CREATE COMPUTER MOVE FUNCTION
function computerMove(){
	//find a random square
	//see if its empty
	//if it is, send it to square
	//if its not, keep looking
	var squareFound = false;
	while(!squareFound){
		rand = Math.floor(Math.random() * 9);
		var isTaken = squares[rand].innerHTML;
		if (isTaken === "*"){
			squareFound = true;
			// myVar = setTimeout(computerMove, 3000);
			
		}
	}
	if (playerMoves >= 8){
		squareFound = false;
	}

	markSquare(squares[rand]);
}




// ##CREATE A LOOP WHICH ITERATES THROUGH THE WINNING COMBO ARRAYS
// ##ALSO CREATE A LOOP WITHIN THAT LOOP THAT ITERATES THROUGH THE INDIVIDUAL SQUARES OF THE WINNING COMBOS
function checkWin(currentPlayerSquares, whoJustMarked){
	for(let i = 0; i < winningCombos.length; i++){
		var squareCount = 0;
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j]
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				squareCount ++;
				// console.log(squareCount)
			}
		}
		if(squareCount === 3){
			endGame(winningCombos[i], whoJustMarked);
			break;
			// document.getElementById('message').innerHTML = `Player ${whoJustMarked} has won`
			// console.log(`Player ${whoJustMarked} won the game`)
			// gameOver = true

		}
		if (playerMoves === 9){
			tieGame();
		}
	}
}

//CREATE AN END GAME FUNCTION FOR SQUARECOUNT===3
function endGame(winningCombo,whoJustMarked){
	if(whoJustMarked === 1){
		score[0]++;
	}
	else{
		score[1]++;
	}
	console.log(`Player ${whoJustMarked} won the game`);
	document.getElementById('message').innerHTML = `Congrats player ${whoJustMarked} won the game`;
	gameOver = true;
	// ##LOOP THROUGH THE WINNING COMBOS AND ADD A CLASS
	// for(let i=0; i < winningCombo.length; i++){
	// 	var theSquare = document.getElementById(winningCombo[i]);
	// 	theSquare.className += 'winning-square';
	// }
	document.getElementById('reset-button').innerHTML = `<button id ="reset" class="btn btn-lg btn-success">Reset Game</button>`
	var resetButton = document.getElementById('reset');          //added a new id of reset here
	resetButton.addEventListener("click", function(event){
		reset();
		document.getElementsByClassName('player1-score')[0].innerHTML = score[0];
		document.getElementsByClassName('player2-score')[0].innerHTML = score[1];
	})

}

function reset(){
	console.log("new reset button, user clicked it")
	//IN ORDER TO RESET THE GAME WE MUST RESET/CLEAR ALL ARRAYS
	player1Squares = [];
	player2Squares = [];
	playerMoves = 0
	//RESET THE DOM TO ITS FORMER 
	for(let i=0; i < squares.length; i++){
		squares[i].innerHTML = "*"
		squares[i].className = 'square'
	}
	//RESET THE GAMEOVER BOOL
	gameOver = false
	//RESET ANY COUNTERS
	//WINNING CLASS NEEDS TO BE WIPED
}

// ##CREATE LOOP FOR ALL SQUARES WITH A CLICK EVENT LISTENER
var squares = document.getElementsByClassName('square')
for(let i=0; i<squares.length;i++){
	squares[i].addEventListener('click', function(event){
		if(!gameOver){
			markSquare(this)
		}else{
			console.log("You can't play")
		}
	});
}


//MAKE A RESET BUTTON


document.getElementById('one-player').addEventListener('click', function(event){
	console.log("one player game")
	gameOver = false
	numplayers = 1;
	var nameBox = document.getElementById('player-name');
	// var name = nameBox.value
	if(nameBox.value !== ""){
		name = nameBox.value
	}
})

document.getElementById('two-player').addEventListener('click', function(event){
	console.log("two player game")
	gameOver = false
	numplayers = 2;
	var nameBox = document.getElementById('player-name');
	// var name = nameBox.value
	if(nameBox.value !== ""){
		name = nameBox.value
	}
})

function tieGame(){
	gameOver = true
	document.getElementById('message').innerHTML = "It's a tie"
	document.getElementById('reset-button').innerHTML = `<button id ="reset" class="btn btn-lg btn-success">Reset Game</button>`
	var resetButton = document.getElementById('reset');          //added a new id of reset here
	resetButton.addEventListener("click", function(event){
		reset();
	});
}




// computerMove();






