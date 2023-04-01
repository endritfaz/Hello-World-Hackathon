import { Player } from './Player.js';
import {Menu} from './Menu.js'
import {Carrier} from './Carrier.js'
import {EnemyFighter } from './EnemyFighter.js';
import {HealthBar} from './HealthBar.js';
import { Waves } from './waves.js';
import { gameOver } from './gameOver.js';
import { EnemyMissileManager, PlayerBulletManager } from './ShootManager.js';

const SETTINGS = {
	planesScale: 0.2,
	missileScale: 0.05,
	carrierX: 1280,
	carrierY: 1280,
	enemyFigherSpeed: 10,
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
let playerBulletManager
let testEnemyFighter
function destroy(bullet, enemy){
	console.log("Attempting to destroy enemy")
	enemy.destroySelf()
}
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
		this.groundLayer = this.map.createLayer('Ground',this.tileset,0,0)

		// Centres the camera
		this.cameras.main.centerOn(SETTINGS.carrierX, SETTINGS.carrierY)
		

		
		//Scale the player
		carrier = new Carrier(this, SETTINGS.carrierX, SETTINGS.carrierY, 'carrier')

		// Create player object
		playerBulletManager = new PlayerBulletManager(this)
		player = new Player(this, SETTINGS.carrierX, SETTINGS.carrierY, playerBulletManager).setScale(SETTINGS.planesScale)
		
		enemyMissileManager = new EnemyMissileManager(this)

		// this.add.image(300,300,'player').setScale(SETTINGS.planesScale)
		// this.add.image(400,400,'enemy-fighter').setScale(SETTINGS.planesScale)
		testEnemyFighter = new EnemyFighter(this,SETTINGS.carrierX,SETTINGS.carrierY,'enemy-fighter',
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
		this.physics.add.collider(playerBulletManager, testEnemyFighter, destroy)
	}
	update(time, delta){
		player.update(time, delta);
		// Make the camera follow the player 
		this.cameras.main.startFollow(player)
		testEnemyFighter.update()
	}
}