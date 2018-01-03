class BackgroundMusic {
  constructor() {
    let backgroundMusic = DontPanic.game.add.audio('backgroundMusic');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
    this.backgroundMusic = backgroundMusic;
  }
}

class LivesScore {
  constructor() {
    let lives = DontPanic.game.add.group();
    lives.fixedToCamera = true;
    lives.livesLeft = 4;
    this.lives = lives;
    for (var i = 0; i < 3; i++) {
      this.createHeart(i)
    }
  }

  createHeart(i) {
    var heart = this.lives.create((10+(i*20)), 10, 'heart');
    heart.scale.x = 0.04;
    heart.scale.y = 0.04;
  }

  loseLife() {
    if (this.lives.livesLeft > 1) {
      this.lives.livesLeft -= 1;
      extraLife.triggerExtraLife();
      eventOnLatestChildAdded(this.lives.children, this.removeLife);
    }
    else {
      gameOver();
    }
  }

  removeLife(heart) {
    heart.kill();
  }

  gainLife() {
    if (this.lives.livesLeft < 4) {
      this.lives.livesLeft += 1;
      this.createHeart(this.lives.livesLeft - 2);
    }
    extraLife.triggerExtraLife();
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

class DistanceScore {
  constructor() {
    currentDistance = 0;
    this.distanceTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.distanceIncrease, this);
    this.distanceTimer.timer.start();

    var distcanceReachedText = DontPanic.game.add.text(DontPanic.game.width - 50, 30, `Distance: ${currentDistance}`, {
        font: '16px whoopass',
    });
    distcanceReachedText.anchor.setTo(0.5);
    distcanceReachedText.align = 'center';
    distcanceReachedText.fill = '#fff';
    distcanceReachedText.padding.set(16, 16);
    this.distcanceReachedText = distcanceReachedText;
  }

  distanceIncrease() {
    currentDistance++;
    this.distcanceReachedText.setText(`Distance: ${currentDistance}`);
  }
}
