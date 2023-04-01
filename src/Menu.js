/* window.addEventListener('load', function () {
	var game = new Phaser.Game({
		title: "Carrier Defense Menu",
		width: 800,
		height: 600,
        backgroundColor: "#CA8D16",

        scale: {
			mode: Phaser.Scale.ScaleModes.NONE,
			width: this.window.innerWidth,
			height: this.window.innerHeight,
		}, 
	});
}); */
const MENUSET = {
    titlescale : 0.1,
}

export class Menu extends Phaser.Scene {
	preload() {
		//Importing all the files for Menu
		console.log("Title, Buttons")
		this.load.baseURL = 'assets/'
		//load sprites 
		this.load.image('Gametitle','sprites/GAME TITLE.png')
	}
	create (){
		console.log("Create in Game called")
		//Add The title
		this.add.image(550,250, 'Gametitle').setScale(MENUSET, titlescale)
		
	}
	update(){

	}
}