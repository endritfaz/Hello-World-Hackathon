const MENUSET = {
    titlescale : 0.6,
}

export class gameOver extends Phaser.Scene {
	constructor(){
		super('gameOver')
	}
	preload() {
		//Importing all the files for Menu
		console.log("Title, Buttons")
		this.load.baseURL = 'assets/'
		//load sprites 
		this.load.image('Gameover','sprites/GAME OVER.png')
		this.load.image('menu','sprites/Menu.png')
		this.load.image('playagain','sprites/Playagain.png')

	}
	create (){
		console.log("Game Over Called")
		this.add.image(500,250, 'Gameover')
		const menubutton = this.add.image(500,350, 'menu').setScale(MENUSET.titlescale)
		const againbutton = this.add.image(500,400, 'playagain').setScale(MENUSET.titlescale)
		menubutton.setInteractive()
		againbutton.setInteractive()
		menubutton.on('pointerdown', () => {this.scene.start('Menu');});
		againbutton.on('pointerdown', () => {this.scene.start('Game');});

	}
	update(){
	}
}