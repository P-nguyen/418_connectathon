function Player(inputName, inputCharacterType){
    this.name = inputName;
    this.characterType = inputCharacterType;
    this.powerupHeld = false;
}

var characters = {
    mario: {
        name: 'Mario',
        characterPowerup: 'Smash',//powerupPatternCheckInvertV,
        // characterSound1: blank,
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'images/coin.png',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'jump',//powerupPatternCheckInvertV,
        // characterSound1: blank,
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'images/coin.png',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    }
}

