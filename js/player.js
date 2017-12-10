class Player {
  constructor() {
    const player = DontPanic.game.add.sprite(DontPanic.game.world.width/2 - 16, DontPanic.game.world.height - 100, `rocket_${config.playerColour}`);
    player.scale.x = 0.5;
    player.scale.y = 0.5;
    player.anchor.set(0.5, 0.2);
    DontPanic.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
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
      else {
        this.moveUp();
      }

      if (DontPanic.game.input.pointer1.isDown) {
        console.log('pointer down!!');
      }
  }

  moveLeft() {
    this.playerSprite.body.velocity.x = -50;
    if (this.playerSprite.angle > -45) {
      this.playerSprite.angle -= 1;
    }
    this.playerSprite.frame = 2;
  }

  moveRight() {
    this.playerSprite.body.velocity.x = 50;
    if (this.playerSprite.angle < 45) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 0;
  }

  moveUp() {
    this.playerSprite.body.velocity.x = 0;
    if (this.playerSprite.angle > 0 ) {
      this.playerSprite.angle -= 1;
    }
    else if (this.playerSprite.angle < 0) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 1;
  }
}
