'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};

let game = new Phaser.Game(config);

let { width, height } = game.config;