export class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.setVelocity(this.speed)
    }
     
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
    
    update() {
        this.pointerMove(this.scene.input.activePointer)
    
        this.scene.physics.velocityFromRotation(this.rotation, this.speed, this.body.velocity)
        this.body.debugBodyColor = (this.body.angularVelocity === 0) ? 0xff0000 : 0xffff00
    }
}
