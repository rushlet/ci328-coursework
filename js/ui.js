function createUI() {
  DontPanic.lives = new LivesScore();
  DontPanic.coinScore = new CoinScore();
  DontPanic.distance = new DistanceScore();
}

function backgroundMusic() {
    let backgroundMusic = DontPanic.game.add.audio('backgroundMusic');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
    return backgroundMusic;
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
    resizeSprite(heart, 0.04);
  }

  loseLife() {
    if (this.lives.livesLeft > 1) {
      this.lives.livesLeft -= 1;
      DontPanic.extraLife.triggerExtraLife();
      eventOnLatestChildAdded(this.lives.children, this.removeLife);
    }
    else {
      gameOver();
    }
  }

  removeLife(heart) {
    heart.kill();
  }

  gainLife(player, life) {
    DontPanic.extraLife.extraLives.collection.play();
    life.kill();
    let livesLeft = DontPanic.lives.lives.livesLeft;
    if (livesLeft < 4) {
      livesLeft += 1;
      DontPanic.lives.createHeart(livesLeft - 2);
    }
    DontPanic.extraLife.triggerExtraLife();
  }

  loseAllLives() {
    this.lives.forEachExists((sprite) =>  {
      DontPanic.lives.removeLife(sprite);
    });
  }
}

class CoinScore {
  constructor() {
    this.coinTotalText = createScoreText(DontPanic.game.world.centerX, `Total Coins: ${DontPanic.coinTotal}`);
  }

  addToCoinScore() {
    DontPanic.coinTotal++;
    this.coinTotalText.setText(`Total Coins: ${DontPanic.coinTotal}`);
  }
}

class DistanceScore {
  constructor() {
    DontPanic.currentDistance = 0;
    this.distanceTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.distanceIncrease, this);
    this.distanceTimer.timer.start();
    this.distanceReachedText = createScoreText(DontPanic.game.width - 50, `Distance: ${DontPanic.currentDistance}`);
  }

  distanceIncrease() {
    DontPanic.currentDistance++;
    this.distanceReachedText.setText(`Distance: ${DontPanic.currentDistance}`);
  }

  checkBestDistance() {
    if (DontPanic.currentDistance > parseInt(DontPanic.bestDistance)) {
      localStorage['bestDistance'] = DontPanic.currentDistance.toString();
      DontPanic.bestDistance = localStorage['bestDistance'];
      DontPanic.newBestScore = true;
    }
  }
}

function createScoreText(x, content) {
  text =  DontPanic.game.add.text(x, 30, content, {
        font: `${config.style.fontSize_score} ${config.style.font}`,
  });
  text.anchor.setTo(0.5);
  text.align = 'center';
  text.fill = config.style.textColour;
  text.padding.set(16, 16);
  return text;
}
