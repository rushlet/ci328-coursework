class Enemy {
  constructor() {
    this.enemies = DontPanic.game.add.group();
    var enemySpawnRate = config[config.currentLevel]['enemySpawnRate'];
    this.enemyTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * enemySpawnRate, this.createEnemy, this);
    this.enemyTimer.timer.start();
  }

  createEnemy() {
    const enemy = this.enemies.create(DontPanic.game.world.centerX, -10, 'enemyShip');
    resizeSprite(enemy, 0.2);
    enemy.fixedToCamera = true;
    DontPanic.game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = false;
    enemy.abductAnimate = enemy.animations.add('abduct');
    enemy.beamUpAnimate = enemy.animations.add('beamUp', [3,3,3,3,2,1,0]);
    enemy.body.setSize(275, 1140, 80, 0); // collision hit area
    enemy.body.immovable = true;
    enemy.abductCheck = false;
    enemy.abductSuccessful = false;
    enemy.positioned = false;
    DontPanic.game.time.events.add(Phaser.Timer.SECOND * 3.5, this.abduct, this, enemy);
    this.checkIfImprobabilityDriveSprite(enemy);
  }

  checkIfImprobabilityDriveSprite(enemy) {
    if (improbabilityDriveTriggered) {
      enemy.loadTexture(improbabilityScenarioAssets[currentScenario].enemy, 0);
      if (currentScenario == 'reset') {
        improbabilityDriveTriggered = false;
      }
    }
  }

  moveEnemy() {
    this.enemies.forEachExists((sprite) =>  {
      // DontPanic.game.debug.body(sprite);
      if (!sprite.positioned && !sprite.abductCheck) {
          this.descend(sprite);
          this.moveToPlayer(sprite);
      }
      if (sprite.abductCheck) {
        this.leaveScreen(sprite);
      }
    });
  }

  moveToPlayer(sprite) {
    if (sprite.x >= player.playerSprite.x - (player.playerSprite.width / 2)) {
      sprite.cameraOffset.x -= config[config.currentLevel]['enemySpeedHorizontal'];
    } else {
      sprite.cameraOffset.x += config[config.currentLevel]['enemySpeedHorizontal'];
    }
  }

  descend(sprite) {
    if (sprite.y < (player.playerSprite.y - 255)) {
      sprite.cameraOffset.y += config[config.currentLevel]['enemySpeedVertical'];
    }
    else {
      sprite.positioned = true;
    }
  }

  leaveScreen(sprite) {
    if (sprite.x < player.playerSprite.x) {
      sprite.cameraOffset.x -= 1.5;
    } else {
      sprite.cameraOffset.x += 1.5;
    }
  }

  abduct(sprite) {
    if (!sprite.abductCheck) {
      sprite.animations.play('abduct', 20, false);
      sprite.abductAnimate.onComplete.add(() => {sprite.animations.play('beamUp', 20, false);}, this);
      sprite.abductCheck = true;
    }
  }
}

class Coins {
  constructor() {
    let coins = DontPanic.game.add.group();
    coins.enableBody = true;
    DontPanic.game.physics.arcade.enable(coins);
    this.coins = coins;
    this.initialCoins();
    var coinSpawnRate = config[config.currentLevel]['coinSpawnRate'];
    this.coinTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * coinSpawnRate, this.createCoin, this);
    this.coinTimer.timer.start();
  }

  initialCoins() {
    var initialCoinPositions = [[300, 0], [20, 40], [60, 80], [250, 200], [90, 120], [180, 350], [220, 10], [120, 290]]
    for (var i = 0; i < initialCoinPositions.length; i++) {
      this.createCoin(initialCoinPositions[i][0], initialCoinPositions[i][1]);
    }
  }

  createCoin(x, y) {
    var x = x || randomNumber(320, 5);
    var y = y || randomNumber(10, -10)
    var coin = this.coins.create(x, y, 'coin');
    resizeSprite(coin, 0.3);
    coin.enableBody = true;
    coin.body.velocity.y = 100;
    coin.body.collideWorldBounds = false;
    if (improbabilityDriveTriggered) {
      coin.loadTexture(improbabilityScenarioAssets[currentScenario].coins, 1);
    }
  }
}

class Obstacle {
  constructor() {
    let obstacles = DontPanic.game.add.group();
    obstacles.enableBody = true;
    DontPanic.game.physics.arcade.enable(obstacles);
    this.obstacles = obstacles;
  }

  whale() {
    const whale = obstacle.obstacles.create(randomNumber(200, 100), -100, 'whale');
    resizeSprite(whale, 0.3);
    addGenericPropertiesForFallingObjects(whale, 50);
  }

  petunias() {
    const petunias = obstacle.obstacles.create(randomNumber(320, 25), -150, 'petunias');
    resizeSprite(petunias, 0.1)
    addGenericPropertiesForFallingObjects(petunias, 60);
  }
}

class ExtraLife {
  constructor() {
    let extraLives = DontPanic.game.add.group();
    extraLives.enableBody = true;
    DontPanic.game.physics.arcade.enable(extraLives);
    this.extraLifeTimer;
    this.extraLives = extraLives;
  }

  triggerExtraLife() {
    var extraLifeSpawnRate = config[config.currentLevel]['extraLifeSpawnRate'];
    DontPanic.game.time.events.remove(extraLife.extraLifeTimer);
    if (lives.lives.livesLeft < 4 && lives.lives.livesLeft > 1) {
      extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * extraLifeSpawnRate, extraLife.extraLife, this);
      extraLife.extraLifeTimer.timer.start();
    }
    if (lives.lives.livesLeft <= 1) {
      extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * (extraLifeSpawnRate/2), extraLife.extraLife, this);
      extraLife.extraLifeTimer.timer.start();
    }
  }

  extraLife() {
    console.log('extra life added');
    const life = extraLife.extraLives.create(randomNumber(320, 5), -100, 'extraLife');
    resizeSprite(life, 0.06);
    addGenericPropertiesForFallingObjects(life, 40);
  }
}
