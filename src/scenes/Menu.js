class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("ball", "./assets/golf-ball.png");
        this.load.image("grass", "./assets/background.png");
        this.load.image("rock", "./assets/rrrock.png");
        this.load.image("title", "./assets/title.png");
        this.load.image("gameOver", "./assets/game-over.png");
        this.load.audio("boink", "./assets/wii-tanks-bounce.wav");
        this.load.audio("intro", "./assets/Golf - Hole Intro - Wii Sports.mp3");
        this.load.audio("bowlingSong", "./assets/Wii Sports Music - Bowling Normal.mp3");
        this.load.audio("clap", "./assets/Golf clap.mp3");
        this.load.audio("swing", "./assets/golf club swing.mp3");
        this.load.audio("windup", "./assets/windup.wav");
        this.load.audio("results", "./assets/Wii Sports Bowling Results.mp3");
        this.load.spritesheet("rollSheet", "./assets/ball-spritesheet.png",{
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 400, "grass").setScale(1.8);
        this.ball = this.add.image(game.config.width + (this.textures.get("ball").getSourceImage().width * 3), game.config.height - 2 * (game.config.height / 5), "ball").setScale(3);
        this.title = this.add.image(game.config.width / 2, -this.textures.get("title").getSourceImage().width, "title").setScale(1);
        this.introSound = this.sound.add("intro").setVolume(.1);
        this.introSound.play();
        this.titleFall = this.tweens.add({
            targets: this.title,
            y: {
                from: -this.title.height,
                to: game.config.height / 2.5,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        })
        this.titleBall = this.tweens.add({
            targets: this.ball,
            x: {
                from: game.config.width + this.ball.width,
                to: game.config.width - (2 * game.config.width / 9),
            },
            rotation: {
                from: 3,
                to: 0,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        let startConfig = {
            fontFamily: "Courier",
            fontSize: 80,
            backgroundColor: "#0398FC",
            color: "#843605",
            align: "center",
            padding: {
                top: 2,
                bottom: 2,
            },
        };
        
        this.playButton = this.add.text(game.config.width / 4, game.config.height + 100, "start", startConfig);
        this.playIn = this.tweens.add({
            targets: this.playButton,
            y: {
                from: game.config.height + 100,
                to: game.config.height - (game.config.height / 4),
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        this.playButton.setInteractive();
        this.playButton.on("pointerover", () => {
            this.playButton.setBackgroundColor("#da5125");
            this.playButton.setColor("#ffff8e");
        });
        this.playButton.on("pointerout", () => {
            this.playButton.setBackgroundColor("#0398FC");
            this.playButton.setColor("#843605");
        });
        this.playButton.on("pointerdown", () => {
            this.timer = this.time.delayedCall(1000, () => {this.scene.start("playScene")});
            this.transitionOut();
        })
    }

    update() {

    }

    transitionOut() {
        this.titleOut = this.tweens.add({
            targets: this.title,
            y: {
                from: game.config.height / 2.5,
                to: -this.title.height,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        this.ballOut = this.tweens.add({
            targets: this.ball,
            x: {
                from: game.config.width - (2 * game.config.width / 9),
                to: game.config.width + this.ball.width * 3,
            },
            rotation: {
                from: 0,
                to: 3,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        this.playOut = this.tweens.add({
            targets: this.playButton,
            y: {
                from: game.config.height - (game.config.height / 4),
                to: game.config.height + 100,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        this.introFadeOut = this.tweens.add({
            targets: this.introSound,
            volume: {
                from: 0.1,
                to: 0,
            },
            ease: "Linear",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
    }
}