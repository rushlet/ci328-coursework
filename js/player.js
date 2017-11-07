class Player {
  constructor() {
    const player = game.add.sprite(game.world.width/2 - 16, game.world.height - 50, 'rocket');
    player.scale.x = 0.5;
    player.scale.y = 0.5;
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.frame = 1;
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
    this.playerSprite.body.velocity.x = -50;
    this.playerSprite.body.velocity.y = -50;
    fuelbar.reduceFuel(0.05);
    if (this.playerSprite.angle > -45) {
      this.playerSprite.angle -= 1;
    }
    this.playerSprite.frame = 2;
  }

  moveRight() {
    this.playerSprite.body.velocity.x = 50;
    this.playerSprite.body.velocity.y = -50;
    fuelbar.reduceFuel(0.05);
    if (this.playerSprite.angle < 45) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 0;
  }

  moveUp() {
    this.playerSprite.body.velocity.x = 0;
    this.playerSprite.body.velocity.y = -75;
    fuelbar.reduceFuel(0.075);
    if (this.playerSprite.angle > 0 ) {
      this.playerSprite.angle -= 1;
    }
    else if (this.playerSprite.angle < 0) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 1;
  }

  moveDown() {
    this.playerSprite.body.velocity.y = 50;
    this.playerSprite.frame = 3;
  }
}
