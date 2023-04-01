export class Carrier extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, xPos, yPos, texture, frame){
        super(scene, xPos, yPos, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.hp = 100
        this.setBodySize(180,40)
        this.rotation = -Math.PI /2
        console.log("Carrier Construction complete")
    }
    doDamage(value){
        if (value > this.hp){
            this.hp = 0
        }
        else{
            this.hp -=value
        }
        console.log("Carrier health: "+ this.hp)
        //Check if dead
        if (this.hp <= 0){
            this.die()
        }
    }
    die(){
        this.disableBody(true,true)
    }


}