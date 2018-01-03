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
  DontPanic.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/LightBeam.js');
  DontPanic.game.load.image('background1', 'assets/space_background.png');
  DontPanic.game.load.image('home_background', 'assets/game_screen.jpg');
  DontPanic.game.load.image('startButton', 'assets/button_start.png'); // placeholders for now
  DontPanic.game.load.image('settingsButton', 'assets/button_settings.png'); // placeholders for now
  DontPanic.game.load.image('playAgainButton', 'assets/button_play-again.png'); // placeholders for now
  DontPanic.game.load.spritesheet('rocket_red', 'assets/rocket_spritesheet1.png', 115, 175);
  DontPanic.game.load.spritesheet('rocket_blue', 'assets/rocket_spritesheet_blue1.png', 115, 175);
  DontPanic.game.load.spritesheet('enemyShip', 'assets/enemy_ship_spritesheet1.png', 440, 1140);
  DontPanic.game.load.image('heart', 'assets/life.png');
  DontPanic.game.load.image('enemyBullet', 'assets/enemy-bullet.png'); //placeholder
  DontPanic.game.load.image('coin', 'assets/coin_2.png');
  DontPanic.game.load.image('extraLife', 'assets/extra_life.png');

  DontPanic.game.load.audio('coinPing', 'assets/audio/coin_collection.wav');
  DontPanic.game.load.audio('backgroundMusic', 'assets/audio/background_music.wav');
  DontPanic.game.load.audio('abduction', 'assets/audio/abduction.wav');
  DontPanic.game.load.audio('abductionFail', 'assets/audio/abduction-fail.wav');
  DontPanic.game.load.audio('lifePing', 'assets/audio/extra-life.mp3');
  DontPanic.game.load.audio('obstacleWhoosh', 'assets/audio/obstacle-fall.mp3');
  DontPanic.game.load.audio('obstacleCollision', 'assets/audio/obstacle-collision.wav');
  DontPanic.game.load.audio('gameOver', 'assets/audio/game-over.wav');

  DontPanic.game.load.spritesheet('red_button', 'assets/iid/iid-button1.png', 304, 275);
  DontPanic.game.load.image('IID_background1', 'assets/iid/iid_bg.png');
  DontPanic.game.load.spritesheet('IID_enemy1', 'assets/iid/iid_enemy1.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player1', 'assets/iid/iid_player1.png', 115, 175);
  DontPanic.game.load.image('IID_teacup', 'assets/iid/tea.png');
  DontPanic.game.load.image('whale', 'assets/iid/whale.png');
  DontPanic.game.load.image('petunias', 'assets/iid/flowers.png');
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
  DontPanic.player = new Player();
  DontPanic.enemy = new Enemy();
  DontPanic.coins = new Coins();
  DontPanic.lives = new LivesScore();
  DontPanic.coinScore = new CoinScore();
  DontPanic.distanceScore = new DistanceScore();
  DontPanic.improbabilityDrive = new ImprobabilityDrive();
  DontPanic.obstacle = new Obstacle();
  DontPanic.extraLife = new ExtraLife();
  if (config.soundOn) {
    DontPanic.backgroundMusic = new BackgroundMusic();
  } else {
    DontPanic.game.sound.mute = true;
  }
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


function removeAllEntities() {
  DontPanic.player.playerSprite.kill();
  DontPanic.enemy.enemies.kill();
  DontPanic.coins.coins.kill();
  DontPanic.obstacle.obstacles.kill();
  DontPanic.improbabilityDrive.improbabilityDrive.kill();
  DontPanic.extraLife.extraLives.kill();
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
