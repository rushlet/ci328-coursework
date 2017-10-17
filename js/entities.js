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
    const whale = game.add.sprite(game.world.width/2 - 16, -550, 'firstAid');
    game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = 20;
    whale.body.collideWorldBounds = false;

    this.whaleSprite = whale;
  }
}

class Petunias {
}
