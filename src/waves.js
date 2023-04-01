export class Waves {

    constructor(scene, x)
    {

        scene.add.text(25, 10, 'Wave '+x)
            .setScale(3)
            .setOrigin(0)
            .setStyle({fontFamily: 'Courier'});

    }
}