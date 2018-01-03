function createEntities() {
  DontPanic.player = new Player();
  DontPanic.enemy = new Enemy();
  DontPanic.coins = new Coins();
  DontPanic.improbabilityDrive = new ImprobabilityDrive();
  DontPanic.obstacle = new Obstacle();
  DontPanic.extraLife = new ExtraLife();
}

function removeAllEntities() {
  DontPanic.player.playerSprite.kill();
  DontPanic.enemy.enemies.kill();
  DontPanic.coins.coins.kill();
  DontPanic.obstacle.obstacles.kill();
  DontPanic.improbabilityDrive.improbabilityDrive.kill();
  DontPanic.extraLife.extraLives.kill();
}

function stopEntityGeneration() {
  DontPanic.coins.coinTimer.timer.stop();
  DontPanic.enemy.enemyTimer.timer.stop();
}

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
    resizeSprite(enemy, 0.2);
    enemy.fixedToCamera = true;
    enemy.anchor.set(0.5, 0);
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
    if (DontPanic.improbabilityDriveTriggered) {
      enemy.loadTexture(improbabilityScenarioAssets[currentScenario].enemy, 0);
      if (currentScenario == 'reset') {
        DontPanic.improbabilityDriveTriggered = false;
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
    if (sprite.x > DontPanic.player.playerSprite.x + 1) {
      sprite.cameraOffset.x -= config[config.currentLevel]['enemySpeedHorizontal'];
    } else if (sprite.x < DontPanic.player.playerSprite.x - 1){
      sprite.cameraOffset.x += config[config.currentLevel]['enemySpeedHorizontal'];
    }
  }

  descend(sprite) {
    if (sprite.y < (DontPanic.player.playerSprite.y - 255)) {
      sprite.cameraOffset.y += config[config.currentLevel]['enemySpeedVertical'];
    }
    else {
      sprite.positioned = true;
    }
  }

  leaveScreen(sprite) {
    if (sprite.x < DontPanic.player.playerSprite.x) {
      sprite.cameraOffset.x -= 1.5;
    } else {
      sprite.cameraOffset.x += 1.5;
    }
  }

  abduct(sprite) {
    if (!sprite.abductCheck) {
      DontPanic.enemy.abductionSoundFail.play();
      sprite.animations.play('abduct', 20, false);
      sprite.abductAnimate.onComplete.add(() => {sprite.animations.play('beamUp', 20, false);}, this);
      sprite.abductCheck = true;
    }
  }

  abductPlayer(playerSprite, vogon) {
    if (!vogon.abductSuccessful && vogon.frame == 3) {
      DontPanic.enemy.abductionSound.play();
      DontPanic.lives.loseLife();
      DontPanic.game.camera.shake(0.005, 500);
      vogon.abductSuccessful = true;
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
    if (DontPanic.improbabilityDriveTriggered) {
      coin.loadTexture(improbabilityScenarioAssets[currentScenario].coins, 1);
    }
  }

  collectCoin(player, coin) {
    DontPanic.coins.coins.collection.play();
    coin.kill();
    DontPanic.coinScore.addToCoinScore()
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
    const whale = DontPanic.obstacle.obstacles.create(randomNumber(200, 100), -100, 'whale');
    resizeSprite(whale, 0.3);
    addGenericPropertiesForFallingObjects(whale, 50);
    DontPanic.obstacle.obstacles.soundFall.play();
  }

  petunias() {
    const petunias = DontPanic.obstacle.obstacles.create(randomNumber(320, 25), -150, 'petunias');
    resizeSprite(petunias, 0.1)
    addGenericPropertiesForFallingObjects(petunias, 60);
    DontPanic.obstacle.obstacles.soundFall.play();
  }

  obstacleCollision() {
    DontPanic.obstacle.obstacles.soundFall.stop();
    DontPanic.obstacle.obstacles.soundCollide.play();
    DontPanic.player.playerSprite.kill();
    DontPanic.lives.loseAllLives();
    gameOver();
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
    DontPanic.game.time.events.remove(DontPanic.extraLife.extraLifeTimer);
    if (DontPanic.lives.lives.livesLeft < 4 && DontPanic.lives.lives.livesLeft > 1) {
      DontPanic.extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * extraLifeSpawnRate, DontPanic.extraLife.extraLife, this);
      DontPanic.extraLife.extraLifeTimer.timer.start();
    }
    if (DontPanic.lives.lives.livesLeft <= 1) {
      DontPanic.extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * (extraLifeSpawnRate/2), DontPanic.extraLife.extraLife, this);
      DontPanic.extraLife.extraLifeTimer.timer.start();
    }
  }

  extraLife() {
    const life = DontPanic.extraLife.extraLives.create(randomNumber(320, 5), -100, 'extraLife');
    resizeSprite(life, 0.06);
    addGenericPropertiesForFallingObjects(life, 40);
  }
}
