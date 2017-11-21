class Enemy {
  constructor() {
    const enemy = DontPanic.game.add.sprite(-10, 20, 'enemyShip');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    enemy.fixedToCamera = true;
    DontPanic.game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = false;
    this.enemySprite = enemy;
  }

  moveEnemy() {
    this.enemySprite.cameraOffset.x += 1;
  }

}

class Whale {
  constructor() {
    const whale = DontPanic.game.add.sprite(DontPanic.game.world.width/2 - 16, -350, 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    DontPanic.game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = 20;
    whale.body.velocity.y = 10;
    this.whaleSprite = whale;
  }
}

class Petunias {
}

class Earth {

}

class Fueltanks {

}
