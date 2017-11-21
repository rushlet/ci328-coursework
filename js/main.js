let DontPanic = {};
let player;
let whale;
let enemy;
let fuelbar;
let gameStarted = false;

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
    DontPanic.game.load.image('startButton', 'assets/button_start.png'); // placeholders for now
    DontPanic.game.load.image('settingsButton', 'assets/button_settings.png'); // placeholders for now
    DontPanic.game.load.spritesheet('rocket', 'assets/rocket_spritesheet_attempt.png', 115, 175);
    DontPanic.game.load.image('whale', 'assets/whale.png');
    DontPanic.game.load.image('enemyShip', 'assets/enemy_ship_placeholder.jpg');
    DontPanic.game.load.image('fuelbar', 'assets/fuelbar_placeholder.jpg');
}

function create() {
  DontPanic.game.world.setBounds(0, 0, 360, 600);
  cursors = DontPanic.game.input.keyboard.createCursorKeys();
  menu = new MainMenu();
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
  background = new Background();
  player = new Player();
  whale = new Whale();
  enemy = new Enemy();
  fuelbar = new FuelBar();
}

function handleCollision() {
  DontPanic.game.physics.arcade.overlap(player.playerSprite, whale.whaleSprite, obstacleCollision, null, this);
}

function obstacleCollision() {
  console.log('called');
  player.playerSprite.kill();
  DontPanic.game.gameOver = DontPanic.game.add.text(20, DontPanic.game.camera.view.y + (DontPanic.game.height / 2), 'GAME OVER', { fontSize: '32px', fill: '#fff' });
}
