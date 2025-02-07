class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    init() {
        this.SCROLL_SPEED = 1;
    }

    preload() {
        this.load.image("ball", "./assets/golf-ball.png");
        this.load.image("grass", "./assets/background.png");
    }

    scroll() {
        
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 400, "grass").setScale(1.8);
        this.ball = this.physics.add.sprite(width / 5, height / 2, "ball");
        this.ball.body.setCircle(this.ball.width / 2.5).setCollideWorldBounds(true).setBounce(0.5).setDamping(true).setDrag(0.6).setOffset(6, );
    }

    update() {
        this.background.tilePositionX += this.SCROLL_SPEED;
    }

    
}