// 1. Setup board
// 2. User should be able to click on a button, when that happens the square should have that players mark (X or O)
// 3. If its X turn put an X in, if its O's turn put in an O
// 4. 3 means we need to keep track of who's turn it is...when X goes it becomes O's turn and when O goes it becomes X's turn
// 5. Check to see if someone won the game. If so congratulate them, otherwise do nothing
//6. Highlight the winning squares
//7. Game must stop if someone won (i.e cant keep clicking)

// squares is an array with 9 objects. Each object is the JS representation of the HTML tag
var squares = document.getElementsByClassName('square');
// console.dir(squares)
// console.log(squares[0])
for(let i = 0; i < squares.length; i++){
	// console.log(squares[i])
	// now that we have each square idividually (squares[i]), we will add a click listener
	// adding an event listener goes:
	// 1. What to lsiten for 
	// 2. addEventListener
	// 3. first arg: what event
	// 4. second arg: code to run if event happens
	squares[i].addEventListener('click', function(event){
		// console.log(this)
		// call the markSquare function ad pass the square user clicked on
		// ***only call markSquare if game over = true
		// In js ! means not. so if(!gameOver) means not game over
		if(!gameOver){
		markSquare(this)
	}
	});
}


// GLOBALS
var gameOver = false;
// init whosTurn as player 1s turn
var whosTurn = 1;
var player1Squares = []
var player2Squares = []
var winningCombos = [
	['A1', 'B1', 'C1'], //Row 1
	['A2', 'B2', 'C2'], //Row 2
	['A3', 'B3', 'C3'], //Row 3
	['A1', 'A2', 'A3'], //Column 1
	['B1', 'B2', 'B3'], //Column 2
	['C1', 'C2', 'C3'], //Column 3
	['A1', 'B2', 'C3'], //Diagonal 1
	['A3', 'B2', 'C1'] //Diagonal 2
];



// Two things happen when someone clicks
// 1. change DOM (for the user)
// 2. We chage the vars for JS

function markSquare(squareClicked){
	console.log(squareClicked.innerHTML);
	if (squareClicked.innerHTML !== '-'){
		document.getElementById('message').innerHTML = 'Sorry that square is taken'
	}else if(whosTurn === 1){
		squareClicked.innerHTML = "X"
		whosTurn = 2
		player1Squares.push(squareClicked.id)
		console.log(player1Squares)
		document.getElementById('message').innerHTML = ''
		checkWin(player1Squares, 1)
	}else{
		squareClicked.innerHTML = "O"
		whosTurn = 1
		player2Squares.push(squareClicked.id)
		document.getElementById('message').innerHTML = ''
		checkWin(player2Squares, 2)
	}
	// checkWin();
}

function checkWin(currentPlayerSquares, whoJustMarked){
	// neeed 2 pieces:
	// 1. outer loop - check each winning combo
	// 2. inner loop - check a square inside a winning combo 
	for(let i = 0; i < winningCombos.length; i++){
		var squareCount = 0 //(keep track of how many of THIS winning combo the player has)
		for (let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j] //[i] will be row and [j] will be a square within that row
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				//the square belongs to the player, we don't care where
				squareCount ++;
			}
		 } //end of j loop(row/diag/col complete)
		//check to see if the squareCount === 3
		if(squareCount === 3){
			// move stuff to a function
			endGame(winningCombos[i], whoJustMarked);
			break;
		}
	}
}

function endGame(winningCombo,whoJustMarked){
	// move stuff to a function
			console.log(`Player ${whoJustMarked} won the game`)
			document.getElementById('message').innerHTML = `Congrats to player ${whoJustMarked}`
			gameOver = true
			// loop through the winning combos, and add a class
			for(let i = 0; i < winningCombo.length; i++){
				var theSquare = document.getElementById(winningCombo[i])
				theSquare.className += 'winning-square'
			}
}



