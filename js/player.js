class Player {
  constructor() {
    const player = game.add.sprite(game.world.width/2 - 16, game.world.height - 50, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.frame = 4;

    this.playerSprite = player;
  }

  handleInput() {
      this.playerSprite.body.velocity.x = 0;
      if (cursors.left.isDown && !cursors.right.isDown) {
        this.moveLeft();
      }
      else if (cursors.right.isDown && !cursors.left.isDown) {
        this.moveRight();
      }
      else if (cursors.right.isDown && cursors.left.isDown) {
        this.moveUp();
      }
      else if (!cursors.right.isDown && !cursors.left.isDown) {
        this.moveDown();
      }
  }

  moveLeft() {
    this.playerSprite.body.velocity.x = -45;
    this.playerSprite.body.velocity.y = -50;
  }

  moveRight() {
    this.playerSprite.body.velocity.x = 45;
    this.playerSprite.body.velocity.y = -50;
  }

  moveUp() {
    this.playerSprite.body.velocity.x = 0;
    this.playerSprite.body.velocity.y = -70;
  }

  moveDown() {
    this.playerSprite.body.velocity.y = 50;
  }
}
