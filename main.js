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