let DontPanic = {};
DontPanic.currentDistance;
DontPanic.bestDistance = localStorage['bestDistance'] || '0';
DontPanic.improbabilityDriveTriggered = false;
DontPanic.newBestScore = false;

function init() {
  const gameWidth = 360;
  const gameHeight = 580;
  document.getElementById('gameWindow').innerHTML = '';
  DontPanic.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameWindow', {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
  loadMainImages();
  loadUIAssets();
  loadAudio();
  loadImprobabilityDriveImages();
}

function create() {
  DontPanic.game.world.setBounds(0, 0, 360, 580);
  DontPanic.cursors = DontPanic.game.input.keyboard.createCursorKeys();
  mainMenu();
}

function update() {
  if (DontPanic.gameStarted) {
    DontPanic.player.handleInput();
    handleCollision();
    DontPanic.enemy.moveEnemy();
  }
}

function startGame() {
  if (DontPanic.settingsText) {
    DontPanic.settingsText.kill();
  }
  DontPanic.game.world.removeAll();
  DontPanic.game.paused = false;
  DontPanic.gameStarted = true;
  DontPanic.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
  DontPanic.background.autoScroll(0, 50);
  createEntities();
  createUI();
  addSound();
}

function handleCollision() {
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.coins.coins, DontPanic.coins.collectCoin, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.enemy.enemies, DontPanic.enemy.abductPlayer, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.obstacle.obstacles, DontPanic.obstacle.obstacleCollision, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.extraLife.extraLives, DontPanic.lives.gainLife, null, this);
}

function gameOver() {
  DontPanic.backgroundMusic.fadeOut(1000);
  DontPanic.gameOverSound = DontPanic.game.add.audio('gameOver');
  DontPanic.gameOverSound.play();
  DontPanic.distance.distanceTimer.timer.stop();
  DontPanic.distance.checkBestDistance();
  DontPanic.game.gameOver = DontPanic.game.add.text(DontPanic.game.world.centerX, DontPanic.game.world.centerY * 0.75, 'GAME OVER', { font: `${config.style.fontSize_title} ${config.style.font}`, fill: config.style.textColour });
  DontPanic.game.gameOver.anchor.setTo(0.5);
  DontPanic.game.camera.fade(0x0000000, 3000);
  DontPanic.game.camera.onFadeComplete.add(playAgainMenu, this);
  DontPanic.background.stopScroll();
  removeAllEntities();
  stopEntityGeneration();
  DontPanic.gameStarted = false;
}

function loadMainImages() {
  DontPanic.game.load.image('background1', 'assets/img/space_background.png');
  DontPanic.game.load.image('home_background', 'assets/img/game_screen.jpg');
  DontPanic.game.load.spritesheet('rocket_red', 'assets/img/rocket_spritesheet1.png', 115, 175);
  DontPanic.game.load.spritesheet('rocket_blue', 'assets/img/rocket_spritesheet_blue1.png', 115, 175);
  DontPanic.game.load.spritesheet('enemyShip', 'assets/img/enemy_ship_spritesheet1.png', 440, 1140);
  DontPanic.game.load.image('coin', 'assets/img/coin_2.png');
  DontPanic.game.load.image('extraLife', 'assets/img/extra_life.png');
}

function loadUIAssets() {
  DontPanic.game.load.image('startButton', 'assets/img/button_start.png'); // placeholders for now
  DontPanic.game.load.image('settingsButton', 'assets/img/button_settings.png'); // placeholders for now
  DontPanic.game.load.image('playAgainButton', 'assets/img/button_play-again.png'); // placeholders for now
  DontPanic.game.load.image('heart', 'assets/img/life.png');
  DontPanic.game.load.image('pauseIcon', 'assets/img/pause-button.png');
  DontPanic.game.load.image('playIcon', 'assets/img/play-button.png');
}

