export class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, shootManager) {
        super(scene, x, y, 'player')
        this.shootManager = shootManager;
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.setVelocity(this.speed)
        console.log(this.shootDelay)
    }
    shootReset = 1.5
    shootDelay = 0
    speed = 100
    rotationSpeed = 1 * Math.PI
    rotationSpeedDegrees = Phaser.Math.RadToDeg(this.rotationSpeed)
    TOLERANCE = 0.02 * this.rotationSpeed

    velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation

    pointerMove (pointer) { 
        this.angleToPointer = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY)
        this.angleDelta = Phaser.Math.Angle.Wrap(this.angleToPointer - this.rotation)
          
        if (Phaser.Math.Fuzzy.Equal(this.angleDelta, 0, this.TOLERANCE)) {
          this.rotation = this.angleToPointer
          this.setAngularVelocity(0)
        } else {
          this.setAngularVelocity(Math.sign(this.angleDelta) * this.rotationSpeedDegrees)
        }
    }
    
    update(time, delta) {
        this.pointerMove(this.scene.input.activePointer)
    
        this.scene.physics.velocityFromRotation(this.rotation, this.speed, this.body.velocity)
        this.body.debugBodyColor = (this.body.angularVelocity === 0) ? 0xff0000 : 0xffff00
        this.shootDelay -= delta/1000;

        if (this.shootDelay <= 0 && this.scene.input.activePointer.leftButtonDown()){
            this.shoot()
            this.shootDelay = this.shootReset
        }
    }
    shoot(){
        //CHANGE VECTOR 
        console.log("Player shoot")
        let pos = this.body.position;
        let rot = this.rotation
        let vector = this.body.velocity
        this.shootManager.firePlayerBullet(pos.x, pos.y, this.rot, vector)
    }
}
