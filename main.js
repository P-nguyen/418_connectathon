$(document).ready(loadDocument);




//########################################## GLOBAL VARIABLES ###################################
// Player Info
var player1 = null;
var player2 = null;
var currentPlayer = player1;
var currentPlayerStatus = true; // true is player 1 and false is player 2
var screenClickable = false;





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
}

function addClickHandlers(){
    $(".column").click(columnClicked);
    $(".playerColumn img").click(powerupButtonClicked); // sets image as powerUp Button
    $(".resetGame").click(resetGame);
    $(".playerCharacterSelectionModal img").click(characterClicked);
    $(".gameStart").click(gameStart);
}

function gameStart() {
    $(".gameStart").addClass('hiddenElement'); 
    $(".playerCharacterSelectionModal").removeClass('hiddenElement');
    bgMusicPlay();
}


function columnClicked(){
    if(!screenClickable){//if screenClickable = true then you can click.
        return;
    }

    var columnClicked = $(this).attr("column");

    columnClicked = parseInt(columnClicked);
    //drop token and update game board. //if pop up modal for sorry try again.
    var currentRowDroppedIn = dropTokenCol( currentPlayer, columnClicked);
    if (currentRowDroppedIn === null){
        return;
    }
    //check to see if powerup is allowed OR if player has won.
    tokenPlacementCheck( currentPlayer, columnClicked, currentRowDroppedIn );
}

function powerupButtonClicked(){
    //activates powerUp if currentplayer powerupheld is = true;
    var test = $(this).hasClass(currentPlayer.characterType.characterToken);
    if(currentPlayer.powerupHeld && test) {
        usePowerup(currentPlayer.characterType.characterPowerup);
    
        currentPlayer.powerupHeld = false;
        if(currentPlayerStatus) {
            $('#player1 img').removeClass('animatePowerupButton');
        }else{
            $('#player2 img').removeClass('animatePowerupButton');
        }
        setTimeout(updateDOM,1300);
    }
}

