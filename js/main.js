let DontPanic = {};
let player;
let whale;
let enemy;
let fuelbar;
let background;
let gameStarted = false;
let coinTotal = localStorage['coinTotal'] || '0';
let currentDistance;
let bestDistance = localStorage['bestDistance'] || '0';

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
    DontPanic.game.load.image('background1', 'assets/space_background.png');
    DontPanic.game.load.image('home_background', 'assets/game_screen.jpg');
    DontPanic.game.load.image('startButton', 'assets/button_start.png'); // placeholders for now
    DontPanic.game.load.image('settingsButton', 'assets/button_settings.png'); // placeholders for now
    DontPanic.game.load.image('playAgainButton', 'assets/button_play-again.png'); // placeholders for now
    DontPanic.game.load.spritesheet('rocket', 'assets/rocket_spritesheet_attempt.png', 115, 175);
    DontPanic.game.load.image('whale', 'assets/whale.png');
    DontPanic.game.load.spritesheet('enemyShip', 'assets/enemy_ship_spritesheet.png', 440, 1181);
    DontPanic.game.load.image('heart', 'assets/life.png');
    DontPanic.game.load.image('enemyBullet', 'assets/enemy-bullet.png') //placeholder
    DontPanic.game.load.image('coin', 'assets/coin_2.png')
}

function create() {
  DontPanic.game.world.setBounds(0, 0, 360, 600);
  cursors = DontPanic.game.input.keyboard.createCursorKeys();
  menu = new MainMenu();
  console.log(config[config.currentLevel]['coinSpawnRate']);
  // DontPanic.game.camera.follow(player.playerSprite, Phaser.Camera.LO);
}

function update() {
  if (gameStarted) {
    player.handleInput();
    handleCollision();
    enemy.moveEnemy();
  }
  // game.debug.cameraInfo(game.camera, 32, 32);
}

function startGame() {
  gameStarted = true;
  background = this.background = DontPanic.game.add.tileSprite(0, 0, DontPanic.game.width, DontPanic.game.height, 'background1');
  player = new Player();
  whale = new Whale();
  enemy = new Enemy();
  coins = new Coins();
  lives = new Lives();
  coinScore = new CoinScore();
  distanceScore = new DistanceScore();
  // DontPanic.game.camera.follow(player.playerSprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function handleCollision() {
  DontPanic.game.physics.arcade.overlap(player.playerSprite, whale.whaleSprite, obstacleCollision, null, this);
  DontPanic.game.physics.arcade.overlap(player.playerSprite, coins.coins, collectCoin, null, this);
  DontPanic.game.physics.arcade.overlap(player.playerSprite, enemy.enemySprite, collectCoin, null, this);
}

function obstacleCollision() {
  player.playerSprite.kill();
  gameOver();
}

function collectCoin(player, coin) {
  coin.kill();
  coinScore.addToCoinScore()
}

function abductPlayer(player, coin) {
  console.log('abduct!');
}

function stopGameAssetGeneration() {
  coins.coinTimer.timer.stop();
}

function gameOver() {
  player.playerSprite.kill();
  DontPanic.game.gameOver = DontPanic.game.add.text(20, DontPanic.game.camera.view.y + (DontPanic.game.height / 2), 'GAME OVER', { fontSize: '32px', fill: '#fff' });
  DontPanic.game.camera.fade(0x0000000, 4000); // https://phaser.io/examples/v2/camera/camera-fade
  DontPanic.game.camera.onFadeComplete.add(playAgainMenu, this);
  gameStarted = false;
  stopGameAssetGeneration();
  if (currentDistance > parseInt(bestDistance)) {
    localStorage['bestDistance'] = currentDistance.toString();
  }
}
