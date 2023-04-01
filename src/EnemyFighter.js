export class EnemyFighter extends Phaser.Physics.Arcade.Sprite {   
    constructor(scene, xPos, yPos, texture, carrierX, carrierY, speed, range, shootManager, frame){
        super(scene, xPos, yPos, texture, frame)
        this.shootManager = shootManager;
        this.range = range
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.hp = 1
        this.setBodySize(120,120)
        this.ammo = 1

        //Sends enemy figher in the right direction.
        this.carriorPos = new Phaser.Geom.Point(carrierX, carrierY)
        this.target = Phaser.Math.Angle.BetweenPoints(this.body.position, this.carriorPos)
        this.rotation = this.target + Math.PI/2
        this.vector = new Phaser.Math.Vector2(carrierX - xPos, carrierY - yPos)
        this.vector.setLength(1)
        
        this.moveVector = new Phaser.Math.Vector2(this.vector.x, this.vector.y)
        this.body.setVelocity(this.vector.x, this.vector.y)
    }
    update(){
        let pos = this.body.position;
        let dist = Phaser.Math.Distance.BetweenPoints(pos, this.carriorPos)
        if (dist < this.range && this.ammo > 0){
            console.log("Enemy shooting carrier MyPos: ", pos,"Range:",this.range)
            this.shootManager.fireEnemyMissile(pos.x, pos.y, this.body.rotation, this.vector)
            this.ammo = 0
        }
    }
}