function loadImprobabilityDriveImages() {
  DontPanic.game.load.spritesheet('red_button', 'assets/img/iid/iid-button1.png', 152, 119);
  DontPanic.game.load.image('IID_background1', 'assets/img/iid/iid_bg.png');
  DontPanic.game.load.spritesheet('IID_enemy1', 'assets/img/iid/iid_enemy1.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player1', 'assets/img/iid/iid_player1.png', 115, 175);
  DontPanic.game.load.image('IID_teacup', 'assets/img/iid/tea.png');
  DontPanic.game.load.image('whale', 'assets/img/iid/whale.png');
  DontPanic.game.load.image('petunias', 'assets/img/iid/flowers.png');
  DontPanic.game.load.image('IID_background2', 'assets/img/iid/iid_bg2.png');
  DontPanic.game.load.spritesheet('IID_enemy2', 'assets/img/iid/iid_enemy3.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player2', 'assets/img/iid/iid_player2.png', 115, 175);
  DontPanic.game.load.image('IID_coin2', 'assets/img/iid/iid_coin1.png');
  DontPanic.game.load.image('IID_background3', 'assets/img/iid/iid_bg1.png');
  DontPanic.game.load.spritesheet('IID_enemy3', 'assets/img/iid/iid_enemy.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player3', 'assets/img/iid/iid_player3.png', 115, 175);
  DontPanic.game.load.image('IID_coin3', 'assets/img/iid/diamond.png');
}

function loadAudio() {
  DontPanic.game.load.audio('coinPing', 'assets/audio/coin_collection.wav');
  DontPanic.game.load.audio('backgroundMusic', 'assets/audio/background_music.mp3');
  DontPanic.game.load.audio('abduction', 'assets/audio/abduction.wav');
  DontPanic.game.load.audio('abductionFail', 'assets/audio/abduction-fail.wav');
  DontPanic.game.load.audio('lifePing', 'assets/audio/extra-life.mp3');
  DontPanic.game.load.audio('obstacleWhoosh', 'assets/audio/obstacle-fall.mp3');
  DontPanic.game.load.audio('obstacleCollision', 'assets/audio/obstacle-collision.wav');
  DontPanic.game.load.audio('gameOver', 'assets/audio/game-over.wav');
}

