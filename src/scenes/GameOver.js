class GameOver extends Phaser.Scene {
    constructor () {
        super ("gameOverScene");
    }
    
    init(time) {
        this.TIME = time;
    }
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 400, "grass").setScale(1.8);
        this.music = this.sound.add("results").setVolume(0.0);
        this.music.loop = true;
        this.music.play();
        this.musicFadeIn = this.tweens.add({
            targets: this.music,
            volume: {
                from: 0,
                to: 0.3,
            },
            ease: "Linear",
            duration: 500,
            repeat: 0,
            yoyo: false,
        });
       
        this.timeText = this.add.text(game.config.width / 4 + 10, game.config.height - (game.config.height / 4) - 60, "Survived for " + this.TIME + " seconds!",{
            fontFamily: "Courier",
            fontStyle: "bold",
            fontSize: 40,
            color: "#843605",
            align: "center",
            padding: {
                top: 2,
                bottom: 2,
            },
        });
        this.timeIn = this.tweens.add({
            targets: this.timeText,
            alpha: {
                from: 0,
                to: 1,
            },
            ease: "Linear",
            duration: 100,
            repeat: 0,
            yoyo: false,
        })
        this.title = this.add.image(game.config.width / 2, -this.textures.get("gameOver").getSourceImage().height, "gameOver").setScale(0.8);
        this.titleSweep = this.tweens.add({
            targets: this.title,
            y: {
                from: -this.title.height,
                to: game.config.height / 2.5,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        let startConfig = {
            fontFamily: "Courier",
            fontSize: 80,
            fontStyle: "bold",
            backgroundColor: "#0398FC",
            color: "#843605",
            align: "center",
            padding: {
                top: 2,
                bottom: 2,
            },
        };
        this.playButton = this.add.text(game.config.width / 6 - 20, game.config.height + 100, "restart", startConfig);
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
        });

        this.menuButton = this.add.text(game.config.width - (game.config.width / 3) - 50, game.config.height + 100, "menu", startConfig);
        this.menuIn = this.tweens.add({
            targets: this.menuButton,
            y: {
                from: game.config.height + 100,
                to: game.config.height - (game.config.height / 4),
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        
        this.menuButton.setInteractive();
        this.menuButton.on("pointerover", () => {
            this.menuButton.setBackgroundColor("#da5125");
            this.menuButton.setColor("#ffff8e");
        });
        this.menuButton.on("pointerout", () => {
            this.menuButton.setBackgroundColor("#0398FC");
            this.menuButton.setColor("#843605");
        });
        this.menuButton.on("pointerdown", () => {
            this.timer = this.time.delayedCall(1000, () => {this.scene.start("menuScene")});
            this.transitionOut();
        });
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
        this.menuOut = this.tweens.add({
            targets: this.menuButton,
            y: {
                from: game.config.height - (game.config.height / 4),
                to: game.config.height + 100,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        this.timeOut = this.tweens.add({
            targets: this.timeText,
            alpha: {
                from: 1,
                to: 0,
            },
            ease: "Linear",
            duration: 100,
            repeat: 0,
            yoyo: false,
        });
        this.musicFadeOut = this.tweens.add({
            targets: this.music,
            volume: {
                from: 0.3,
                to: 0,
            },
            ease: "Linear",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
    }
}