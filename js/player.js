class Player {
  constructor() {
    const player = DontPanic.game.add.sprite(DontPanic.game.world.centerX, DontPanic.game.world.height - 100, `rocket_${config.playerColour}`);
    resizeSprite(player, 0.5);
    player.anchor.set(0.5, 0.5);
    DontPanic.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.setSize(65, 150, 28, 0);
    player.body.immovable = true;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.frame = 1;
    this.playerSprite = player;
  }

  handleInput() {
    this.playerSprite.body.velocity.x = 0;
    if ((DontPanic.cursors.left.isDown && !DontPanic.cursors.right.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x < DontPanic.game.world.centerX)) {
      this.moveLeft();
    }
    else if ((DontPanic.cursors.right.isDown && !DontPanic.cursors.left.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x > DontPanic.game.world.centerX)) {
      this.moveRight();
    }
    else {
      this.moveUp();
    }
  }

  moveLeft() {
    this.playerSprite.body.velocity.x = -50;
    if (this.playerSprite.angle > -45) {
      this.playerSprite.angle -= 1;
    }
    this.playerSprite.body.setSize(85, 150, 0, 20);
    this.playerSprite.frame = 2;
  }

  moveRight() {
    this.playerSprite.body.velocity.x = 50;
    if (this.playerSprite.angle < 45) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.body.setSize(85, 150, 40, 20);
    this.playerSprite.frame = 0;
  }

  moveUp() {
    this.playerSprite.body.velocity.x = 0;
    this.playerSprite.body.setSize(65, 150, 28, 0);
    if (this.playerSprite.angle > 0 ) {
      this.playerSprite.angle -= 1;
    }
    else if (this.playerSprite.angle < 0) {
      this.playerSprite.angle += 1;
    }
    this.playerSprite.frame = 1;
  }
}
