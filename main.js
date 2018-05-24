$(document).ready(loadDocument);

//########################################## GLOBAL VARIABLES ###################################
// Player Info
var player1 = new Player("peter", characters.mario);
var player2 = new Player("steffany", characters.luigi);

var currentPlayer = player1;
var currentPlayerStatus = true;
var screenClickable = true;


var winCount = 4;//for connect 4 or even higher

var gameBoardArray = [
    ['','','','','',''],
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
    $(".playerCharacterSelectionModal img").click(characterChoiceClicked);
}

function columnClicked(){

    if(!screenClickable){//if screenClicable = true then you can click.
        return;
    }

    var columnClicked = $(this).attr("column");

    columnClicked = parseInt(columnClicked);
    //drop token and update game board. //if pop up modal for sorry try again.
    var currentRowDroppedIn = dropTokenCol( currentPlayer, columnClicked);
    //check to see if powerup is allowed OR if player has won.
    tokenPlacementCheck( currentPlayer, columnClicked, currentRowDroppedIn );
}

function powerupButtonClicked(){
    //activates powerUp if currentplayer powerupheld is = true;
    if(currentPlayer.powerupHeld) {
        usePowerup(currentPlayer.characterType.characterPowerup);
        currentPlayer.powerupHeld = false;
    }
}

function resetButtonClicked(){
}

function characterChoiceClicked(){
    var characterClicked = $(this).attr("name");
    console.log(characterClicked);
}

// Player Turn Toggle
function togglePlayerTurn(){
    //current player has finish his/her turn and currentplayer switches before toggle is called.
    //if player one finish his turn. then toggle switches to player 2 and calls the modal and sets current player.
    debugger;
    if(currentPlayerStatus){
        currentPlayer = player1;
        $(".playerTurnModal .playerName").text(currentPlayer.name);
        $('#player1').addClass('highlightCurrentPlayer');
        $('#player2').removeClass('highlightCurrentPlayer');
    } else {
        currentPlayer = player2;
        $(".playerTurnModal .playerName").text(currentPlayer.name);
        $('#player2').addClass('highlightCurrentPlayer');
        $('#player1').removeClass('highlightCurrentPlayer');
    }
    $(".playerTurnModal").removeClass('hiddenElement');
    setTimeout(function(){
        $(".playerTurnModal").addClass('hiddenElement');
        screenClickable = true;
        }, 1000);
}

//########################################## TOKEN PLACEMENT ###################################

function tokenPlacementCheck( inputPlayer, inputStartCol, inputStartRow ) {
    //function that will check current dropped token's surrounding.
    //result:
    var playerToken = inputPlayer.characterType.name
    var powerUpResult = powerupPatternCheck( inputPlayer, inputStartCol, inputStartRow);
    if (powerUpResult) {
    currentPlayer.powerupHeld = true;
    //activate powerup button
    }

    var winResult = winPatternCheck( playerToken, inputStartCol, inputStartRow  );
    if(!winResult){
        screenClickable = false;
        currentPlayerStatus = !currentPlayerStatus;
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
                $(".gameWinModal .playerName").text(currentPlayer.name);
                $(".gameWinModal").removeClass('hiddenElement');
                return result;
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


function usePowerup(inputPowerUpName){
//using powerUp: delCol deletes a random entire column
//delRow deletes the entire bottom row
    switch (inputPowerUpName){

        case 'delCol' :
            var randomNum7;
            var columnsInGame = gameBoardArray.length;
            randomNum7 = Math.floor((Math.random())*(gameBoardArray.length));
            gameBoardArray[randomNum7].splice(0); //removes entire column contents
            for (var indexRow = 0; indexRow < 6;indexRow++){
                gameBoardArray[randomNum7].push(''); //put back empty ''
            }
            console.log('got rid of col: ' + randomNum7);
            break;
        case 'delRow' :
            for (var indexCol = 0; indexCol < 7;indexCol++){
                gameBoardArray[indexCol].splice(0,1);
                gameBoardArray[indexCol].push('');
            }
            break;

    }

}

function updateDOM(wipe){
    //updates DOM to reflect what is on the array
    //parameter wipe:'clean' to wipe clean entire array
    //no parameter then only update the DOM according to the array
    var oolLength = gameBoardArray.length;
    var rowLength = gameBoardArray[0].length;

    for (var colIndex = 0; colIndex < oolLength; colIndex++){

        for (var rowIndex = 0; rowIndex < rowLength; rowIndex++){
            //remove IMG class first
            //then add IMG class per gameArray
            var colRow = '[column='+ colIndex +'][row='+ rowIndex +']';
            $(colRow).removeClass('player1TokenShowing');
            $(colRow).removeClass('player2TokenShowing'); //removing both player's token
            if (wipe === 'clean'){
                gameBoardArray[colIndex][rowIndex] = '';
            } else {
                //make sure Luigi is player2!!!!!!!!!!!!!!!!!!!
                if (gameBoardArray[colIndex][rowIndex] === 'Luigi') {
                    $(colRow).addClass('player2TokenShowing');
                } else if (gameBoardArray[colIndex][rowIndex] === 'Mario') {
                    $(colRow).addClass('player1TokenShowing');
                }

            }
        }

    }

}

function resetGame(){
    //full reset of the game, reset their powerup, and wipe the board clean
    player1.powerupHeld = false;
    player2.powerupHeld = false;
    updateDOM('clean');

}

