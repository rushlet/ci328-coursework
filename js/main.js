let game;

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

  player = game.add.sprite(game.world.width/2 - 16, game.world.height - 50, 'dude');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
}

function update() {
  movePlayer();
}

function movePlayer() {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.frame = 4;

    if (cursors.left.isDown && !cursors.right.isDown) {
        player.body.velocity.x = -45;
        player.body.velocity.y = -50;
    }
    else if (cursors.right.isDown && !cursors.left.isDown) {
      player.body.velocity.x = 45;
      player.body.velocity.y = -50;
    }
    else if (cursors.right.isDown && cursors.left.isDown) {
      player.body.velocity.x = 0;
      player.body.velocity.y = -70;
    }
    else {
        player.body.velocity.y = 0;
        player.body.gravity.y = 500;
    }
}
