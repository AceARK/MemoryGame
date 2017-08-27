// PseudoCode based on FlowChart on paper.

// 1. Create pairs of cards and shuffle them. Place on board face-down (overlay image). 
//    Set up players - Red and Blue. Set up stats with score 0. 
//    Highlight the Red player to start first. flipsRemaining = 2.

// 2. When Red flips a card, flipsRemaining = 1, show card (discard overlay). Note card data-id. 
//    Prompt player to pick another.
//    When flipsRemaining = 0, go to next step - checking match.

// 3. Compare data-id of both cards. 
//    If same, increment score of Red. Check if all cards matched (if yes, got to step 4). If not, Set flipsRemaining = 2. Prompt Red to play again.
//    If not same, toggle player to Blue. Set flipsRemaining = 2. Prompt Blue to play.
//    Follow step 2. 

// 4. If all cards matched, check player scores and declare winner. 
//    Show Restart or Exit button. If Restart, Go to step 1, else, Exit.
  
var arrayOfCardObjects = [
	{
		"matchId" : 1,
		"imgSrc" : "https://i.pinimg.com/originals/de/1b/0c/de1b0cc0ea3ae52e6bec6a77006c0fb3.jpg",
		"visible" : false
	},
	{
		"matchId" : 2,
		"imgSrc" : "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg",
		"visible" : false
	},
	{
		"matchId" : 3,
		"imgSrc" : "http://i.dailymail.co.uk/i/pix/2016/02/05/10/30E6DFAA00000578-0-image-a-74_1454669834974.jpg",
		"visible" : false
	},
	{
		"matchId" : 4,
		"imgSrc" : "https://static.pexels.com/photos/9264/bird-water-summer-sun.jpg",
		"visible" : false
	},
	{
		"matchId" : 5,
		"imgSrc" : "http://orig10.deviantart.net/9893/f/2014/309/4/6/cute_fox_cub_by_thrumyeye-d85cjz2.jpg",
		"visible" : false
	},
	{
		"matchId" : 6,
		"imgSrc" : "https://www.saczoo.org/wp-content/uploads/2017/03/Lion-Cubs-6Jan15-Credit-Erik-Bowker-31-760x456.jpg",
		"visible" : false
	},
	{
		"matchId" : 7,
		"imgSrc" : "http://www.zooborns.com/.a/6a010535647bf3970b0133f3202a82970b-pi",
		"visible" : false
	},
	{
		"matchId" : 8,
		"imgSrc" : "https://s-media-cache-ak0.pinimg.com/236x/fb/24/23/fb24234de5ac249f8fbdcfb40429c853--wolf-puppies-baby-wolves.jpg",
		"visible" : false
	}
];

var messagePrompt, playerNumber;

$(document).ready(function(event) {
	// modularized function containing initial game setup
	resetGame();
	// On flipping a card
	$("#cardArea").on("click", ".cardDiv", function() {
		console.log($(this));
		var cardIndex = $(this).children(".card").attr("data-cardIndex");
		var jqueryCardObj = $(this).children(".card");
		console.log(cardIndex);
		var chosenCardObject = currentShuffledDeck[cardIndex];
		console.log(chosenCardObject);
		// flip card and display it
		flipCard(chosenCardObject);
		console.log(chosenCardObject);
		displayCard(chosenCardObject, jqueryCardObj);
		console.log(chosenCardObject);
		// // handle event card flipped
		evaluateTurn(chosenCardObject, jqueryCardObj);

		$(".prompts").html(messagePrompt);
	});

	// On click of restart button at end of game
	$("#restart").on("click", function() {
		resetGame();
	});
});

function displayCardsToPlay() {
	currentShuffledDeck.forEach(function(item, i) {
		console.log("Next card");
		var cardDiv = $("<div class='cardDiv col-xs-3'>")
		var card = $("<img class='card'>");
		card.attr({"src": item.imgSrc, "data-cardIndex" : i});
		cardDiv.append(card);
		$("#cardArea").append(cardDiv);
		// Display card/ hide based on visible attribute in object
		displayCard(item, card);
	});
}

function setupGame(deckToBeFilled) {
	// shuffle cards
	deckToBeFilled = shuffleCards(cardDeck);
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
		arrayOfAllCards.push(item);
		arrayOfAllCards.push(item);
	});
	// end result - an array of card objects each repeated once
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
	cardObject.visible = !cardObject.visible;
}

