//local variables
var a = [
    ['','','','x'],
    ['','','x',''],
    ['','x','',''],
    ['','','','']]

var playerToken = 'x';
//player info.
// function Player(inputName, inputToken) {
//
// }


function winPatternCheck( inputCoinPositionX, inputCoinPositionY ){
//takes in current coin position
// this will set direction clockwise = starting at 12:00 || X,Y
    var dir = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1]];

    //these are global
    var connect4Counter = 1;
    var winCount = 3;
    //these are global



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
            if (a[x][y] === 'x'){
                console.log(i, a[x][y]);
                connect4Counter++;
            }else if(fullDirScanCounter === 0){
                //reset x and y
                x = inputCoinPositionX;
                y = inputCoinPositionY;
                //reverse
                dir[i][0] *= -1;
                dir[i][1] *= -1;
                fullDirScanCounter++;
            }else{
                //increment fullDirScanCounter to 2 and kick us out of whileloop.
                fullDirScanCounter++;
                //reset counter since there is no match.
                connect4Counter = 1;
            }
        }

    }
}

//1 check top square.
//if x then move there. //add to counter.
//and check next square in the same direction.
//keep going until you it !'x'

//if not x set firstDirScan to true; go back to inputCoinPositionX and Y
//reverse direction and go that direction. until !'x' and set secondDirScan to true
//exit loop.

winPatternCheck(1,2);