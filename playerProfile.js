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
        // characterWinSound: blank,
        characterToken: 'mario',
        characterTokenImage: 'images/TokenPng/MarioToken.png',
        powerupClass: 'fireBallCol',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1] || [0][1][0],[0][1][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'delRow',//powerupPatternCheckL,
        characterSound1: new Audio('audio/luigi.mp3'),
        // characterWinSound: blank,
        characterToken: 'luigi',
        characterTokenImage: 'images/TokenPng/MarioToken.png',
        powerupClass: 'bulletBillRow',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    }
}

