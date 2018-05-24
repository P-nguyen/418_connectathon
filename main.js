$(document).ready(loadDocument);

//########################################## GLOBAL VARIABLES ###################################
// Player Info
var player1 = new Player("peter", characters.mario);
var player2 = new Player("steffany", characters.luigi);

var currentPlayer = player1;
var currentPlayerStatus = true;

var playerToken = 'x'; // to be deleted
var winCount = 4;

var gameBoardArray = [  ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','','']
]; //gameBoardArray template


function loadDocument(){
    addClickHandlers();
    togglePlayerTurn();
}

function addClickHandlers(){
    $(".column").click(columnClicked);
    $(".powerupButton").click(powerupButtonClicked);
    $(".resetButton").click(resetButtonClicked);
}

function columnClicked(){
    
    var columnClicked = null;
    columnClicked = $(this).attr("column");
    console.log(columnClicked);
    columnClicked = parseInt(columnClicked);
    //drop token and update game board. //if pop up modal for sorry try again.
    var currentRowDroppedIn = dropTokenCol( currentPlayer, columnClicked);
    //check to see if powerup is allowed OR if player has won.
    tokenPlacementCheck( currentPlayer, columnClicked, currentRowDroppedIn );
}

function powerupButtonClicked(){
}

function resetButtonClicked(){
}

function characterChoiceClicked(){
}


// Player Turn Toggle
function togglePlayerTurn(){
    
    if(currentPlayerStatus){
        $(".playerName").text(player1.name);
        $('#player1').addClass('highlightCurrentPlayer');
        $('#player2').removeClass('highlightCurrentPlayer');
        currentPlayer = player1;
    } else {
        $(".playerName").text(player2.name);
        $('#player2').addClass('highlightCurrentPlayer');
        $('#player1').removeClass('highlightCurrentPlayer');
        currentPlayer = player2;
    }
    $(".playerTurnModal").removeClass('hiddenElement');
    setTimeout(function(){
        $(".playerTurnModal").addClass('hiddenElement')
        }, 2000);

    currentPlayerStatus = !currentPlayerStatus;
}

//########################################## TOKEN PLACEMENT ###################################

function tokenPlacementCheck( inputPlayer, inputStartCol, inputStartRow ) {
    //function that will check current dropped token's surrounding.
    //result:
    var playerToken = inputPlayer.characterType.name
    var powerUpResult = powerupPatternCheck( inputPlayer, inputStartCol, inputStartRow);
    if (powerUpResult) {
    currentPlayer.powerupHeld = true;
    }

    var winResult = winPatternCheck( playerToken, inputStartCol, inputStartRow  );
    if(!winResult){
        togglePlayerTurn();
    }
}

function validPosition(targetCol,targetRow){
// parameters: targetCol, targetRow
// return: value at position of gameBoardArray, or if outside then return null

if ( ((targetCol < 7) && (targetCol >= 0)) && (((targetCol >= 0)) && (targetRow < 6))){
    return gameBoardArray[targetCol][targetRow];
} else {
        return null;
    }
}

