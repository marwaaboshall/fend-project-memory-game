// Declaring global variables
let cards = ['fa fa-diamond','fa fa-paper-plane-o',
'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt',
'fa fa-cube','fa fa-cube','fa fa-bolt','fa fa-leaf','fa fa-bicycle','fa fa-bomb',
'fa fa-leaf','fa fa-bicycle','fa fa-bomb'];

const stars = document.getElementsByClassName('star');
const movesText  =  document.getElementById('moves');

let timer = 0;
let moves = 0;
let starsCounter = 3;
let matches = 0;
let openCards = [];
let parentList = [];
let showOpen = ['show' , 'open'];


initGame();

// init game function, initializes the game by shuffling the cards, creating the cards and inserting them
// into the parent element which is deck.
// starting the timer and adding an eventlistener to the reset button.
function initGame() {
	let shuffledCards = shuffle(cards);
	let deck = document.querySelector('.deck');

	for(let card of shuffledCards) {
		let cardHTML = `<li class="card">
		<i class="${card} image"></i>
		</li>`;
		deck.insertAdjacentHTML('beforeend',cardHTML);
	}

	deck.addEventListener('click' , respondToTheClick);
	let resetButton = document.getElementById("reset");
	resetButton.addEventListener('click', resetGame);
	countTime();
}

// Seconds counter function
function countTime() {
	let timerText = document.getElementById("timer");
	setInterval(function(){
		timer += 1;
		timerText.innerText = `Timer: ${timer}`;
	},1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Showing cards by adding show and open classes to them.
function showCards(card) {
	if(card.classList.contains("open")) {
		return true;
	}
	parentList.push(card);
	card.classList.add(...showOpen);
	openCards.push(card.querySelector('i'));
}

// Adding rubberBand animations if the open cards match and increasing the number of matches by 1.
function matchCards(cardsParentsList) {
	let rubberBandAnimations = ['match' , 'animated' , 'rubberBand'];
	cardsParentsList[0].classList.add(...rubberBandAnimations);
	cardsParentsList[1].classList.add(...rubberBandAnimations);
	matches += 1;
}

// Adding wobbleAnimations if the open cards don't match.
// then removing show and open classes from the cards to hide them.
function notMatchCards(cardsParentsList) {
	let wobbleAnimations = ["notamatch" , "animated" , "wobble"];
	cardsParentsList.forEach(function(item, index, arr) {
		setTimeout(function hide() {
			item.classList.add(...wobbleAnimations);
		}, 200);
		setTimeout(function hide() {
			item.classList.remove(...showOpen);
			item.classList.remove(...wobbleAnimations);
		}, 600);
	});
}

// displaying the modal in case number of matches equals 8.
function winGame(numberOfMatches) {
	if(numberOfMatches === 8) {
		swal({
			title: "Congratulations! You Won!",
			text: `With ${moves} Moves and ${starsCounter} Stars in ${timer} seconds.`,
			confirmButtonText: "Play Again",
			confirmButtonColor: "#04c2b2",
			type: "success"
		}).then( (result) => {
			if(result.value) {
				resetGame();
			}
		});
	}
}

// Increasing the number of moves by 1.
// changing the stars according to the number of moves.
function movesCounter() {
	moves += 1;
	movesText.innerText = moves;

	if(moves === 7) {
		stars[2].className = "fa fa-star-o star";
		starsCounter = 2;
	}
	if(moves === 15) {
		stars[1].className = "fa fa-star-o star";
		starsCounter = 1;
	}
}

// Responding to the click listener on each card.
function respondToTheClick(evt) {
	if(evt.target.nodeName === 'LI') {
		showCards(evt.target);
		if(openCards.length === 2) {
			if(openCards[0].className.toString() === openCards[1].className.toString()) {
				matchCards(parentList);
				winGame(matches);
			} else {
				notMatchCards(parentList);
			}
			movesCounter();
			openCards = [];
			parentList = [];
		}
	}
}

// reseting the game by resetting all the variables to its default values and shuffling the cards again.
function resetGame() {
	let cardsElements = document.getElementsByClassName('card');
	let images = document.getElementsByClassName('image');
	moves = 0;
	openCards = [];
	movesText.innerText = moves;
	for(let i = 0; i < stars.length; i++) {
		stars[i].className = "fa fa-star star";
	}
	shuffledCards = shuffle(cards);

	for(let j = 0; j < cardsElements.length; j++) {
		cardsElements[j].className = 'card';
		images[j].className = `${shuffledCards[j]} image`;
	}
	parentList = [];
	matches = 0;
	starsCounter = 0;
	timer = -1;
}