const config = {
  currentLevel: 'easy',
  playerColour: 'red',
  soundOn: true,
  easy: {
    coinSpawnRate: 0.5,
    coinInitialPositions: [[300, 0], [20, 40], [60, 80], [250, 200], [90, 120], [180, 350], [220, 10], [120, 290]],
    enemySpawnRate: 4,
    enemyTimeBeforeAbduction: 3.5,
    enemySpeedHorizontal: 1,
    enemySpeedVertical: 1.5,
    enemyDifficultyIncrease: 0.15,
    enemyDifficultyIncreaseInterval: 100,
    lifeSpawnRate: 0.5,
    whaleDelay: 50,
    petuniaSpeed: 60,
    infiniteImprobabilityDelay: 12,
    infiniteImprobabilityDuration: 6,
    infiniteImprobabilityDifficulty: 0.25,
    extraLifeSpawnRate: 4,
  },
  hard: {
    coinSpawnRate: 0.7,
    coinInitialPositions: [[300, 0], [110, 80], [180, 100], [200, 200], [800, 120], [240, 300], [50, 10], [150, 20]],
    enemySpawnRate: 2,
    enemyTimeBeforeAbduction: 3,
    enemySpeedHorizontal: 1.5,
    enemySpeedVertical: 2,
    enemyDifficultyIncrease: 0.2,
    enemyDifficultyIncreaseInterval: 75,
    whaleDelay: 100,
    petuniaSpeed: 120,
    lifeSpawnRate: 0.3,
    infiniteImprobabilityDelay: 18,
    infiniteImprobabilityDuration: 5,
    infiniteImprobabilityDifficulty: 0.5,
    extraLifeSpawnRate: 5,
  },
  improbabilityDriveDestruction: 3.5,
  enemyAbductDistance: 250,
  style: {
    textColour: '#fff',
    textColour_highlight: '#b8180c',
    textColour_highlightOutline: '#f5a62a',
    font: 'whoopass',
    fontSize_score: '16px',
    fontSize_default: '24px',
    fontSize_bestDistance: '30px',
    fontSize_heading: '36px',
    fontSize_title: '48px',
  }
}

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
    this.timeBeforeAbduction = config[config.currentLevel]['enemyTimeBeforeAbduction'];
    this.horizontalSpeed = config[config.currentLevel]['enemySpeedHorizontal'];
    this.verticalSpeed = config[config.currentLevel]['enemySpeedVertical'];
    this.abductDistance = config['enemyAbductDistance'];
    this.difficultyIncreaseCount = 0;
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
    DontPanic.game.time.events.add(Phaser.Timer.SECOND * DontPanic.enemy.timeBeforeAbduction, this.abduct, this, enemy);
    this.checkIfImprobabilityDriveSprite(enemy);
  }

  increaseEnemySpeed() {
    DontPanic.enemy.difficultyIncreaseCount++;
    if (DontPanic.enemy.timeBeforeAbduction > 1.5) {
      DontPanic.enemy.timeBeforeAbduction -= config[config.currentLevel]['enemyDifficultyIncrease'] * 2;
    }
    if (DontPanic.enemy.horizontalSpeed < 2) {
      DontPanic.enemy.horizontalSpeed += config[config.currentLevel]['enemyDifficultyIncrease'];
    }
    if (DontPanic.enemy.verticalSpeed < 2.4) {
      DontPanic.enemy.verticalSpeed += config[config.currentLevel]['enemyDifficultyIncrease'];
    }
    if (DontPanic.enemy.difficultyIncreaseCount >= 5 && DontPanic.enemy.abductDistance > 220) {
      DontPanic.enemy.abductDistance -= config[config.currentLevel]['enemyDifficultyIncrease'] * 2;
    }
  }

  checkIfImprobabilityDriveSprite(enemy) {
    if (DontPanic.improbabilityDriveTriggered) {
    enemy.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].enemy, 0);
      if (DontPanic.improbabilityDrive.currentScenario == 'reset') {
        DontPanic.improbabilityDriveTriggered = false;
      }
    }
  }

  moveEnemy() {
    this.enemies.forEachExists((sprite) =>  {
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
      sprite.cameraOffset.x -= DontPanic.enemy.horizontalSpeed;

    } else if (sprite.x < DontPanic.player.playerSprite.x - 1){
      sprite.cameraOffset.x += DontPanic.enemy.horizontalSpeed;
    }
  }

  descend(sprite) {
    if (sprite.y < (DontPanic.player.playerSprite.y - DontPanic.enemy.abductDistance)) {
      sprite.cameraOffset.y += DontPanic.enemy.verticalSpeed;
    }
    else {
      sprite.positioned = true;
    }
  }

  leaveScreen(sprite) {
    if (sprite.x < DontPanic.player.playerSprite.x) {
      sprite.cameraOffset.x -= DontPanic.enemy.horizontalSpeed;
    } else {
      sprite.cameraOffset.x += DontPanic.enemy.horizontalSpeed;
    }
  }

  abduct(sprite) {
    console.log('abduct called');
    if (!sprite.abductCheck) {
      DontPanic.enemy.abductionSoundFail.play();
      sprite.animations.play('abduct', 20, false);
      sprite.abductAnimate.onComplete.add(() => {sprite.animations.play('beamUp', 20, false);}, this);
      sprite.abductCheck = true;
    }
  }

  abductPlayer(playerSprite, enemy) {
    if (!enemy.abductSuccessful && enemy.frame == 3) {
      DontPanic.enemy.abductionSound.play();
      DontPanic.lives.loseLife();
      DontPanic.game.camera.shake(0.005, 500);
      enemy.abductSuccessful = true;
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
    var initialCoinPositions = config[config.currentLevel]['coinInitialPositions'];
    for (var i = 0; i < initialCoinPositions.length; i++) {
      this.createCoin(initialCoinPositions[i][0], initialCoinPositions[i][1]);
    }
  }

  createCoin(x, y) {
    var x = x || randomInt(320, 5);
    var y = y || randomInt(10, -10)
    var coin = this.coins.create(x, y, 'coin');
    resizeSprite(coin, 0.3);
    coin.enableBody = true;
    coin.body.velocity.y = 100;
    coin.body.collideWorldBounds = false;
    if (DontPanic.improbabilityDriveTriggered) {
      coin.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].coins, 1);
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
    const whale = DontPanic.obstacle.obstacles.create(randomInt(200, 100), -100, 'whale');
    resizeSprite(whale, 0.3);
    addGenericPropertiesForFallingObjects(whale, 50);
    DontPanic.obstacle.obstacles.soundFall.play();
  }

  petunias() {
    const petunias = DontPanic.obstacle.obstacles.create(randomInt(320, 25), -150, 'petunias');
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
    this.extraLives = extraLives;
  }

  triggerExtraLife() {
    var extraLifeSpawnRate = config[config.currentLevel]['extraLifeSpawnRate'];
    DontPanic.game.time.events.remove(DontPanic.extraLife.extraLifeTimer);
    if (DontPanic.lives.lives.livesLeft < 4 && DontPanic.lives.lives.livesLeft > 1) {
      DontPanic.extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * extraLifeSpawnRate, DontPanic.extraLife.createExtraLife, this);
      DontPanic.extraLife.extraLifeTimer.timer.start();
    }
    if (DontPanic.lives.lives.livesLeft <= 1) {
      DontPanic.extraLife.extraLifeTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * (extraLifeSpawnRate/2), DontPanic.extraLife.createExtraLife, this);
      DontPanic.extraLife.extraLifeTimer.timer.start();
    }
  }

  createExtraLife() {
    const life = DontPanic.extraLife.extraLives.create(randomInt(320, 5), -100, 'extraLife');
    resizeSprite(life, 0.06);
    addGenericPropertiesForFallingObjects(life, 40);
  }
}

