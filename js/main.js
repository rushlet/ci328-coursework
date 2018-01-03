let DontPanic = {};
DontPanic.coinTotal = localStorage['coinTotal'] || '0';
DontPanic.currentDistance;
DontPanic.bestDistance = localStorage['bestDistance'] || '0';
DontPanic.improbabilityDriveTriggered = false;
DontPanic.newBestScore = false;

function init() {
  const gameWidth = 360;
  const gameHeight = 600;
  DontPanic.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameWindow', {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
  loadMainImages();
  loadAudio();
  loadImprobabilityDriveImages();
}

function create() {
  DontPanic.game.world.setBounds(0, 0, 360, 600);
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
  DontPanic.gameStarted = true;
  DontPanic.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
  DontPanic.background.autoScroll(0, 50);
  createEntities();
  createUI();
  loadSound();
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
