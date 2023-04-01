import { Player } from './Player.js';
import {Menu} from './Menu.js'
import {Carrier} from './Carrier.js'
import {EnemyFighter } from './EnemyFighter.js';
import {HealthBar} from './HealthBar.js';
import { Waves } from './waves.js';
import { gameOver } from './gameOver.js';
import { EnemyMissileManager } from './ShootManager.js';

const SETTINGS = {
	planesScale: 0.2,
	missileScale: 0.05,
	carrierX: 1280,
	carrierY: 1280,
	enemyFigherSpeed: 10,
	carrierX: 300,
	carrierY: 300,
	enemyFigherSpeed: 0,
	enemyFighterRange: 180,
}
window.addEventListener('load', function () {
	var game = new Phaser.Game({
		title: "Carrier Defense",
		width: 800,
		height: 600,
		type: Phaser.AUTO,
        backgroundColor: "#CA8F16",
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
		scene: [
			Menu, Game, gameOver
		]
	});
	
});

let carrier
let updateObjects = []
let player
let enemyMissileManager
let testEnemyFighter
class Game extends Phaser.Scene {
	constructor(){
		super('Game')
	}
	preload() {
		//Importing all the files
		console.log("Preload in Game called")
		this.load.baseURL = 'assets/'
		//load player, enemies, carrier and projectiles
		this.load.image('carrier','sprites/carrier.png')
		this.load.image('player', 'sprites/player.png')
		this.load.image('enemy-fighter','sprites/enemy-fighter.png')
		this.load.image('enemy-bomber','sprites/enemy-bomber.png')
		this.load.image('player-missile','sprites/player-missile.png')
		this.load.image('enemy-missile','sprites/enemy-missile.png')
		this.load.image('bullet','sprites/bullet.png')
		//loading the tilemap
		this.load.image({
			key:'tiles',
			url: 'tilemap/water1.png'
		})
		this.load.tilemapTiledJSON('ocean','tilemap/watermap.json')

	}
	create (){
		console.log("Create in Game called")
		//Loading the tilemap
		this.map = this.make.tilemap({key: 'ocean',
										tileWidth: 32,
										tileHeight: 32})
		this.tileset = this.map.addTilesetImage('ocean','tiles')
		

		// Centres the camera
		this.cameras.main.centerOn(SETTINGS.carrierX, SETTINGS.carrierY)
		
		this.groundLayer = this.map.createLayer('Ground',this.tileset,0,0)
		
		//Scale the player
		carrier = new Carrier(this, SETTINGS.carrierX, SETTINGS.carrierY, 'carrier')
		console.log(carrier.hp)
		//this.add.image(300,300,'player').setScale(SETTINGS.planesScale)
		// playerSprite.setScale(SETTINGS.planesScale)
		// Create player object
		player = new Player(this, SETTINGS.carrierX, SETTINGS.carrierY).setScale(SETTINGS.planesScale).refreshBody()
		shootManager = new ShootManager(this, SETTINGS.missileScale)
		player = new Player(this, 300, 300).setScale(SETTINGS.planesScale).refreshBody().setRotation(Math.PI/2);
		enemyMissileManager = new EnemyMissileManager(this, SETTINGS.missileScale)

		// this.add.image(300,300,'player').setScale(SETTINGS.planesScale)
		// this.add.image(400,400,'enemy-fighter').setScale(SETTINGS.planesScale)
		testEnemyFighter = new EnemyFighter(this,200,200,'enemy-fighter',
		SETTINGS.carrierX, SETTINGS.carrierY,
		 SETTINGS.enemyFigherSpeed, SETTINGS.enemyFighterRange, enemyMissileManager).setScale(SETTINGS.planesScale)
		// updateObjects.push(new EnemyFighter(this,400,400,'enemy-fighter',SETTINGS.carrierX, SETTINGS.carrierY).setScale(SETTINGS.planesScale))

		// healthbar (add a decrease function for each plane)
		// const hbar = new HealthBar(this, 30,650)
		// hbar.draw()

		//wavebar (change as per wave)
		
		/*
		const wbar = new Waves(this, 1)
		wbar.draw()
		shootManager = new ShootManager(this, SETTINGS.missileScale)
		*/
	}
	update(){
		player.update();
		// Make the camera follow the player 
		this.cameras.main.startFollow(player)
		testEnemyFighter.update()
	}
}