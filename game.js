// PseudoCode based on FlowChart on paper.

// 1. Create pairs of cards and shuffle them. Place on board face-down (overlay image). 
//    Set up players - Red and Blue. Set up stats with score 0. 
//    Highlight the Red player to start first. Turns = 2.

// 2. When Red flips a card, turns = 1, show card (discard overlay). Note card data-id. 
//    Prompt player to pick another.
//    When turns = 0, go to next step - checking match.

// 3. Compare data-id of both cards. 
//    If same, increment score of Red. Check if all cards matched (if yes, got to step 4). If not, Set turns = 2. Prompt Red to play again.
//    If not same, toggle player to Blue. Set turns = 2. Prompt Blue to play.
//    Follow step 2. 

// 4. If all cards matched, check player scores and declare winner. 
//    Show Restart or Exit button. If Restart, Go to step 1, else, Exit.
  
var arrayOfCardObjects = [
	{
		"matchId" : "1",
		"imgSrc" : "https://i.pinimg.com/originals/de/1b/0c/de1b0cc0ea3ae52e6bec6a77006c0fb3.jpg",
		"flipped" : false
	},
	{
		"matchId" : "2",
		"imgSrc" : "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg",
		"flipped" : false
	},
	{
		"matchId" : "3",
		"imgSrc" : "http://i.dailymail.co.uk/i/pix/2016/02/05/10/30E6DFAA00000578-0-image-a-74_1454669834974.jpg",
		"flipped" : false
	},
	{
		"matchId" : "4",
		"imgSrc" : "https://static.pexels.com/photos/9264/bird-water-summer-sun.jpg",
		"flipped" : false
	},
	{
		"matchId" : "5",
		"imgSrc" : "http://orig10.deviantart.net/9893/f/2014/309/4/6/cute_fox_cub_by_thrumyeye-d85cjz2.jpg",
		"flipped" : false
	},
	{
		"matchId" : "6",
		"imgSrc" : "https://www.saczoo.org/wp-content/uploads/2017/03/Lion-Cubs-6Jan15-Credit-Erik-Bowker-31-760x456.jpg",
		"flipped" : false
	},
	{
		"matchId" : "7",
		"imgSrc" : "http://www.zooborns.com/.a/6a010535647bf3970b0133f3202a82970b-pi",
		"flipped" : false
	},
	{
		"matchId" : "8",
		"imgSrc" : "https://s-media-cache-ak0.pinimg.com/236x/fb/24/23/fb24234de5ac249f8fbdcfb40429c853--wolf-puppies-baby-wolves.jpg",
		"flipped" : false
	}
];
var turns = 2;
var scoreRed = 0;
var scoreBlue = 0;
var playerNumber;
var pairOfCardsFlippedInCurrentRound = [];
var flippedCardsId = [];
// set up card deck of 16 cards in the beginning
var cardDeck = prepareCardDeck(arrayOfCardObjects);
var currentShuffledDeck = [];
var messagePrompt = "Welcome! Red player starts the game.";

$(document).ready(function(event) {
	// Set up game
	currentShuffledDeck = setupGame(currentShuffledDeck);
	// Displaying cards on page
	currentShuffledDeck.forEach(function(item, i) {
		console.log("Next card");
		var cardDiv = $("<div class='col-xs-3'>")
		var card = $("<img class='card'>");
		card.attr({"src": item.imgSrc, "data-cardIndex" : i});
		cardDiv.append(card);
		$("#cardArea").append(cardDiv);
	});
	
	// On flipping a card
	$("#cardArea").on("click", ".card", function() {
		var cardIndex = this.attr("data-cardIndex");
		console.log(cardIndex);
		var chosenCardObject = currentShuffledDeck[cardIndex];
		console.log(chosenCardObject);
		// handle event card flipped
		cardFlipped(playerNumber, chosenCardObject);
		$(".prompts").html(messagePrompt);
	});
});

function setupGame(deckToBeFilled) {
	// shuffle cards
	deckToBeFilled = shuffleCards(cardDeck);
	console.log(deckToBeFilled);
	// set player to Red since Red starts the game
	playerNumber = 1;
	return deckToBeFilled;
	// Add CSS for player Red's token
}

// function to create pairs of each card object
function prepareCardDeck(inputArray) {
	var arrayOfAllCards = [];
	var arrayIndex = 0;
	inputArray.forEach(function(item) {
		// inserting each card object twice into array i.e. making pairs ready to shuffle
		for(var i=1; i<3; i++) {
			arrayOfAllCards.push(item);
		}
	});
	// end result - an array of card objects each repeated once
	console.log(arrayOfAllCards);
	return arrayOfAllCards;
}

// function to shuffle an array
function shuffleCards(inputArray) {
	for(var i=inputArray.length-1; i>0; i--) {
		var randomIndex = Math.floor(Math.random() * i);
		var currentItemAtRandomIndex = inputArray[randomIndex];
		inputArray[randomIndex] = inputArray[i];
		inputArray[i] = currentItemAtRandomIndex;
	}
	// return shuffled array
	return inputArray;
}

function flipCard(cardObject) {
	cardObject.flipped = !cardObject.flipped;
}

function cardFlipped(number, cardObject) {
	// Show card
	flipCard(cardObject);

	// Logic for flipped card
	if(turns != 0) {
		pairOfCardsFlippedInCurrentRound.push(cardObject);
		// flippedCardsId.push(cardId);
		turns--;
		messagePrompt = `${getPlayerColor(number)} - Flip second card.`;
		return messagePrompt;
	}else {
		if(checkMatch(pairOfCardsFlippedInCurrentRound[0], pairOfCardsFlippedInCurrentRound[1])) {
			turns = 2;
			messagePrompt = `${getPlayerColor(number)} - Cards match, you get another round.`
		}else {
			// Hide both cards again
			pairOfCardsFlippedInCurrentRound.forEach(function(item) {
				flipcard(item);
			});
			// current player's round has ended
			togglePlayer();
		}
	}
}


function checkMatch(obj1, obj2) {
	if(obj1.matchId === obj2[1].matchId) {
		return true;
	}else {
		return false;
	}
}

function getPlayerColor(playerNumber) {
	if(playerNumber === 1) {
		return "Red";
	}else {
		return "Blue";
	}
}

function togglePlayer() {
	if(playerNumber === 1) {
		playerNumber = 2;
	}else {
		playerNumber = 1;
	}
	turns = 2;
	pairOfCardsFlippedInCurrentRound = [];
	messagePrompt = `${getPlayerColor(playerNumber)}'s turn to play. Flip first card.`
}
