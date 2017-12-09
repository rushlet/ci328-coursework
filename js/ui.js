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
    lives.fixedToCamera = true;
    lives.livesLeft = 4;
    this.lives = lives;
    // var heart = lives.createMultiple(3, 'heart');
    this.updateLives();

  }
  updateLives() {
    console.log('update', this.lives.livesLeft);
    for (var i = 0; i < this.lives.livesLeft-1; i++) {
      console.log('lives!!');
      var heart = this.lives.create((10+(i*20)), 10, 'heart');
      heart.scale.x = 0.04;
      heart.scale.y = 0.04;
    }
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

class CoinScore {
  constructor() {
    var coinTotalText = DontPanic.game.add.text(DontPanic.game.world.centerX, 30, `Total Coins: ${coinTotal}`, {
        font: '16px whoopass',
      });
    coinTotalText.anchor.setTo(0.5);
    coinTotalText.align = 'center';
    coinTotalText.fill = '#fff';
    coinTotalText.padding.set(16, 16);
    this.coinTotalText = coinTotalText;
  }

  addToCoinScore() {
    coinTotal++;
    this.coinTotalText.setText(`Total Coins: ${coinTotal}`);
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
