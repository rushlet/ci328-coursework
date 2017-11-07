class Enemy {
  constructor() {
    const enemy = game.add.sprite(-200, game.world.height - 550, 'enemyShip');
    enemy.scale.x = 0.2;
    enemy.scale.y = 0.2;
    game.physics.arcade.enable(enemy);
    enemy.body.velocity.x = 40;
    enemy.body.collideWorldBounds = false;
    this.enemySprite = enemy;
  }
  
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

class Earth {

}
