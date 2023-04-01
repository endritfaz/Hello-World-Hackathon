import Player from {}
const SETTINGS = {
	planesScale: 0.2,
}
window.addEventListener('load', function () {
	var game = new Phaser.Game({
		title: "Carrier Defense",
		width: 800,
		height: 600,
		type: Phaser.AUTO,
        backgroundColor: "#1A0189",
		scale: {
			mode: Phaser.Scale.ScaleModes.NONE,
			width: this.window.innerWidth,
			height: this.window.innerHeight
		},
		physics:{
			default: 'arcade',
			arcade:{
				debug: true
			}
		},
		render:{
			antialiasGL: false,
			pixelArt: true
		},
		autoFocus: true,
		canvasStyle: 'display: block; width: 100%; height: 100%',
		scene: [Game]
	});
	// game.scene.add("Game", Game, true);
});


class Game extends Phaser.Scene {
	preload() {
		//Importing all the files
		console.log("Preload in Game called")
		this.load.baseURL = 'assets/'
		//load sprites 
		this.load.image('carrier','sprites/carrier.png')
		this.load.image('player', 'sprites/player.png')
		this.load.image('enemy-fighter','sprites/enemy-fighter.png')
		this.load.image('enemy-bomber','sprites/enemy-bomber.png')
		this.load.image('player-missile.png','sprites/player-missile.png')
		this.load.image('bullet','sprites/bullet.png')

	}
	create (){
		console.log("Create in Game called")
		//Scale the player
		this.add.image(150,150, 'carrier')
		// this.add.image(300,300,'player').setScale(SETTINGS.planesScale)
		// playerSprite.setScale(SETTINGS.planesScale)






		// Create player object
		player = this.physics.add.sprite(new Player(this, 100, 450));

		
	}
	update(){

	}
}