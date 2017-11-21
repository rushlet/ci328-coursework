class Background {
    constructor() {
        this.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
        this.background.autoScroll(0, 50);
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
