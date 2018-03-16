/*
 * Create a list that holds all of your cards
 */
let cards = ['fa fa-diamond','fa fa-paper-plane-o',
			'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt',
			'fa fa-cube','fa fa-cube','fa fa-bolt','fa fa-leaf','fa fa-bicycle','fa fa-bomb',
			'fa fa-leaf','fa fa-bicycle','fa fa-bomb'];

const stars = document.getElementsByClassName('star');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let openCards = [];
let parentList = [];
let showOpen = ['show' , 'open'];
let moves = 0;
let starsCounter = 3;
const movesText  =  document.getElementById('moves');
let matches = 0;
let winningText = document.getElementById('moves_stars');

function respondToTheClick(evt) {
	if(evt.target.nodeName === 'LI') {
		parentList.push(evt.target);
		evt.target.classList.add(...showOpen);
		openCards.push(evt.target.querySelector('i'));
		if(openCards.length === 2) {
			if(openCards[0].className.toString() === openCards[1].className.toString()) {
				parentList[0].classList.add('match');
				parentList[1].classList.add('match');
				matches += 1;
				console.log("MATCHES: " + matches);
				console.log("STARS COUNTER: " + starsCounter);
				if(matches === 8) {
					$(".modal").modal('show');
					winningText.innerText = `With ${moves} Moves and ${starsCounter} Stars.`;
				}
			} else {
				parentList.forEach(function(item, index, arr) {
					setTimeout(function hide() {
						item.classList.remove(...showOpen);
				}, 1000);
				});
			}
			moves += 1;
			movesText.innerText = moves;
			openCards = [];
			parentList = [];
		}
	}
	if(moves === 7) {
		stars[2].className = "fa fa-star-o star";
		starsCounter = 2;
	}
	if(moves === 15) {
		stars[1].className = "fa fa-star-o star";
		starsCounter = 1;
	}
}


let shuffledCards = shuffle(cards);
let deck = document.querySelector('.deck');

for(let card of shuffledCards) {
	let cardHTML = `<li class="card">
                		<i class="${card} image"></i>
            		</li>`;
	deck.insertAdjacentHTML('beforeend',cardHTML);
}

deck.addEventListener('click' , respondToTheClick);


let cardsElements = document.getElementsByClassName('card');
let images = document.getElementsByClassName('image');

function reset() {
	moves = 0;
	movesText.innerText = 0;
	for(let i = 0; i < stars.length; i++) {
		stars[i].className = "fa fa-star star";
	}

	shuffledCards = shuffle(cards);

	for(let j = 0; j < cardsElements.length; j++) {
		cardsElements[j].className = 'card';
		images[j].className = `${shuffledCards[j]} image`;
	}
	parentList = [];
	openCards = [];
	moves = 0;
	matches = 0;
	starsCounter = 0;
}

let resetButton = document.getElementById("reset");
resetButton.addEventListener('click', reset);

let replayButton = document.getElementById("replay");
replayButton.addEventListener('click', reset);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
