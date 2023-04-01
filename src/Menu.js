const MENUSET = {
    titlescale : 0.6,
}

export class Menu extends Phaser.Scene {
	constructor(){
		super('Menu')
	}
	preload() {
		//Importing all the files for Menu
		console.log("Title, Buttons")
		this.load.baseURL = 'assets/'
		//load sprites 
		this.load.image('Gametitle','sprites/GAME TITLE.png')
        this.load.image('playbutton','sprites/PLAYBUTTON.png')

	}
	create (){
		console.log("Create in Game called")
        //adding images
		this.add.image(550,250, 'Gametitle').setScale(MENUSET.titlescale)
        const playbutton = this.add.image(550,400, 'playbutton').setScale(MENUSET.titlescale);
		playbutton.setInteractive();
		playbutton.on('pointerdown', () => {this.scene.start('Game');});
	}
	update(){

	}
}