
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
		autoFocus: true

	});
	game.scene.add("Game", Game, true);
});

class Game extends Phaser.Scene {

	preload() {
		console.log("Preload in Game called")
		this.load.baseURL = 'assets/'
		this.load.image('carrier','sprites/carrier.png')
	}
	create (){
		console.log("Create in Game called")
		this.add.image('carrier',50,50)
	}
	update(){

	}
}