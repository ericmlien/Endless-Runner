'use strict'

/* 
Eric Lien - Putt! 
Spent about 40 hours on this and I still couldn't come up with a better name
I tried to mimic the charge-up swing movement in golf games, kinda like those mini-golf games.


Figuring out how to slow the rest of the game down while you're charging your shot was a nice technical challenge, and I'm proud of how the movement feels.
It took me a while to figure out how to calculate the ball's path and velocity based on the cursor's position relative to the ball. I LOVE TRIGONOMETRY!!!
Also, it took me some research on Phaser Lines to figure out how to draw the red guiding line between the ball and the cursor while charging, but I liked how it turned out.

I drew everything for this game in Pixilart, resulting in a pixel art aesthetic. 

I feel like I put a clever spin on the ensless runner form through the changes I've made to the movement 
and the extra hoops I went through to make it feel good- 
    the time slowing down while you're charging, and the guiding line, 
    I even made the speed that the ball rolls depending on how fast it's going using a tilesheet 

The only thing now is the name LMAO 

PuTt!11!1!

*/


let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [ Menu, Credits, Play, GameOver ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};

let game = new Phaser.Game(config);

let { width, height } = game.config;