export class EnemyFighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, xPos, yPos, texture, scale, frame){
        super(scene, xPos, yPos, texture, frame)
        let figherSprite = scene.add.existing(this)
        figherSprite.setScale(scale)
        scene.physics.add.existing(this)
        this.hp = 1
        this.setBodySize(180,40)
        this.rotation = -Math.PI /2
        console.log("Figher Construction complete")
    }
}