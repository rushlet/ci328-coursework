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
  loadSound();
}

function handleCollision() {
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.coins.coins, collectCoin, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.enemy.enemies, abductPlayer, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.obstacle.obstacles, obstacleCollision, null, this);
  DontPanic.game.physics.arcade.overlap(DontPanic.player.playerSprite, DontPanic.extraLife.extraLives, gainLife, null, this);
}

function gainLife(player, life) {
  DontPanic.extraLife.extraLives.collection.play();
  life.kill();
  DontPanic.lives.gainLife();
}

function obstacleCollision() {
  DontPanic.obstacle.obstacles.soundFall.stop();
  DontPanic.obstacle.obstacles.soundCollide.play();
  DontPanic.player.playerSprite.kill();
  DontPanic.lives.loseAllLives();
  gameOver();
}

function collectCoin(player, coin) {
  DontPanic.coins.coins.collection.play();
  coin.kill();
  DontPanic.coinScore.addToCoinScore()
}

function abductPlayer(playerSprite, vogon) {
  if (!vogon.abductSuccessful && vogon.frame == 3) {
    DontPanic.enemy.abductionSound.play();
    DontPanic.lives.loseLife();
    DontPanic.game.camera.shake(0.005, 500);
    vogon.abductSuccessful = true;
  }
}

function stopGameAssetGeneration() {
  DontPanic.coins.coinTimer.timer.stop();
  DontPanic.enemy.enemyTimer.timer.stop();
}

function gameOver() {
  DontPanic.backgroundMusic.backgroundMusic.fadeOut(1000);
  DontPanic.gameOverSound = DontPanic.game.add.audio('gameOver');
  DontPanic.gameOverSound.play();
  DontPanic.distanceScore.distanceTimer.timer.stop();
  checkBestDistance();
  DontPanic.game.gameOver = DontPanic.game.add.text(DontPanic.game.world.centerX, DontPanic.game.world.centerY * 0.75, 'GAME OVER', { font: '40px whoopass', fill: '#fff' });
  DontPanic.game.gameOver.anchor.setTo(0.5);
  DontPanic.game.camera.fade(0x0000000, 3000);
  DontPanic.game.camera.onFadeComplete.add(playAgainMenu, this);
  DontPanic.background.stopScroll();
  removeAllEntities();
  stopGameAssetGeneration();
  DontPanic.gameStarted = false;
}

function checkBestDistance() {
  if (DontPanic.currentDistance > parseInt(DontPanic.bestDistance)) {
    localStorage['bestDistance'] = DontPanic.currentDistance.toString();
    DontPanic.bestDistance = localStorage['bestDistance'];
    DontPanic.newBestScore = true;
  }
}
