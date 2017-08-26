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
    