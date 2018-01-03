class Enemy {
  constructor() {
    this.enemies = DontPanic.game.add.group();
    this.abductionSound = DontPanic.game.add.audio('abduction');
    this.abductionSoundFail = DontPanic.game.add.audio('abductionFail');
    var enemySpawnRate = config[config.currentLevel]['enemySpawnRate'];
    this.enemyTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * enemySpawnRate, this.createEnemy, this);
    this.enemyTimer.timer.start();
  }

  createEnemy() {
    const enemy = this.enemies.create(DontPanic.game.world.centerX, -10, 'enemyShip');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
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
      enemy.abductionSoundFail.play();
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
    coins.collection = DontPanic.game.add.audio('coinPing');
    DontPanic.game.physics.arcade.enable(coins);
    this.coins = coins;
    this.initialCoins();
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
    var coin = this.coins.create(x, y, 'coin');
    coin.scale.x = 0.3;
    coin.scale.y = 0.3;
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
    obstacles.soundFall = DontPanic.game.add.audio('obstacleWhoosh');
    obstacles.soundCollide = DontPanic.game.add.audio('obstacleCollision');
    DontPanic.game.physics.arcade.enable(obstacles);
    this.obstacles = obstacles;
  }

  whale() {
    var randomX = Math.floor(Math.random() * 200) + 100;
    const whale = obstacle.obstacles.create(randomX, -100, 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    DontPanic.game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = 50;
    obstacle.obstacles.soundFall.play();
  }

  petunias() {
    var randomX = Math.floor(Math.random() * 320) + 25;
    const petunias = obstacle.obstacles.create(randomX, -150, 'petunias');
    petunias.scale.x = 0.1;
    petunias.scale.y = 0.1;
    DontPanic.game.physics.arcade.enable(petunias);
    petunias.body.collideWorldBounds = false;
    petunias.body.gravity.y = 60;
    obstacle.obstacles.soundFall.play();
  }
}

class ExtraLife {
  constructor() {
    let extraLives = DontPanic.game.add.group();
    extraLives.enableBody = true;
    extraLives.collection = DontPanic.game.add.audio('lifePing');
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
    var randomX = Math.floor(Math.random() * 320) + 5;
    const life = extraLife.extraLives.create(randomX, -100, 'extraLife');
    life.scale.x = 0.06;
    life.scale.y = 0.06;
    life.enableBody = true;
    DontPanic.game.physics.arcade.enable(life);
    life.body.collideWorldBounds = false;
    life.body.gravity.y = 40;
  }
}
