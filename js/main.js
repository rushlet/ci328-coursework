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
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  player = new Player();
}

function update() {
  player.handleInput();
}