class Player {
  constructor() {
    const player = DontPanic.game.add.sprite(DontPanic.game.world.centerX, DontPanic.game.world.height - 100, `rocket_${config.playerColour}`);
    resizeSprite(player, 0.5);
    player.anchor.set(0.5, 0.5);
    DontPanic.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.setSize(65, 150, 28, 0);
    player.body.immovable = true;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.frame = 1;
    this.playerSprite = player;
  }

  handleInput() {
    this.playerSprite.body.velocity.x = 0;
    if ((DontPanic.cursors.left.isDown && !DontPanic.cursors.right.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x < DontPanic.game.world.centerX)) {
      this.moveLeft();
    }
    else if ((DontPanic.cursors.right.isDown && !DontPanic.cursors.left.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x > DontPanic.game.world.centerX)) {
      this.moveRight();
    }
    else {
      this.moveUp();
    }
  }

  moveLeft() {
    this.playerSprite.body.velocity.x = -50;
    if (this.playerSprite.angle > -45) {
      this.playerSprite.angle -= 1;
    }
    this.playerSprite.body.setSize(85, 150, 0, 20);
    this.playerSprite.frame = 2;
  }

  moveRight() {
    this.playerSprite.body.velocity.x = 50;
    if (this.playerSprite.angle < 45) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.body.setSize(85, 150, 40, 20);
    this.playerSprite.frame = 0;
  }

  moveUp() {
    this.playerSprite.body.velocity.x = 0;
    this.playerSprite.body.setSize(65, 150, 28, 0);
    if (this.playerSprite.angle > 0 ) {
      this.playerSprite.angle -= 1;
    }
    else if (this.playerSprite.angle < 0) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 1;
  }
}

