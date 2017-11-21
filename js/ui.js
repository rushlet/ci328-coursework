class Background {
    constructor() {
        this.level1();
    }

    level1() {
        for (var i = DontPanic.game.world.height; i >= 0; i -= 1200) {
            DontPanic.game.add.image(0, i, 'background1');
        }
    }
}

class FuelBar {
  constructor() {
    let fuelbar = DontPanic.game.add.sprite(5, 10, 'fuelbar');
    let fuelLevel = 100;
    fuelbar.width = 100;
    fuelbar.height = 10;
    fuelbar.fixedToCamera = true;
    this.fuelbar = fuelbar;
    this.fuelLevel = fuelLevel;
  }

  reduceFuel(amount) {
    this.fuelLevel -= amount;
    this.fuelbar.width = this.fuelLevel;
  }
}
