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
        characterToken: 'mario',
        characterTokenImage: 'images/TokenPng/MarioToken.png',
        powerupClass: 'fireBallCol',
        powerupImage: 'images/marioPowerLayout.png',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1] || [0][1][0],[0][1][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'delRow',//powerupPatternCheckL,
        characterSound1: new Audio('audio/luigi.mp3'),
        characterToken: 'luigi',
        characterTokenImage: 'images/TokenPng/LuigiToken.png',
        powerupClass: 'bulletBillRow',
        powerupImage: 'images/luigiPowerLayout.png',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    },
    wario: {
        name: 'Wario',
        characterPowerup: 'delCol',//powerupPatternCheckInvertV,
        characterSound1: new Audio('audio/wario.wav'),
        characterToken: 'wario',
        characterTokenImage: 'images/TokenPng/WarioToken.png',
        powerupClass: 'fireBallCol',
        powerupImage: 'images/warioPowerLayout.png',
        powerupPattern: [[[1,1],[2,0]],//[0][0][0],[0][0][1] || [0][1][0],[0][1][1]
                        [[-1,-1],[1,-1]],
                        [[-1,1],[-2,0]]] //v pattern
    },
    bowser: {
        name: 'Bowser',
        characterPowerup: 'delRow',//powerupPatternCheckL,
        characterSound1: new Audio('audio/bowser.wav'),
        characterToken: 'bowser',
        characterTokenImage: 'images/TokenPng/BowserToken.png',
        powerupClass: 'bulletBillRow',
        powerupImage: 'images/bowserPowerLayout.png',
        powerupPattern: [[[0,1],[1,0]],
                        [[0,-1],[1,-1]],
                        [[-1,1],[-1,0]]] //L pattern
    },
}