class ImprobabilityDrive {
  constructor() {
    let improbabilityDrive = DontPanic.game.add.group();
    improbabilityDrive.enableBody = true;
    DontPanic.game.physics.arcade.enable(improbabilityDrive);
    improbabilityDrive.generated = false;
    this.improbabilityDrive = improbabilityDrive;
    var improbabilityDriveDelay = config[config.currentLevel]['infiniteImprobabilityDelay'];
    this.improbabilityDriveTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * improbabilityDriveDelay, this.improbabilityDriveGenerator, this);
    this.improbabilityDriveTimer.timer.start();
    this.improbabilityDrive = improbabilityDrive;
    this.currentScenario = 'reset';
  }

  improbabilityDriveGenerator() {
    if (DontPanic.improbabilityDrive.generated) {
      DontPanic.improbabilityDrive.generated = false;
    } else {
      var button_iid = this.improbabilityDrive.create(0, DontPanic.game.world.height - 75, 'red_button');
      resizeSprite(button_iid, 0.5);
      button_iid.enableBody = true;
      button_iid.body.setSize(70, 60, 0, 0);
      button_iid.body.immovable = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1,0], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.input.useHandCursor = true;
      button_iid.events.onInputDown.add(this.triggerEvent, this);
      DontPanic.improbabilityDrive.generated = true;
      button_iid.alpha = 0;
      DontPanic.game.add.tween(button_iid).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
      DontPanic.improbabilityDrive.destructionTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * config.improbabilityDriveDestruction, this.removeButton, this);
    }
  }

  removeButton() {
    eventOnLatestChildAdded(DontPanic.improbabilityDrive.improbabilityDrive.children, DontPanic.improbabilityDrive.fadeOut)
  }

  fadeOut(sprite) {
    var fadeOut = DontPanic.game.add.tween(sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
    fadeOut.onComplete.add((button)=>{button.kill();}, this);
  }

  triggerEvent(button_iid) {
    var eventTriggered = Math.random() >= config[config.currentLevel]['infiniteImprobabilityDifficulty'] ? this.randomAssets : this.randomObstacle;
    eventTriggered(button_iid);
    button_iid.kill();
  }

  randomAssets(button_iid) {
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    let improbabilityDurationTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * improbabilityDriveDuration, DontPanic.improbabilityDrive.assetReset, this);
    improbabilityDurationTimer.timer.start();
    DontPanic.improbabilityDriveTriggered = true;
    DontPanic.improbabilityDrive.currentScenario = randomInt(3, 1);
    DontPanic.improbabilityDrive.regenerateAssets();
  }

  assetReset() {
    DontPanic.improbabilityDrive.currentScenario = 'reset';
    DontPanic.improbabilityDrive.regenerateAssets();
  }

  regenerateAssets() {
    DontPanic.background.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].background);
    DontPanic.player.playerSprite.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].player, 0);
    DontPanic.enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].enemy, 0);
    });
    DontPanic.coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarioAssets[DontPanic.improbabilityDrive.currentScenario].coins);
    });
  }

  randomObstacle() {
    var obstacleTriggered = Math.random() <= 0.5 ? DontPanic.obstacle.whale : DontPanic.obstacle.petunias;
    obstacleTriggered();
  }
}

const improbabilityScenarioAssets = {
  reset: {
    player: `rocket_${config.playerColour}`, //get the right one from config
    enemy: 'enemyShip',
    background: 'background1',
    coins: 'coin',
  },
  1 : {
    player: 'IID_player1',
    enemy: 'IID_enemy1',
    background: 'IID_background1',
    coins: 'IID_teacup',
  },
  2 : {
    player: 'IID_player2',
    enemy: 'IID_enemy2',
    background: 'IID_background2',
    coins: 'IID_coin2',
  },
  3 : {
    player: 'IID_player3',
    enemy: 'IID_enemy3',
    background: 'IID_background3',
    coins: 'IID_coin3',
  }
};

var settingsText;
var settingsText__difficulty;
var settingsText__sound;
var settingsText__colour;

function mainMenu() {
    DontPanic.background = DontPanic.game.add.image(0, -40, 'home_background');
    DontPanic.startButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 120, 'startButton', startGame, this);
    DontPanic.startButton.anchor.set(0.5);
    DontPanic.settingsButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY - 60, 'settingsButton', settingsMenu, this);
    DontPanic.settingsButton.anchor.set(0.5);
}

