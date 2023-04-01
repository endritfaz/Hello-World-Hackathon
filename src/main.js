
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
		//
		this.load.image('carrier','sprites/carrier.png')
		this.load.image('player', 'sprites/player.png')
	}
	create (){
		console.log("Create in Game called")
		//Scale the player
		this.add.image(150,150, 'carrier')
		let playerSprite = this.add.image(300,300,'player')
		playerSprite.setScale(SETTINGS.planesScale)
		
	}
	update(){

	}
}