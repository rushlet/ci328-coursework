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
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.image('firstAid', 'assets/firstaid.png');
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  player = new Player();
  whale = new Whale();
}

function update() {
  player.handleInput();
  handleCollision();
}

function handleCollision() {
  game.physics.arcade.overlap(player.playerSprite, whale.whaleSprite, obstacleCollision, null, this);
}

function obstacleCollision() {
  console.log('called');
  player.playerSprite.kill();
  game.gameOver = game.add.text(game.world.width / 3, game.world.height / 2, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
}
