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