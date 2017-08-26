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
  
var arrayOfCardObjects = ["https://i.pinimg.com/originals/de/1b/0c/de1b0cc0ea3ae52e6bec6a77006c0fb3.jpg", "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg", "http://i.dailymail.co.uk/i/pix/2016/02/05/10/30E6DFAA00000578-0-image-a-74_1454669834974.jpg", "https://static.pexels.com/photos/9264/bird-water-summer-sun.jpg", "http://orig10.deviantart.net/9893/f/2014/309/4/6/cute_fox_cub_by_thrumyeye-d85cjz2.jpg", "https://www.saczoo.org/wp-content/uploads/2017/03/Lion-Cubs-6Jan15-Credit-Erik-Bowker-31-760x456.jpg", "http://www.zooborns.com/.a/6a010535647bf3970b0133f3202a82970b-pi", "https://s-media-cache-ak0.pinimg.com/236x/fb/24/23/fb24234de5ac249f8fbdcfb40429c853--wolf-puppies-baby-wolves.jpg"];
var turns = 2;
var scoreRed = 0;
var scoreBlue = 0;
var playerNumber;
var flippedCardsArray = [];

$(document).ready(function(event) {
	// Set up game
	setupGame();
	$("#cardArea").on("click", ".card", function() {
		// Show card
		var cardId = this.attr("data-id");
		flippedCardsArray.push(cardId);
	});
}

function setupGame() {
	shuffleCards();
	// set player to Red 
	playerNumber = 1;
	// Add CSS for player Red's token
}

function checkMatch() {

}

function togglePlayer() {

}

function cardFlipped() {

}

function shuffleCards() {

}