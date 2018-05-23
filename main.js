$(document).ready(loadDocument);
function loadDocument(){
    addClickHandlers();
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
}

function powerupButtonClicked(){
}

function resetButtonClicked(){
}

//########################################## GLOBAL VARIABLES ###################################
var gameBoardArray = [  ['x','','','','',''],
                    ['','x','','','',''],
                    ['','','x','','',''],
                    ['','','','x','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','','']
]; //gameBoardArray template
var playerToken = 'x';
var winCount = 4;

tokenPlacementCheck(playerToken,2,2);

function tokenPlacementCheck( inputPlayerToken, inputStartCol, inputStartRow ) {
    //function that will check current dropped token's surrounding.
    //result:
    var testa = powerupPatternCheckInvertV( inputPlayerToken, inputStartCol, inputStartRow );
    var testb = winPatternCheck( inputPlayerToken, inputStartCol, inputStartRow  );
    console.log("powerup: ", testa);
    console.log("winPatternCheck: ", testb);
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


