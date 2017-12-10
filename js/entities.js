class Enemy {
  constructor() {
    const enemy = DontPanic.game.add.sprite(-10, 100, 'enemyShip');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    enemy.fixedToCamera = true;
    DontPanic.game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = false;
    enemy.animations.add('abduct');
    enemy.abductCheck = false;
    this.enemySprite = enemy;
    // this.abduct();
  }

  moveEnemy() {
    this.enemySprite.cameraOffset.x += 1;
    this.moveToPlayer();
  }

  moveToPlayer(enemyLocation, playerLocation) {
    // console.log(enemy.enemySprite.y, player.playerSprite.y);
    if (enemy.enemySprite.y < (player.playerSprite.y - 250)) {
      this.enemySprite.cameraOffset.y += 1;
    }
    else {
      this.abduct();
    }
    if (enemy.enemySprite.x > player.playerSprite.x) {
      // this.enemySprite.cameraOffset.x += 1;
    }
    // if player x > enemy x move down toward player
  }

  abduct() {
    if (!this.enemySprite.abductCheck) {
      this.enemySprite.animations.play('abduct', 20, false);
      this.enemySprite.abductCheck = true;
    }
  }
}

class Whale {
  constructor() {
    let randomHeight = (Math.floor(Math.random() * 5000) + 500)
    const whale = DontPanic.game.add.sprite(DontPanic.game.world.width/2 - 16, -(randomHeight), 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    DontPanic.game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = randomHeight / 100;
    this.whaleSprite = whale;
  }
}

class Petunias {
}

class Coins {
  constructor() {
    let coins = DontPanic.game.add.group();
    coins.enableBody = true;
    DontPanic.game.physics.arcade.enable(coins);
    this.coins = coins;
    this.initialCoins();
    // randomly generate more coins at intervals - https://developer.amazon.com/blogs/appstore/post/Tx3AT4I2ENBOI6R/intro-to-phaser-part-3-obstacles-collision-score-sound-and-publishing
    var coinSpawnRate = config[config.currentLevel]['coinSpawnRate'];
    this.coinTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * coinSpawnRate, this.randomCoinGenerator, this);
    this.coinTimer.timer.start();
  }

  initialCoins() {
    var initialCoinPositions = [[300, 0], [20, 40], [60, 80], [250, 200], [90, 120], [180, 350], [220, 10], [120, 290]]
    for (var i = 0; i < initialCoinPositions.length; i++) {
      this.createCoin(initialCoinPositions[i][0], initialCoinPositions[i][1]);
    }
  }

  randomCoinGenerator() {
    var randomX = Math.floor(Math.random() * 320) + 5;
    var randomY = Math.floor(Math.random() * 10) + -10;
    this.createCoin(randomX, randomY);
  }

  createCoin(x, y) {
    console.log(x, y);
    var coin = this.coins.create(x, y, 'coin');
    coin.scale.x = 0.3;
    coin.scale.y = 0.3;
    coin.enableBody = true;
    coin.body.velocity.y = 100;
    coin.body.collideWorldBounds = false;
  }
}
