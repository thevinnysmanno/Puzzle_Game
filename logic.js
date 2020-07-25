const squares = document.querySelectorAll('.square');
const button = document.querySelector('#button');

let hasSelected = false;
let first, second; 
let counter = 0;
const answerArr = [0,1,2,3,4,5,6,7,8]

// Checks if user has solved the puzzle
function checkSolved() {
	for (i=0;i<9;i++) {
		position = document.getElementById(i.toString());
		console.log(position);
		if (position.style.order === i) { 
			i++;
			console.log("Made it!"); } 
		else { return false; }
	}
	return true;
}

// Card selection functionality
function selectCard() {

	// Toggles the selection styles
	if (this.classList.contains('selected')) { this.classList.remove('selected'); }
	else { this.classList.add('selected'); }

	// First tile has been chosen
	if (!hasSelected) { 
		hasSelected = true;
		first = this;
	}
	else {
		// If one tile is selected resets styles
		hasSelected = false;
		second = this;
		squares.forEach(square => square.classList.remove('selected'));

		// Swaps the chosen squares (first & second)
		let temp = first.style.order;
		first.style.order = second.style.order;
		second.style.order = temp;
		counter++;
	}
	// Runs each time to see if user has completed the puzzle
	if(checkSolved()) { 
		alert("Congratulations!!! You won in " + counter + " moves!!");
		counter = 0;
		button.style.visibility = "visible";
	}
}

// Board shuffling functionality
function scrambleBoard() {

	let numArr = [0,1,2,3,4,5,6,7,8]
	let arr = [];
	let randomNumber; 
	let i = numArr.length;

	// Creates a random, non-repeating array
	while (numArr.length != 0) {
		randomNumber = Math.floor(Math.random()*i);
		arr.push(numArr[randomNumber]);
		i--;
		numArr.splice(randomNumber, 1);
	}
	// Shuffles the board according to the random array
	let e = 0;
	squares.forEach(square => {
		square.style.order = arr[e];
		e++;
	});
    button.style.visibility = "visible" ? "hidden" : "visible";
}

// Assigns event listeners to dynamic elements
squares.forEach(square => square.addEventListener('click', selectCard));
button.addEventListener('click', scrambleBoard);
