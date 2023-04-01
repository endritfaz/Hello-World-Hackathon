export class EnemyMissile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy-missile')
    }
    fire (x,y,rot, velocity, scale){
        this.body.reset(x,y)
        this.setScale(scale)
        this.setBodySize(150,150)
        this.rotation = rot
        this.setActive(true)
        this.setVisible(true)
        this.setVelocity(velocity)
    }
    destroySelf(){
        this.setActive(false)
        this.setVisible(false)
    }
}

export class ShootManager extends Phaser.Physics.Arcade.Group{
    constructor(scene, missileScale){
        super(scene.physics.world, scene)
        this.createMultiple({
            key: 'enemy-missile',
            frameQuantity: 3,
            active: false,
            visible: false,
            classType: EnemyMissile
        })
    }
    fireEnemyMissile(x,y,rot,velocity, scale){
        const enemyMissile = this.getFirstDead(false)
        //Checks if enemyMissile is null
        if (enemyMissile){
            console.log("Enemy missile away")
            enemyMissile.fire(x,y,rot,velocity, scale)
        }
    }
}