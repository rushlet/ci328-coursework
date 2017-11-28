class Background {
    constructor() {
        this.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
        this.background.autoScroll(0, 50);
    }

    random() {
      // change background to random image
    }

    reset() {
      this.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
    }
}

class Lives {
  constructor() {
    let lives = DontPanic.game.add.group();
    lives.createMultiple(3, 'heart');
    lives.setAll('anchor.x', 0.5);
    lives.setAll('anchor.y', 1);
    lives.setAll('outOfBoundsKill', true);
    lives.setAll('checkWorldBounds', true);
    // DontPanic.game.add.sprite(5, 10, 'heart');
    lives.fixedToCamera = true;
    lives.livesLeft = 4;
    this.lives = lives;
  }

  loseLife() {
    this.lives.livesLeft -= 1;
  }

  gainLife() {
    if (this.lives.livesLeft > 4) {
      this.lives.livesLeft += 1;
    }
  }
}

// class FuelBar {
//   constructor() {
//     let fuelbar = DontPanic.game.add.sprite(5, 10, 'fuelbar');
//     let fuelLevel = 100;
//     fuelbar.width = 100;
//     fuelbar.height = 10;
//     fuelbar.fixedToCamera = true;
//     this.fuelbar = fuelbar;
//     this.fuelLevel = fuelLevel;
//   }
//
//   reduceFuel(amount) {
//     this.fuelLevel -= amount;
//     this.fuelbar.width = this.fuelLevel;
//   }
// }
