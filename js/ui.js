class Background {
    constructor() {
        this.level1();
    }

    level1 () {
        for (var i = game.world.height; i >= 0; i -= 1200) {
            game.add.image(0, i, 'background1');
        }
    }
}