function evaluateTurn(cardObj, jqueryObj) {
	console.log(flipsRemaining);
	// Logic for flipped card
	if(flipsRemaining > 0) {
		pairOfCardsFlippedInCurrentRound.push(cardObj);
		flippedCardjqueryObjectsPerRound.push(jqueryObj);
		messagePrompt = `${getPlayerColor(playerNumber)} - Flip second card.`;
		--flipsRemaining;
		console.log(flipsRemaining);
		// player's 2 turns have ended
		if(flipsRemaining === 0) {
			// disable any more card clicks
			$(".cardDiv").css('pointer-events', 'none');
			// Check card match
			if(checkMatch(pairOfCardsFlippedInCurrentRound[0], pairOfCardsFlippedInCurrentRound[1])) {
				// Make sure both cards stay open by setting both objects' flags to visible
				pairOfCardsFlippedInCurrentRound.forEach(function(item, i) {
					setVisible(item, true);
					displayCard(item, flippedCardjqueryObjectsPerRound[i]);
				});
				var score = incrementScore();
				if(playerNumber === 1) {
					$("#redStats").html(score);
				}else {
					$("#blueStats").html(score);
				}
				var visibleCount = 0;
				currentShuffledDeck.forEach(function(item){
					if(item.visible) {
						visibleCount++;
					}
				});
				console.log(visibleCount);
				if(visibleCount === 16){
					endGame();
				}else {
					// resuming card's clickabilities
					$(".cardDiv").css('pointer-events', 'auto');
					flipsRemaining = 2;
					pairOfCardsFlippedInCurrentRound = [];
					flippedCardjqueryObjectsPerRound = [];
					messagePrompt = `${getPlayerColor(playerNumber)} - Cards match, you get another round.`;
					$(".prompts").html(messagePrompt);
				}
			// if no match
			}else {
				// Ensuring the card is shown before hiding and moving on to next player
				setTimeout(hideCards, 600);
			}
		}
		return messagePrompt;
	}
}

// function to hide cards after mismatch and move to next player - created in order to incorporate a delay
function hideCards() {
	console.log("Else condition of checkMatch in Evaluate turns");
	pairOfCardsFlippedInCurrentRound.forEach(function(item, i) {
		console.log("flipping both open cards");
		flipCard(item);
		console.log(item);
		displayCard(item, flippedCardjqueryObjectsPerRound[i]);
		console.log(item);
	});
	// current player's round has ended
	togglePlayer();
}

// check if both cards match
function checkMatch(obj1, obj2) {
	if(obj1.matchId === obj2.matchId) {
		console.log("cards in checkMatch match.");
		return true;
	}else {
		console.log("cards in checkMatch do not match.");
		return false;
	}
}

// get color from playerNumber for displaying prompts
function getPlayerColor(playerNumber) {
	if(playerNumber === 1) {
		return "Red";
	}else {
		return "Blue";
	}
}

// get next player, and set the stage for their round
function togglePlayer() {
	if(playerNumber === 1) {
		playerNumber = 2;
	}else {
		playerNumber = 1;
	}
	flipsRemaining = 2;
	pairOfCardsFlippedInCurrentRound = [];
	flippedCardjqueryObjectsPerRound = [];
	// resuming card's clickabilities
	$(".cardDiv").css('pointer-events', 'auto');
	messagePrompt = `${getPlayerColor(playerNumber)}'s turn to play. Flip first card.`;
	$(".prompts").html(messagePrompt);
}

// hide or show a card based on visible flag in object
function displayCard(cardObj, jqueryObj) {
	if(!cardObj.visible) {
		jqueryObj.hide();
	}else {
		jqueryObj.show();
	}
}

// set card object visible property to boolean specified
function setVisible(cardObj, boolean) {
	cardObj.visible = boolean;
}

// increment score after each match
function incrementScore() {
	if(playerNumber === 1) {
		return ++scoreRed;
	}else {
		return ++scoreBlue;
	}
}

function endGame() {
	console.log("Entering end game function");
	// disable clicking any more cards when game has ended
	$(".cardDiv").css('pointer-events', 'none');
	messagePrompt = "Game over. All cards matched";
	if(scoreRed > scoreBlue) {
		winnerDeclaration = "Red player wins!";
	}else if(scoreBlue > scoreRed) {
		winnerDeclaration = "Blue player wins!!";
	}else if(scoreBlue = scoreRed) {
		winnerDeclaration = "Both players have equal matches!";
	}
	
	if(scoreBlue !== scoreRed) {
		$("#differenceInScore").html(Math.abs(scoreBlue - scoreRed));
		$("#winMessage").html(winnerDeclaration);
		$("#tieMessage").hide();
	}else {
		$("#winMessageAndPoints").hide();
		$("#tieMessage").html(winnerDeclaration).show();
	}
	$("#endDialogue").show();
}

// Restart game
function resetGame() {
	$("#cardArea").html("");
	flipsRemaining = 2;
	playerNumber = 1;
	scoreBlue = 0;
	scoreRed = 0;
	pairOfCardsFlippedInCurrentRound = [];
	flippedCardjqueryObjectsPerRound = [];
	currentShuffledDeck = [];
	arrayOfCardObjects.forEach(function(item) {
		setVisible(item, false);
	});
	cardDeck = [];
	cardDeck = prepareCardDeck(arrayOfCardObjects);
	$("#redStats").html(scoreRed);
	$("#blueStats").html(scoreBlue);
	$(".prompts").html("Welcome! Red player starts the game.");
	currentShuffledDeck = setupGame(currentShuffledDeck);
	$("#winMessage").html("");
	$("#endDialogue").hide();
	displayCardsToPlay();
}
