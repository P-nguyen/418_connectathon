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
        characterToken: 'images/coin.png'
    },
    luigi: {
        name: 'Luigi',
        characterPowerup: 'jump',//powerupPatternCheckInvertV,
        // characterSound1: blank,
        // characterSound1: blank,
        // characterWinSound: blank,
        characterToken: 'images/coin.png'
    }
}

