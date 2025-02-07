'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [ Play ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        },
    },
};

let game = new Phaser.Game(config);

let { width, height } = game.config;