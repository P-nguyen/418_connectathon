
// var boardArray = [  ['','','','','',''],
// //                     ['','','','','',''],
// //                     ['','','','','',''],
// //                     ['','','','','',''],
// //                     ['','','','','',''],
// //                     ['','','','','',''],
// //                     ['','','','','','']
// // ]; //boardArray template

var boardArray = [  ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','',''],
                    ['','','','','','']
]; //boardArray template

function validPosition(targetCol,targetRow){
// function name = validPosition
// parameters: targetCol, targetRow
// return: value at position of boardArray, or if outside then return null
if ( ((targetCol < 7) && (targetCol >= 0)) && (((targetCol >= 0)) && (targetRow < 6))){
    return boardArray[targetCol][targetRow];
} else {
        return null;
    }
}


function powerupPatternCheckInvertV(playerXorO,startCol,startRow){
//expected input parameters: playerXorO(the X or O in the array we are looking for), startCol(the Col position we are searching at), startRow(the Row position we are searching at)
//expected output parameters: true(if we found a powerup pattern), false(if we didn't find a powerup pattern)
//assuming we are working on boardArray[col][row]
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
if ( (validPosition(startCol+1,startRow+1) === playerXorO) && (validPosition(startCol+2,startRow) === playerXorO) ){
    //1st check
    foundPowerupPattern = true;
} else if ( (validPosition(startCol-1,startRow-1) === playerXorO) && (validPosition(startCol+1,startRow-1) === playerXorO) ){
    //2nd check
    foundPowerupPattern = true;
} else if ( (validPosition(startCol-1,startRow+1) === playerXorO) && (validPosition(startCol-2,startRow) === playerXorO) ){
    //3rd check
    foundPowerupPattern = true;
}

return foundPowerupPattern;
}

powerupPatternCheckInvertV('X',0,0);

//local variables
var array = [
    ['','x','','x'],
    ['x','x','x','x'],
    ['','x','',''],
    ['','','','']]

var playerToken = 'x';
//player info.
// function Player(inputName, inputToken) {
//
// }

var winCount = 3;

function winPatternCheck( inputPlayerToken, inputCoinPositionX, inputCoinPositionY ){
//takes in current coin positionX and Y

// this will set direction clockwise = starting at 12:00 || X,Y
    var dir = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1]];

    var connect4Counter = 1;

    for (var i = 0; i < dir.length; i++) { //go clockwise around position and check to see if there is a 'X'
        //check if array at x;y is equal.
        debugger;
        //this resets per loop
        var x = inputCoinPositionX;
        var y = inputCoinPositionY;
        var fullDirScanCounter = 0;

        while(fullDirScanCounter !== 2){
            if(connect4Counter === winCount){
                return console.log("YAY YOU WIN");
            }
            x += dir[i][0];
            y += dir[i][1];
            //james out of bound function. || return the item or null;
            if (array[x][y] === inputPlayerToken){
                console.log(i, array[x][y]);
                connect4Counter++;
            }else if(fullDirScanCounter === 0){
                //reset x and y
                x = inputCoinPositionX;
                y = inputCoinPositionY;
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
}

winPatternCheck( playerToken, 1, 3 );