function characterClicked() {
    if($(this).hasClass("character")) {
        var characterClicked = $(this).attr("name");
        if(currentPlayerStatus){
            player1 = new Player(characterClicked, characters[characterClicked]);
            player1.characterType.characterSound1.play();
            $('.p1Notes').text(player1.name + ', you have a special powerup! Connect your tokens to recieve a special advantage.');
            $(".p1PowerImage").append(`<img src= "${player1.characterType.powerupImage}" class= "p1Notes"/>`);
            $(this).addClass("selectedCharacterHighlight");
            $("#player1 img").addClass(characterClicked);
            $(this).off('click');//debug fixed multiple clicks on the same player
            $(".playerCharacterSelectionModal h1").text('Player 2, Choose your character!');
        }
        else {   
            player2 = new Player(characterClicked, characters[characterClicked]);
            player2.characterType.characterSound1.play();
            $('.p2Notes').text(player2.name + ', you have a special powerup! Connect your tokens to recieve a special advantage.');
            $(".p2PowerImage").append(`<img src= "${player2.characterType.powerupImage}" class= "p2Notes"/>`);
            $(this).addClass("selectedCharacterHighlight");
            $("#player2 img").addClass(characterClicked);
            $(this).off('click');//debug fixed multiple clicks on the same player
            $(".playerCharacterSelectionModal h1").text('Let\'s Play!');
            setTimeout(function(){
                $(".playerCharacterSelectionModal").addClass('hiddenElement');
                togglePlayerTurn();
                }, 3000);
            $(".playerCharacterSelectionModal img").off('click');
        }
        currentPlayerStatus = !currentPlayerStatus;    
    } 
}
// Player Turn Toggle
function togglePlayerTurn(){
    //current player has finish his/her turn and currentplayer switches before toggle is called.
    //if player one finish his turn. then toggle switches to player 2 and calls the modal and sets current player.
    cancelHurryUp();
    if(currentPlayerStatus){
        currentPlayer = player1;
        hurryUp();
        $(".playerTurnModal .playerName").text(currentPlayer.name);
        $('#player1').addClass('highlightCurrentPlayer');
        $('#player2').removeClass('highlightCurrentPlayer');
    } else {
          currentPlayer = player2;
          hurryUp();
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
    var playerToken = inputPlayer.characterType.name;
    var powerUpResult = powerupPatternCheck( inputPlayer, inputStartCol, inputStartRow);
    if (powerUpResult) {
        currentPlayer.powerupHeld = true;
        powerUp.play();
        if(currentPlayerStatus) {
            $('#player1 img').addClass('animatePowerupButton');
        }else{
            $('#player2 img').addClass('animatePowerupButton');
        }
    }

    var winResult = winPatternCheck( playerToken, inputStartCol, inputStartRow  );
    if (winResult==='tie'){
        $(".tieGame").removeClass('hiddenElement');
    } else if(!winResult){
        currentPlayerStatus = !currentPlayerStatus;
        screenClickable = false;
        setTimeout(togglePlayerTurn, 1300);


    }
}

function validPosition(targetCol,targetRow){
    // parameters: targetCol, targetRow
    // return: value at position of gameBoardArray, or if outside then return null

    if ( ((targetCol < 7) && (targetCol >= 0)) && (((targetRow >= 0)) && (targetRow < 6))){
        return gameBoardArray[targetCol][targetRow];
    } else {
            return null;
        }
}

function powerupPatternGlow( inputColRowArray ){
    //takes in an nested array with col and row positions.
    //returns: nothing.
    var tokenPos;

    for (var i = 0; i<3; i++) {
        tokenPos = '[column='+inputColRowArray[i][0]+'][row='+inputColRowArray[i][1]+']';
        $(tokenPos).addClass('animatePowerupButton');
        setTimeout(removePatternGlow, 1300, tokenPos);
        //1300 timeout is due to togglePlayer timeout.
    }
}

function removePatternGlow(inputTokenPos){
    $(inputTokenPos).removeClass('animatePowerupButton');
}


function powerupPatternCheck( inputPlayerToken, inputStartCol,inputStartRow ){
    //input parameters: inputPlayerToken(the X or O in the array we are looking for), inputStartCol(the Col position we are searching at), inputStartRow(the Row position we are searching at)
    //output parameters: true(if we found a powerup pattern), false(if we didn't find a powerup pattern)

    var patt = inputPlayerToken.characterType.powerupPattern;
    var playerToken = inputPlayerToken.characterType.name;
    var tokenPosArray = [[inputStartCol, inputStartRow],[],[]]

    var foundPowerupPattern = false;
    if ( (validPosition(inputStartCol + patt[0][0][0],inputStartRow + patt[0][0][1]) === playerToken) && (validPosition(inputStartCol + patt[0][1][0],inputStartRow + patt[0][1][1]) === playerToken) ){
        //1st check
        foundPowerupPattern = true;
        tokenPosArray[1].push(inputStartCol + patt[0][0][0],inputStartRow + patt[0][0][1]);
        tokenPosArray[2].push(inputStartCol + patt[0][1][0],inputStartRow + patt[0][1][1]);
    } else if ( (validPosition(inputStartCol + patt[1][0][0],inputStartRow + patt[1][0][1]) === playerToken) && (validPosition(inputStartCol + patt[1][1][0],inputStartRow + patt[1][1][1]) === playerToken) ){
        //2nd check
        foundPowerupPattern = true;
        tokenPosArray[1].push(inputStartCol + patt[1][0][0],inputStartRow + patt[1][0][1]);
        tokenPosArray[2].push(inputStartCol + patt[1][1][0],inputStartRow + patt[1][1][1]);
    } else if ( (validPosition(inputStartCol + patt[2][0][0],inputStartRow + patt[2][0][1]) === playerToken) && (validPosition(inputStartCol + patt[2][1][0],inputStartRow + patt[2][1][1]) === playerToken) ){
        //3rd check
        foundPowerupPattern = true;
        tokenPosArray[1].push(inputStartCol + patt[2][0][0],inputStartRow + patt[2][0][1]);
        tokenPosArray[2].push(inputStartCol + patt[2][1][0],inputStartRow + patt[2][1][1]);
    }

    if ( validPosition(inputStartCol,inputStartRow) != playerToken ){
        foundPowerupPattern = false;
        //error checking to see if the selected position is the same as playerToken
        //shouldn't need this since we should always pass in perfect input
    }
    if (foundPowerupPattern){
        powerupPatternGlow(tokenPosArray);
    }
    return foundPowerupPattern;
}

function winPatternCheck( inputPlayerToken, inputStartCol, inputStartRow ){
    //takes: in inputplayer token, current token positionX and Y
    //outputs: returns true, false, and 'tie'. if current player wins or not. 'tie' when output is false && no more spaces on board

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
    //check for tie game condition
    var openSpacesBoard = 0;
    for (var index in gameBoardArray){
        if (gameBoardArray[index][5] === ""){
            openSpacesBoard++;
        }
    }
    if ((result === false) && (openSpacesBoard === 0)){
        //no open spaces left on the top row
        return 'tie';
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
        // if ( lastIteminCol === gameBoardArray[inputColLocation].length -1){
        //     //this is the last open space in the column so trigger something
        // }
        showTokenOnDOM( inputColLocation, lastIteminCol );
        return lastIteminCol;
    }else {
        return null
    }

}

function showTokenOnDOM( inputColLocation, inputRowLocation){
    coinDrop.play();
    var col = '[column='+inputColLocation+'][row='+inputRowLocation+']';
    $(col).addClass(currentPlayer.characterType.characterToken);
    dropCoin(inputColLocation,inputRowLocation); //give it dropCoin animation
}


function usePowerup(inputPowerUpName){
//using powerUp: delCol deletes a random entire column
//delRow deletes the entire bottom row
    switch (inputPowerUpName){

        case 'delCol' :
            var randomNum7;
            var columnsInGame = gameBoardArray.length;
            randomNum7 = Math.floor((Math.random())*(columnsInGame));
            gameBoardArray[randomNum7].splice(0); //removes entire column contents
            for (var indexRow = 0; indexRow < 6;indexRow++){
                gameBoardArray[randomNum7].push(''); //put back empty ''
            }
            fireballSound.play();
            var elementCall = '.tokenDropArea[column='+randomNum7+']';
            $(elementCall).addClass('fireBallCol');
            setTimeout(function(){$(elementCall).removeClass('fireBallCol')},1500);
            break;
        case 'delRow' :
            for (var indexCol = 0; indexCol < 7;indexCol++){
                gameBoardArray[indexCol].splice(0,1);
                gameBoardArray[indexCol].push('');
            }
            fireballSound.play();
            $('.rowHiddenBulletBill').addClass('bulletBillRow');
            setTimeout(function(){$('.rowHiddenBulletBill').removeClass('bulletBillRow')},1500);
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
            $(colRow).removeClass(player1.characterType.characterToken);
            $(colRow).removeClass(player2.characterType.characterToken); //removing both player's token
            if (wipe === 'clean'){
                gameBoardArray[colIndex][rowIndex] = '';
            } else {
                if (gameBoardArray[colIndex][rowIndex] === player1.characterType.name) {
                    $(colRow).addClass(player1.characterType.characterToken);
                } else if (gameBoardArray[colIndex][rowIndex] === player2.characterType.name) {
                    $(colRow).addClass(player2.characterType.characterToken);
                }

            }
        }

    }

}

