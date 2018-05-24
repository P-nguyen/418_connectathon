function Player(inputName, inputCharacterType){
    this.name = inputName;
    this.characterType = inputCharacterType;
    this.powerupHeld = false;
}

var characters = {
    mario: {
        name: 'Mario',
        characterPowerup: 'delCol',//powerupPatternCheckInvertV,
        characterSound1: new Audio('audio/mario.mp3'),
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'mario',
        characterIdleImage: 'images/marioIdle.gif',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1] || [0][1][0],[0][1][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'delRow',//powerupPatternCheckInvertV,
        characterSound1: new Audio('audio/luigi.mp3'),
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'luigi',
        characterIdleImage: 'images/marioIdle.gif',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    }
}