function settingsMenu() {
    DontPanic.game.world.removeAll();
    DontPanic.game.add.image(0, 0, 'background1');
    DontPanic.settingsText = DontPanic.game.add.group();

    const currentSettings = getCurrentSettings();

    addText(DontPanic.game.world.centerX, 75, "Settings", config.style.fontSize_title, false, "", false);

    settingsText__difficulty = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 175, "Difficulty", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 220, "Easy", config.style.fontSize_default,  true, "difficulty", currentSettings.easy);
    addText(DontPanic.game.world.centerX * 1.25, 220, "Hard", config.style.fontSize_default,  true, "difficulty", !currentSettings.easy);

    settingsText__sound = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 290, "Sound", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 335, "On", config.style.fontSize_default, true, "sound", currentSettings.soundOn);
    addText(DontPanic.game.world.centerX * 1.25, 335, "Off", config.style.fontSize_default,  true, "sound", !currentSettings.soundOn);

    settingsText__colour = DontPanic.game.add.group();
    addText(DontPanic.game.world.centerX, 405, "Ship Colour", config.style.fontSize_heading);
    addText(DontPanic.game.world.centerX * 0.75, 450, "Red", config.style.fontSize_default, true, "colour", currentSettings.red);
    addText(DontPanic.game.world.centerX * 1.25, 450, "Blue", config.style.fontSize_default, true, "colour", !currentSettings.red);

    addText(DontPanic.game.world.centerX, 550, "Play", config.style.fontSize_default, true, "play");

    DontPanic.settingsText.add(settingsText__difficulty);
    DontPanic.settingsText.add(settingsText__sound);
    DontPanic.settingsText.add(settingsText__colour);
}

function addText(x, y, string, size, clickevent, category, selected) {
  var textOb = DontPanic.game.add.text(x, y, string, {
    font: `${size} ${config.style.font}`,
  });
  textOb.anchor.setTo(0.5);
  textOb.align = 'center';
  textOb.fill = config.style.textColour;
  textOb.fontSize = size;
  textOb.padding.set(16, 16);
  textOb.inputEnabled = true;
  textOb.input.useHandCursor = clickevent;
  addCategorySpecifics(textOb, category);
  if (selected) {
    colourText(textOb);
  }
  return textOb;
}

function addCategorySpecifics(textOb, category) {
  switch (category) {
    case "difficulty":
      settingsText__difficulty.add(textOb);
      textOb.events.onInputDown.add(difficultyListener, this);
      break;
    case "sound":
      settingsText__sound.add(textOb);
      textOb.events.onInputDown.add(soundListener, this);
      break;
    case "colour":
      settingsText__colour.add(textOb);
      textOb.events.onInputDown.add(colourListener, this);
      break;
    case "play":
      DontPanic.settingsText.add(textOb);
      textOb.events.onInputDown.add(startGame, this);
      break;
    default: ;
  }
}

function difficultyListener(input) {
  let previousSelection = config.currentLevel;
  config.currentLevel = input["_text"].toLowerCase();
  if (config.currentLevel != previousSelection) {
    for (var i = 0; i < settingsText__difficulty.children.length; i++) {
      colourText(settingsText__difficulty.children[i]);
    }
  }
  getCurrentSettings();
}

function soundListener(input) {
  let previousSelection = config.soundOn;
  config.soundOn = (input["_text"].toLowerCase() == "on") ?  true : false;
  if (config.soundOn != previousSelection) {
    for (var i = 0; i < settingsText__sound.children.length; i++) {
      colourText(settingsText__sound.children[i]);
    }
  }
  getCurrentSettings();
}

function colourListener(input) {
  let previousSelection = config.playerColour;
  config.playerColour = input["_text"].toLowerCase();
  if (config.playerColour != previousSelection) {
    for (var i = 0; i < settingsText__colour.children.length; i++) {
      colourText(settingsText__colour.children[i]);
    }
  }
  getCurrentSettings();
}

