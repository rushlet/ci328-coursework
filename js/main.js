let DontPanic = {};
let player;
let whale;
let petunias;
let enemy;
let fuelbar;
let background;
let gameStarted = false;
let coinTotal = localStorage['coinTotal'] || '0';
let currentDistance;
let bestDistance = localStorage['bestDistance'] || '0';
let filter;
let improbabilityDrive;
let improbabilityDriveTriggered = false;

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
  DontPanic.game.load.spritesheet('red_button', 'assets/iid-button.png', 472, 472);
  DontPanic.game.load.image('heart', 'assets/life.png');
  DontPanic.game.load.image('enemyBullet', 'assets/enemy-bullet.png'); //placeholder
  DontPanic.game.load.image('coin', 'assets/coin_2.png');

  DontPanic.game.load.image('IID_background1', 'assets/iid/iid_bg.png');
  DontPanic.game.load.spritesheet('IID_enemy1', 'assets/iid/iid_enemy1.png', 440, 1140);
  DontPanic.game.load.spritesheet('IID_player1', 'assets/iid/iid_player1.png', 115, 175);
  DontPanic.game.load.image('IID_teacup', 'assets/iid/tea.png');
  DontPanic.game.load.image('whale', 'assets/iid/whale.png');
  DontPanic.game.load.image('petunias', 'assets/iid/flowers.png');
}

function create() {
  DontPanic.game.world.setBounds(0, 0, 360, 600);
  // DontPanic.game.physics.startSystem(Phaser.Physics.P2JS); //may need to swap to p2 system for better collision areas
  cursors = DontPanic.game.input.keyboard.createCursorKeys();
  mainMenu();
  console.log(config[config.currentLevel]['coinSpawnRate']);
  // DontPanic.game.camera.follow(player.playerSprite, Phaser.Camera.LO);
}

function update() {
  if (gameStarted) {
    player.handleInput();
    handleCollision();
    enemy.moveEnemy();
    // DontPanic.game.debug.spriteBounds(player);
  }
  // game.debug.cameraInfo(game.camera, 32, 32);
}

function startGame() {
  gameStarted = true;
  background = new Background();
  player = new Player();
  enemy = new Enemy();
  coins = new Coins();
  lives = new Lives();
  coinScore = new CoinScore();
  distanceScore = new DistanceScore();
  improbabilityDrive = new ImprobabilityDrive();
  // DontPanic.game.camera.follow(player.playerSprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function handleCollision() {
  DontPanic.game.physics.arcade.overlap(player.playerSprite, coins.coins, collectCoin, null, this);
  DontPanic.game.physics.arcade.overlap(player.playerSprite, enemy.enemies, abductPlayer, null, this);
  if (whale) {
    DontPanic.game.physics.arcade.overlap(player.playerSprite, whale.whaleSprite, obstacleCollision, null, this);
  }
  if (petunias) {
    DontPanic.game.physics.arcade.overlap(player.playerSprite, petunias.petuniasSprite, obstacleCollision, null, this);
  }
}

function obstacleCollision() {
  player.playerSprite.kill();
  gameOver();
}

function collectCoin(player, coin) {
  coin.kill();
  coinScore.addToCoinScore()
}

function abductPlayer(playerSprite, vogon) {
  console.log('abducting');
  if (!vogon.abductSuccessful && vogon.frame == 3) {
    console.log(lives.lives.livesLeft);
    // vogon.kill(); // this needs to be something else - doesn't look good to just disappear.
    lives.loseLife();
    // make player animation flash
    playerSprite.play('lifeLost');
    vogon.abductSuccessful = true;
    // pause game assets for a sec?
    // DontPanic.game.paused = true;
  }
}

function stopGameAssetGeneration() {
  coins.coinTimer.timer.stop();
  enemy.enemyTimer.timer.stop();
}

function gameOver() {
  player.playerSprite.kill();
  DontPanic.game.gameOver = DontPanic.game.add.text(DontPanic.game.world.centerX, DontPanic.game.world.centerY * 0.75, 'GAME OVER', { font: '40px whoopass', fill: '#fff' });
  DontPanic.game.gameOver.anchor.setTo(0.5);
  DontPanic.game.camera.fade(0x0000000, 4000); // https://phaser.io/examples/v2/camera/camera-fade
  DontPanic.game.camera.onFadeComplete.add(playAgainMenu, this);
  gameStarted = false;
  stopGameAssetGeneration();
  if (currentDistance > parseInt(bestDistance)) {
    localStorage['bestDistance'] = currentDistance.toString();
  }
}
