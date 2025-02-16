class Credits extends Phaser.Scene {
    constructor (){
        super("creditsScene");
    }
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 400, "grass").setScale(1.8);
        this.music = this.sound.add("credits").setVolume(0);
        this.music.play();
        this.musicFadeIn = this.tweens.add({
            targets: this.music,
            volume: {
                from: 0,
                to: 0.1,
            },
            ease: "Linear",
            duration: 500,
            repeat: 0,
            yoyo: false,
        });
        this.creditsText = this.add.text(game.config.width / 10 - 40, -game.config.height, 
            "Windup sound and all music are from Nintendo's Wii Sports\n\"Golf Club Swing Sound\" from \"iFalution jan\" on Youtube\nGolf Club Swing Sound from \"Sound laboratory\" on Youtube\nGolf Clap Sound from \"FallenSounds\" on Youtube\nAll assets are drawn using Pixilart",
            {
            fontFamily: "Courier",
            fontStyle: "bold",
            backgroundColor: "#0398FC",
            fontSize: 30,
            color: "#843605",
            align: "center",
            padding: {
                top: 2,
                bottom: 2,
            },
        });
        this.textIn = this.tweens.add({
            targets: this.creditsText,
            y: {
                from: -game.config.height,
                to: game.config.height / 3,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        });
        let menuConfig = {
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
        this.menuButton = this.add.text(game.config.width / 3 + 100, game.config.height + 100, "menu", menuConfig);
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

    transitionOut(){
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
        this.musicFadeOut = this.tweens.add({
            targets: this.music,
            volume: {
                from: 0.1,
                to: 0,
            },
            ease: "Linear",
            duration: 500,
            repeat: 0,
            yoyo: false,
        });
        this.textOut = this.tweens.add({
            targets: this.creditsText,
            y: {
                from: game.config.height / 3,
                to: -game.config.height,
            },
            ease: "Cubic",
            duration: 1000,
            repeat: 0,
            yoyo: false,
        })
    }

}