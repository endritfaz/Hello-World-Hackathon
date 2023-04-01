const SETTINGS = {
    enemyMissileScale: 0.05,
    enemyMissileSpeed: 10,
    playerBulletSpeed: 300,
    playerBulletScale: 0.2,
}
export class EnemyMissile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy-missile')
    }
    fire (x,y,rot, vector, scale){
        this.body.reset(x,y)
        this.setScale(scale)
        this.setBodySize(150,150)
        this.rotation = rot
        this.setActive(true)
        this.setVisible(true)
        vector.setLength(SETTINGS.enemyMissileSpeed)
        this.setVelocity(vector.x, vector.y)
    }
    destroySelf(){
        this.setActive(false)
        this.setVisible(false)
    }
}

export class PlayerBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bullet')
    }
    fire (x,y,rot, vector, scale){
        this.body.reset(x,y)
        this.setScale(scale)
        this.setBodySize(150,150)
        this.rotation = rot
        this.setActive(true)
        this.setVisible(true)
        vector.setLength(SETTINGS.playerBulletSpeed)
        this.setVelocity(vector.x, vector.y)
    }
    destroySelf(){
        this.setActive(false)
        this.setVisible(false)
    }
}

export class PlayerBulletManager extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene)
        this.createMultiple({
            key: 'bullet',
            frameQuantity: 30,
            active: false,
            visible: false,
            classType: PlayerBullet
        })
    }
    firePlayerBullet(x,y,rot, vector){
        const playerBullet = this.getFirstDead(false)
        //Checks if enemyMissile is null
        if (playerBullet){
            console.log("Player bullet away",x,y,rot, vector, playerBullet)
            playerBullet.fire(x,y,rot, vector, SETTINGS.playerBulletScale)
        }
    }
}
export class EnemyMissileManager extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene)
        this.createMultiple({
            key: 'enemy-missile',
            frameQuantity: 3,
            active: false,
            visible: false,
            classType: EnemyMissile
        })
    }
    fireEnemyMissile(x,y,rot, vector){
        const enemyMissile = this.getFirstDead(false)
        //Checks if enemyMissile is null
        if (enemyMissile){
            console.log("Enemy missile away",x,y,rot, vector)
            enemyMissile.fire(x,y,rot, vector, SETTINGS.enemyMissileScale)
        }
    }
}