let game;
let player;

function init() {
  const gameWidth = 360;
  const gameHeight = 600;
  game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameWindow', {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
    game.load.image('background1', 'assets/space_background.png');
    game.load.spritesheet('rocket', 'assets/rocket_spritesheet_attempt.png', 115, 175);
    game.load.image('whale', 'assets/whale.png');
}

function create() {
  game.world.setBounds(0, 0, 360, 2400);
  cursors = game.input.keyboard.createCursorKeys();
  background = new Background();
  player = new Player();
  whale = new Whale();
  game.camera.follow(player.playerSprite, Phaser.Camera.LOCKON);
}

function update() {
  player.handleInput();
  handleCollision();
  game.debug.cameraInfo(game.camera, 32, 32);
}

function handleCollision() {
  game.physics.arcade.overlap(player.playerSprite, whale.whaleSprite, obstacleCollision, null, this);
}

function obstacleCollision() {
  console.log('called');
  player.playerSprite.kill();
  game.gameOver = game.add.text(20, game.camera.view.y + (game.height / 2), 'GAME OVER', { fontSize: '32px', fill: '#fff' });
}
