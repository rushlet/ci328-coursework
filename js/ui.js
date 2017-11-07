class Background {
    constructor() {
        this.level1();
    }

    level1() {
        for (var i = game.world.height; i >= 0; i -= 1200) {
            game.add.image(0, i, 'background1');
        }
    }
}

class FuelBar {
  constructor() {
    let fuelbar = game.add.sprite(5, 10, 'fuelbar');
    let fuelLevel = 100;
    fuelbar.width = 100;
    fuelbar.height = 10;
    fuelbar.fixedToCamera = true;
    this.fuelbar = fuelbar;
    this.fuelLevel = fuelLevel;
  }

  reduceFuel(amount) {
    console.log('reduce fuel');
    console.log(amount);
    console.log('fuel', this.fuelLevel);
    this.fuelLevel -= amount;
    this.fuelbar.width = this.fuelLevel;
  }
}