function powerupPatternCheck( inputPlayerToken, inputStartCol,inputStartRow ){
    //input parameters: inputPlayerToken(the X or O in the array we are looking for), inputStartCol(the Col position we are searching at), inputStartRow(the Row position we are searching at)
    //output parameters: true(if we found a powerup pattern), false(if we didn't find a powerup pattern)

    //assuming we are working on gameBoardArray[col][row]
    //would be nice to light on the board where the powerup match happened
    //     invert-v pattern - 1st check
    //     col +1, row +1
    //     col +2, row +0
    //
    //     invert-v pattern - 2nd check
    //     col -1, row -1
    //     col +1, row -1
    //
    //     invert-v pattern - 3rd check
    //     col +1, row +1
    //     col +2, row +0
    var patt = inputPlayerToken.characterType.powerupPattern;
    var playerToken = inputPlayerToken.characterType.name;

    var foundPowerupPattern = false;
    if ( (validPosition(inputStartCol + patt[0][0][0],inputStartRow + patt[0][0][1]) === playerToken) && (validPosition(inputStartCol + patt[0][1][0],inputStartRow + patt[0][1][1]) === playerToken) ){
        //1st check
        foundPowerupPattern = true;
    } else if ( (validPosition(inputStartCol + patt[1][0][0],inputStartRow + patt[1][0][1]) === playerToken) && (validPosition(inputStartCol + patt[1][1][0],inputStartRow + patt[1][1][1]) === playerToken) ){
        //2nd check
        foundPowerupPattern = true;
    } else if ( (validPosition(inputStartCol + patt[2][0][0],inputStartRow + patt[2][0][1]) === playerToken) && (validPosition(inputStartCol + patt[2][0][0],inputStartRow + patt[2][0][1]) === playerToken) ){
        //3rd check
        foundPowerupPattern = true;
    }
    if ( validPosition(inputStartCol,inputStartRow) != playerToken ){
        foundPowerupPattern = false;
        //error checking to see if the selected position is the same as playerToken
        //shouldn't need this since we should always pass in perfect input
    }

    return foundPowerupPattern;
}

function winPatternCheck( inputPlayerToken, inputStartCol, inputStartRow ){
    //takes: in inputplayer token, current token positionX and Y
    //outputs: returns true and and false. if current player wins or not.

    // this will set direction clockwise = starting at 12:00 || X,Y
    var result = false;
    var dir = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1]];
    debugger;
    for (var i = 0; i < dir.length; i++) { //go clockwise around position and check to see if there is a 'X'
        //check if array at x;y is equal.
        //this resets per loop
        var x = inputStartCol;
        var y = inputStartRow;
        var fullDirScanCounter = 0;
        var connect4Counter = 1;

        while(fullDirScanCounter !== 2){
            if(connect4Counter === winCount){
                result = true;
                return console.log("YAY YOU WIN");
            }
            x += dir[i][0];
            y += dir[i][1];
            var arrayTarget = validPosition(x,y);
            if (arrayTarget === inputPlayerToken){
                connect4Counter++;
            }else if(fullDirScanCounter === 0){ // if arrayTarget is undefined then reverse
                //reset x and y
                x = inputStartCol;
                y = inputStartRow;
                //reverse direction of travel
                dir[i][0] *= -1;
                dir[i][1] *= -1;
                fullDirScanCounter++;
            }else{
                //increment fullDirScanCounter to 2 and kick us out of while loop.
                fullDirScanCounter++;
                //reset counter since there is no match.
                connect4Counter = 1;
            }
        }
    }
    return result;
 }

function dropTokenCol(inputPlayer, inputColLocation){
    //dropping from player to location col
    //return: null is full, row position where I placed token again
    //doesn't need to check for out of bounds since the input is from the DOM, should always be valid
    //need to show that the column is full
    var playerToken = inputPlayer.characterType.name;
    var lastIteminCol = gameBoardArray[inputColLocation].indexOf('');
    if (lastIteminCol > -1){
        gameBoardArray[inputColLocation][lastIteminCol] = playerToken;

        if ( lastIteminCol === gameBoardArray[inputColLocation].length -1){
            //this is the last open space in the column so trigger something
        }

        showTokenOnDOM( playerToken, inputColLocation, lastIteminCol );
        return lastIteminCol;
    }else {
        return null
    }

}

function showTokenOnDOM(inputPlayerTokenImg, inputColLocation, inputRowLocation){
    var col = '[column='+inputColLocation+'][row='+inputRowLocation+']';

    if(currentPlayerStatus){ //if currentPlayerStatus = true then player 1
        $(col).addClass('player1TokenShowing');
    } else {
        $(col).addClass('player2TokenShowing');
    }

}

//tokenPlacementCheck(playerToken,2,2);