function resetGame(){
    //full reset of the game, reset their powerup, and wipe the board clean
    player1.powerupHeld = false;
    $('#player1 img').removeClass('animatePowerupButton');
    player2.powerupHeld = false;
    $('#player2 img').removeClass('animatePowerupButton');
    resetSound.play();
    cancelHurryUp();
    bgMusic.pause();
    $(".gameWinModal").addClass('hiddenElement');
    $(".tieGame").addClass('hiddenElement');
    lotsOfFire(); //firedrop animation
    updateDOM('clean');
    
    setTimeout(function(){
        $('.playerCharacterSelectionModal').removeClass('hiddenElement');
        setTimeout(function(){
            $(".playerCharacterSelectionModal").addClass('hiddenElement');
            togglePlayerTurn();
            }, 2000);
        }, 2000);

    
    
}
// Sounds
var bgMusic = new Audio('audio/MarioBros.mp3');   
var coinDrop = new Audio('audio/coin.wav'); 
var powerUp = new Audio('audio/powerUp.mp3'); 
var starMusic = new Audio('audio/star.mp3');
var resetSound = new Audio('audio/reset.mp3');
var fireballSound = new Audio('audio/fireball.mp3');
var playStarMusic = null;

function bgMusicPlay(){
    bgMusic.play();
    bgMusic.loop=true;
}
function bgMusicPause(){
  bgMusic.pause();
}
function hurryUp() {
    playStarMusic = setTimeout(function(){ 
        starMusic.play();
        starMusic.loop=true;
        bgMusic.pause();
     }, 7000);
}
function cancelHurryUp() {
    starMusic.pause();
    bgMusic.play();
    starMusic.currentTime = 0;
    clearTimeout(playStarMusic);
}
// Needs an if statement to control when sound starts (not when modals are open)
// function windowMusicPause(){
//     $(window).focus(bgMusicPlay);
//     $(window).focus(hurryUp);
//     $(window).blur(cancelHurryUp);
//     $(window).blur(bgMusicPause);
// }


function dropCoin(col,row){
    var colRowPosition= '[column='+col+'][row='+row+']';
    $(colRowPosition).addClass('dropIt');
    setTimeout(function(){($(colRowPosition).removeClass('dropIt'))},1000);
}

function lotsOfFire(){
    fireballSound.play();
    for (var column = 0; column < gameBoardArray.length; column++){
        var elementCall = '.tokenDropArea[column='+column+']';
        $(elementCall).addClass('fireBallCol');
        delayRemoveFire(elementCall);
    }
}

function delayRemoveFire(column){
    //have to do a separate function outside of the loop to avoid timing issue calling function
    setTimeout(function(){$(column).removeClass('fireBallCol')},1000);
}

// gameBoardArray = [
//     ['Mario','Mario','Mario','Luigi','Luigi','Luigi'],
//     ['Luigi','Luigi','Luigi','Mario','Mario','Mario'],
//     ['Mario','Mario','Mario','Luigi','Luigi','Luigi'],
//     ['Luigi','Luigi','Luigi','Mario','Mario',''],
//     ['Mario','Mario','Mario','Luigi','Luigi','Luigi'],
//     ['Luigi','Luigi','Luigi','Mario','Mario','Mario'],
//     ['Mario','Mario','Mario','Luigi','Luigi','Luigi']
// ];
//console.table(gameBoardArray)
//gameBoardArray testing for tie condition