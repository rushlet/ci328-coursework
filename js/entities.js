class Enemy {
  constructor() {
    let enemy;
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = false;
  }
}

class Obstacle {
  constructor() {
    let obstacle;
    game.physics.arcade.enable(obstacle);
    enemy.body.collideWorldBounds = false;
  }
}

class Vogon {
}

class Whale {
  constructor() {
    const whale = game.add.sprite(game.world.width/2 - 16, -350, 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = 20;
    whale.body.velocity.y = 10;
    this.whaleSprite = whale;
  }
}

class Petunias {
}
