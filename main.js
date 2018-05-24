$(document).ready(loadDocument);
function loadDocument(){
    addClickHandlers();
    togglePlayerTurn();
}
var currentPlayer = true;

function addClickHandlers(){
    $(".column").click(columnClicked);
    $(".powerupButton").click(powerupButtonClicked);
    $(".resetButton").click(resetButtonClicked);
}

function columnClicked(){
    var columnClicked = null;
        columnClicked = $(this).attr("column");
        console.log(columnClicked);
}

function powerupButtonClicked(){
}

function resetButtonClicked(){
}

function characterChoiceClicked(){
}

// Player Info
var characters = {
    mario: {
        name: 'Mario',
        characterPowerup: powerupPatternCheckInvertV,
        // characterSound1: blank, 
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'images/coin.png',
        characterIdleImage: 'images/marioIdle.gif' 
    },
}

function Player(inputName, inputCharacterType){
    this.name = inputName;
    this.characterType = inputCharacterType;
}
var player1 = new Player("peter", characters.mario);
var player2 = new Player("steffany", characters.mario);

// Player Turn Toggle
function togglePlayerTurn(){
    if(currentPlayer){
        $(".playerName").text(player1.name);
        $('#player1').addClass('highlightCurrentPlayer');
        $('#player2').removeClass('highlightCurrentPlayer');
    } else {
        $(".playerName").text(player2.name);
        $('#player2').addClass('highlightCurrentPlayer');
        $('#player1').removeClass('highlightCurrentPlayer');
    }
    $(".playerTurnModal").removeClass('hiddenElement');
    setTimeout(function(){
        $(".playerTurnModal").addClass('hiddenElement')
        }, 1000);

    currentPlayer = !currentPlayer;
}

//########################################## GLOBAL VARIABLES ###################################
var gameBoardArray = [  ['x','','','','',''],
                        ['','x','','','',''],
                        ['','','x','','',''],
                        ['','x','','','',''],
                        ['','','','','',''],
                        ['','','','','',''],
                        ['','','','','','']
]; //gameBoardArray template

var playerToken = 'x';
var winCount = 4;

function tokenPlacementCheck( inputPlayerToken, inputStartCol, inputStartRow ) {
    //function that will check current dropped token's surrounding.
    //result:
    var testa = powerupPatternCheckInvertV( inputPlayerToken, inputStartCol, inputStartRow );
    var testb = winPatternCheck( inputPlayerToken, inputStartCol, inputStartRow  );
    console.log("powerup: ", testa);
    console.log("winPatternCheck: ", testb);
    if(!testb){
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

function powerupPatternCheckInvertV( inputPlayerToken,inputStartCol,inputStartRow ){
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
    var foundPowerupPattern = false;
    if ( (validPosition(inputStartCol+1,inputStartRow+1) === inputPlayerToken) && (validPosition(inputStartCol+2,inputStartRow) === inputPlayerToken) ){
        //1st check
        foundPowerupPattern = true;
    } else if ( (validPosition(inputStartCol-1,inputStartRow-1) === inputPlayerToken) && (validPosition(inputStartCol+1,inputStartRow-1) === inputPlayerToken) ){
        //2nd check
        foundPowerupPattern = true;
    } else if ( (validPosition(inputStartCol-1,inputStartRow+1) === inputPlayerToken) && (validPosition(inputStartCol-2,inputStartRow) === inputPlayerToken) ){
        //3rd check
        foundPowerupPattern = true;
    }

    return foundPowerupPattern;
}

function winPatternCheck( inputPlayerToken, inputStartCol, inputStartRow ){
    //takes: in inputplayer token, current token positionX and Y
    //outputs: returns true and and false. if current player wins or not.

    // this will set direction clockwise = starting at 12:00 || X,Y
    var dir = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1]];

    var connect4Counter = 1;
    var result = false;

    for (var i = 0; i < dir.length; i++) { //go clockwise around position and check to see if there is a 'X'
        //check if array at x;y is equal.
        //this resets per loop
        var x = inputStartCol;
        var y = inputStartRow;
        var fullDirScanCounter = 0;

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

function dropTokenCol(inputPlayerToken, inputColLocation){
    //dropping from player to location col
    //return: null is full, row position where I placed token again
    //doesn't need to check for out of bounds since the input is from the DOM, should always be valid
    //need to show that the column is full
    var lastIteminCol = gameBoardArray[inputColLocation].indexOf('');
    if (lastIteminCol > -1){
        gameBoardArray[inputColLocation][lastIteminCol] = inputPlayerToken;

        if ( lastIteminCol === gameBoardArray[inputColLocation].length -1){
            //this is the last open space in the column so trigger something
            }

        return lastIteminCol;
    }else {
        return null
    }
}


//tokenPlacementCheck(playerToken,2,2);