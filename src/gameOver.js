/* THIS ONE DOESNT WORK FOR SOME REASON
const MENUSET = {
    titlescale : 0.6,
}

export class gameOver extends Phaser.Scene {
	preload() {
		//Importing all the files for Menu
		console.log("Game over button")
		this.load.baseURL = 'assets/'
		//load sprites 
		this.load.image('Gameoverscreen','sprites/GAME OVER.png')

	}
	create (){
        console.log("Create in Game called")
		this.add.image(550,250, 'Gameoverscreen').setScale(MENUSET.titlescale)
	}
	update(){

	}
} */