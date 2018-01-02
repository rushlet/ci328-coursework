class Player {
  constructor() {
    const player = DontPanic.game.add.sprite(DontPanic.game.world.centerX, DontPanic.game.world.height - 100, `rocket_${config.playerColour}`);
    player.scale.x = 0.5;
    player.scale.y = 0.5;
    player.anchor.set(0.5, 0.5);
    DontPanic.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.setSize(65, 150, 28, 0);
    player.body.immovable = true;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.frame = 1;
    player.lifeLostAnimate = player.animations.add('lifeLost', [4,1,4,1,4]);
    this.playerSprite = player;
  }

  handleInput() {
    // DontPanic.game.debug.body(this.playerSprite);
    this.playerSprite.body.velocity.x = 0;
    if ((cursors.left.isDown && !cursors.right.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x < DontPanic.game.world.centerX)) {
      this.moveLeft();
    }
    else if ((cursors.right.isDown && !cursors.left.isDown) || (DontPanic.game.input.pointer1.isDown && DontPanic.game.input.pointer1.x > DontPanic.game.world.centerX)) {
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

  loseLifeFlash(playerSprite) {
    playerSprite.frame = 0;
    console.log(this.playerSprite);
    console.log('animation called');
    // playerSprite.animations.play('lifeLost', 20, true);
    // playerSprite.lifeLostAnimate.onComplete.add(() => {DontPanic.game.pause = true});
  }
}