function getCurrentSettings() {
  const currentSettings = {};
  currentSettings["easy"] = (config.currentLevel == "easy") ?  true : false;
  currentSettings["soundOn"] = config.soundOn;
  currentSettings["red"] = (config.playerColour == "red") ?  true : false;
  return currentSettings;
}

function colourText(text) {
  if (text['style']['fill'] == config.style.textColour_highlight) {
    text.fill = config.style.textColour;
    text.strokeThickness = 0;
  } else {
    text.fill = config.style.textColour_highlight;
    text.stroke = config.style.textColour_highlightOutline;
    text.strokeThickness = 3;
  }
}

function playAgainMenu() {
  DontPanic.game.gameOver.kill();
  DontPanic.game.camera.resetFX();
  DontPanic.playAgain = DontPanic.game.add.group();
  const restartButton = DontPanic.game.add.button(DontPanic.game.world.centerX, DontPanic.game.world.centerY, 'playAgainButton', startGame, this);
  restartButton.anchor.set(0.5);
  const settingsButton = DontPanic.settingsButton;
  settingsButton.y = DontPanic.game.world.centerY + 100;
  DontPanic.playAgain.add(restartButton);
  DontPanic.playAgain.add(settingsButton);
  if (DontPanic.newBestScore) {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `New Best Distance!!\n${DontPanic.bestDistance}`, config.style.fontSize_bestDistance);
  } else {
    const bestDistanceText = addText(DontPanic.game.world.centerX, 190, `Best Distance: ${DontPanic.bestDistance}`, config.style.fontSize_bestDistance);
  }
  DontPanic.pauseButton.kill();
}

function pauseMenu() {
  if (!DontPanic.game.paused) {
    DontPanic.game.paused = true;
    DontPanic.paused = DontPanic.game.add.group();
    const pausedText = addText(DontPanic.game.world.centerX, 190, 'Paused', config.style.fontSize_title);
    const settingsButton = DontPanic.settingsButton;
    settingsButton.y = DontPanic.game.world.centerY;
    DontPanic.paused.add(pausedText);
    DontPanic.paused.add(settingsButton);
    DontPanic.pauseButton.loadTexture('playIcon');
  } else {
    DontPanic.paused.kill();
    DontPanic.game.paused = false;
    DontPanic.pauseButton.loadTexture('pauseIcon');
  }
}

function randomInt(max, min) {
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resizeSprite(sprite, factor) {
  sprite.scale.x = factor;
  sprite.scale.y = factor;
}

function addGenericPropertiesForFallingObjects(entity, gravity) {
  DontPanic.game.physics.arcade.enable(entity);
  entity.body.collideWorldBounds = false;
  entity.body.gravity.y = gravity;
}

function eventOnLatestChildAdded(children, callback) {
  var triggered = false;
  for (var i = children.length - 1; i >= 0 ; i--) {
    if (children[i].alive && !triggered) {
      callback(children[i]);
      triggered = true;
    }
  }
}

function disableButtons(button) {
  button.input.stop();
}

function createUI() {
  DontPanic.lives = new LivesScore();
  DontPanic.coinScore = new CoinScore();
  DontPanic.distance = new DistanceScore();
  pauseButton();
}

function pauseButton() {
  DontPanic.pauseButton = DontPanic.game.add.button(DontPanic.game.world.width - 30, DontPanic.game.world.height - 30, 'pauseIcon', pauseMenu, this);
  DontPanic.pauseButton.input.useHandCursor = true;
}

function addSound() {
  if (config.soundOn) {
    DontPanic.backgroundMusic = backgroundMusic();
  } else {
    DontPanic.game.sound.mute = true;
  }
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
    if (DontPanic.lives.lives.livesLeft < 4) {
      DontPanic.lives.lives.livesLeft += 1;
      DontPanic.lives.createHeart(DontPanic.lives.lives.livesLeft - 2);
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
    DontPanic.coinTotal = '0';
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
    if (DontPanic.currentDistance % config[config.currentLevel]['enemyDifficultyIncreaseInterval'] == 0) {
      DontPanic.enemy.increaseEnemySpeed();
    }
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
