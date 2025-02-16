class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() { 
        this.OLD_ROCK_SPEED = 300;
        this.NEW_ROCK_SPEED = 300;
        this.SCROLL_SPEED = this.OLD_ROCK_SPEED * 0.005;
        this.ROCK_SCALE = 2;   
        this.ROCK_SCALE_MAX = 5;     
        this.SCALING_MAX = 10;
        this.SCALING_MIN = -6;
        this.ROCK_BENCHMARK = 1.1;
        this.ROCK_WIDTH = this.textures.get("rrrock").getSourceImage().width;
        this.ROCK_HEIGHT = this.textures.get("rrrock").getSourceImage().height;
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 400, "grass").setScale(1.8);
        this.ball = this.physics.add.sprite(width / 5, height / 2, "ball");
        this.ball.body.setCircle(this.ball.width / 2.5).setCollideWorldBounds(true).setBounce(0.7).setDamping(true).setDrag(0.6).setOffset(6, );

        this.timeConfig = {
            fontFamily: 'Courier',
            fontStyle: "bold",
            fontSize: '28px',
            backgroundColor: '#0398fc',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }

        this.timeElapsed = 0;
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: this.incrementTime,
            callbackScope: this,
            loop: true,
        })

        this.difficultyTimer = this.time.addEvent({
            delay: 5000,
            callback: this.incrementDifficulty,
            callbackScope: this,
            loop: true,
        })
        
        this.timeLeft = this.add.text(game.config.width - 100, 20, 0, this.timeConfig);
        this.timeLeft.depth = 3;

        this.rollRate = 0;
        this.anims.create({
            key: "rollRight",
            frames: this.anims.generateFrameNumbers("rollSheet", {
                frames: [0, 1, 2, 3],
                frameRate: 16,
                repeat: -1,
            }),
        })

        this.anims.create({
            key: "rollLeft",
            frames: this.anims.generateFrameNumbers("rollSheet", {
                frames: [0, 3, 2, 1],
                frameRate: 16,
                repeat: -1,
            }),
        })

        this.obstacleGroup = this.add.group({
            runChildUpdate: true,
        });

        this.time.delayedCall(500, () => {
            this.spawnRock();
        });

        this.soundDelay = 0; 
        this.boink = this.sound.add("boink").setVolume(0.2);
        this.physics.add.collider(this.ball, this.obstacleGroup, () => {
            if (this.time.now > this.soundDelay){
                this.boink.play();
                this.soundDelay = this.time.now + 400;
            }
        });
       
        this.music = this.sound.add("bowlingSong").setVolume(0.0);
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

        this.clap = this.sound.add("clap").setVolume(0.3);

        this.swing = this.sound.add("swing").setVolume(0.2);

        this.windup = this.sound.add("windup").setVolume(0.2);
        
        this.shotCharge = 0;
        this.displayCharge = 0;
        this.chargeText = this.add.text(0, 0, "" + this.shotCharge,{
            fontFamily: "Courier",
            fontSize: 36,
            fontStyle: "bold",
            backgroundColor: "#0398FC",
            color: "#843605",
            align: "center",
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 80,
        });
        this.chargeText.alpha = 0;
        this.chargeText.depth = 5;

        this.shotLine = this.add.line(300, 250, 100, 100, 700, 600, 0xFF0000, 1);
        this.shotLine.alpha = 0;
        this.shotLine.depth = 5;

        this.holding = false;
        this.input.on("pointerdown", (pointer) => {
            this.windup.play();
            this.chargeText.alpha = 1;
            this.chargeText.x = pointer.x <= this.ball.x ? pointer.x - 40 : pointer.x + 40;
            this.chargeText.y = pointer.y <= this.ball.y ? pointer.y - 40 : pointer.y + 40;
            this.shotLine.setTo(
                this.ball.x,
                this.ball.y,
                pointer.x,
                pointer.y,
            );
            this.shotLine.lineWidth = 45;
            this.shotLine.alpha = 1;
            this.NEW_ROCK_SPEED = 40;
            Phaser.Actions.Call(this.obstacleGroup.getChildren(), (obstacle) => {
                obstacle.setVelocityX(-40);
            });
            this.SCROLL_SPEED = 40 * 0.005;
            this.holding = true;
            this.ball.body.setDrag(0.02);
        });

        this.input.on("pointerup", (pointer) => {
            if (this.holding) {
                this.ball.body.setDamping(true).setDrag(0.6);
                this.chargeText.alpha = 0;
                this.chargeText.setBackgroundColor("#0398FC");
                this.chargeText.setColor("#843605");
                Phaser.Actions.Call(this.obstacleGroup.getChildren(), (obstacle) => {
                obstacle.setVelocityX(-this.OLD_ROCK_SPEED);
                });
                this.NEW_ROCK_SPEED = this.OLD_ROCK_SPEED;
                this.SCROLL_SPEED = this.OLD_ROCK_SPEED * 0.005;
                let shot_angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y);
                this.ball.body.setVelocityX(this.shotCharge * -Math.cos(shot_angle));
                this.ball.body.setVelocityY(this.shotCharge * -Math.sin(shot_angle));
                this.swing.play();
                this.shotCharge = 0;
                this.holding = false;
                this.shotLine.alpha = 0;
            }
        });
        this.gameOver = false;
    }

    update() {
        if (!this.gameOver){        
            if (this.ball.x < this.ball.width / 2){
                this.gameOver = true;
                this.music.stop();
                this.clap.play();
                this.scene.start("gameOverScene", this.timeElapsed);
            }
            if (this.holding) {
                let pointer = this.input.mousePointer;
                this.shotLine.setTo(
                    this.ball.x,
                    this.ball.y,
                    pointer.x,
                    pointer.y,
                );
                this.chargeText.x = pointer.x <= this.ball.x ? pointer.x - this.chargeText.displayWidth : pointer.x + this.chargeText.displayWidth - 80;
                this.chargeText.y = pointer.y <= this.ball.y ? pointer.y  - this.chargeText.displayHeight : pointer.y + this.chargeText.displayHeight - 20;
                if (this.shotCharge < 1000) {
                    if (this.shotCharge > 190 && this.shotCharge < 400) {
                        this.chargeText.setBackgroundColor("#3ec1a7");
                    } else if (this.shotCharge > 590 && this.shotCharge < 800) {
                        this.chargeText.setBackgroundColor("#6abe41");
                    } else if (this.shotCharge > 390 && this.shotCharge < 600) {
                        this.chargeText.setBackgroundColor("#deb821");
                    } else if (this.shotCharge > 590 && this.shotCharge < 800) {
                        this.chargeText.setBackgroundColor("#e86817");
                    }
                    this.shotCharge += 10;
                    this.displayCharge = Phaser.Math.FloorTo(this.shotCharge, 2, 10) / 100;
                    this.chargeText.setText(this.displayCharge);
                    
                } else {
                    this.chargeText.setColor("#ffff8e");
                    this.chargeText.setBackgroundColor("#e21d3a");
                }
            } 
            this.rollRate = this.ball.body.velocity.x > 0 ? Phaser.Math.FloorTo(this.ball.body.velocity.x, 2, 10) / 1000 : Phaser.Math.FloorTo(-this.ball.body.velocity.x, 2, 10) / 1000;
            if(this.ball.body.velocity.x >= 0){
                this.ball.anims.msPerFrame = Phaser.Math.FloorTo(24 / (this.rollRate + 0.001), 1, 10) < 800 ? Phaser.Math.FloorTo(24 / (this.rollRate + 0.0000001), 1, 10) : 800;
                this.ball.anims.play("rollRight", true);
                
            } else if (this.ball.body.velocity.x < 0){
                this.ball.anims.msPerFrame = Phaser.Math.FloorTo(14 / this.rollRate, 1, 10) < 800 ? Phaser.Math.FloorTo(24 / this.rollRate, 1, 10) : 800;
                this.ball.anims.play("rollLeft", true);
            }
            this.background.tilePositionX += this.SCROLL_SPEED;
            
        }
    }

    spawnRock() {
        let speed = Phaser.Math.Between(-0.2, 0.2);
        let random_scale = this.ROCK_SCALE + (Phaser.Math.Between(this.SCALING_MIN, this.SCALING_MAX) / 10); 
        let rock = new Rock(this, this.NEW_ROCK_SPEED + speed, this.ROCK_WIDTH * random_scale, this.ROCK_HEIGHT * random_scale, random_scale, this.ROCK_BENCHMARK);
        rock.depth = 1;
        this.obstacleGroup.add(rock);
    }

    incrementTime() {
        this.timeElapsed++;
        this.timeLeft.text = this.timeElapsed;
    }

    incrementDifficulty() {
        if (this.SCALING_MAX < this.ROCK_SCALE_MAX * 4){
            this.ROCK_SCALE *= 1.1;
            this.SCALING_MAX = this.ROCK_SCALE * 5;
            this.SCALING_MIN = this.ROCK_SCALE * -5;
        }
        if (this.OLD_ROCK_SPEED < 600){
            this.OLD_ROCK_SPEED *= 1.1;
        }
    }
    
}