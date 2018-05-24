function Player(inputName, inputCharacterType){
    this.name = inputName;
    this.characterType = inputCharacterType;
    this.powerupHeld = false;
}

var characters = {
    mario: {
        name: 'Mario',
        characterPowerup: 'delCol',//powerupPatternCheckInvertV,
        // characterSound1: blank,
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'mario',
        characterIdleImage: 'images/marioIdle.gif',
        powerupClass: 'fireBallCol',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1] || [0][1][0],[0][1][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'delRow',//powerupPatternCheckInvertV,
        // characterSound1: blank,
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'luigi',
        characterIdleImage: 'images/marioIdle.gif',
        powerupClass: 'fireBallRow',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    }
}

