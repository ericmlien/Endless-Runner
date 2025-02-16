class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, velocity, width, height, scale, benchmark) {
        super(scene, game.config.width + (width), Phaser.Math.Between(height / 2, game.config.height - height / 2), "rock");
        this.setScale(scale);
        this.width = width;
        this.height = height;
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this).setSize(width, height, true).setCircle(this.width / (scale * 1.1), 0, height / (scale * 10));
        this.velocity = velocity;
        this.setVelocityX(-this.velocity);
        this.setImmovable();
        this.spawnRock = true;
        this.benchmark = benchmark;
    }

    update () {
        if (this.spawnRock && this.x < game.config.width / this.benchmark) {
            this.parentScene.spawnRock(this.parentScene, this.velocity); //change this to make a general SPAWN ANYTHING method if u want to have different kinds of obstacles.
            this.spawnRock = false;
        }

        if (this.x < -this.width) {
            this.destroy();
        }
    }
}