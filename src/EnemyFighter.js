export class EnemyFighter extends Phaser.Physics.Arcade.Sprite {
    target = 0
    
    constructor(scene, xPos, yPos, texture, carrierX, carrierY, speed, frame){
        super(scene, xPos, yPos, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.hp = 1
        this.setBodySize(120,120)
        this.carriorPos = new Phaser.Geom.Point(carrierX, carrierY)

        this.target = Phaser.Math.Angle.BetweenPoints(this.body.position, this.carriorPos)
        this.rotation = this.target + Math.PI/2
        this.vector = new Phaser.Math.Vector2(carrierX - xPos, carrierY - yPos)
        this.vector.setLength(speed)
        this.body.setVelocity(this.vector.x, this.vector.y)
    }
    update(){
        
    }
    shoot(){

    }
}