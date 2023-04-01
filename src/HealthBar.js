export class HealthBar {

    constructor (scene, x, y)
    {
        
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw(amount);

        return (this.value === 0);
    }

    draw (amount = 0)
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000); // Black BG
        this.bar.fillRect(this.x, this.y, 300, 15);

        //  Health

        this.bar.fillStyle(0xffffff); // White BG
        this.bar.fillRect(this.x + 2, this.y + 2, 296, 15);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000); // Red
        }
        else
        {
            this.bar.fillStyle(0x00ff00); // Green
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, 296 - (amount/100)*296, 15);
    }

}
