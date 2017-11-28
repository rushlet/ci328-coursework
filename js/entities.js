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
    // if (player.playerSprite.cameraOffset.x > this.enemySprite.cameraOffset.x && this.enemySprite.cameraOffset.x > 3) {
    //   this.shoot();
    // }
  }

  // shoot() {
  //   console.log('shoot called');
  //   let enemyBullet = EnemyBullets.bullets.getFirstExists(false);
  //   let shooter = this.enemySprite;
  //       // And fire the bullet from this enemy
  //   enemyBullet.reset(shooter.body.x, shooter.body.y);
  //   DontPanic.game.physics.arcade.moveToObject(enemyBullet, player, 120);
  // }
}

// class EnemyBullets {
//   constructor() {
//     console.log('bullets initialised');
//     let bullets = DontPanic.game.add.group();
//     bullets.enableBody = true;
//     bullets.physicsBodyType = Phaser.Physics.ARCADE;
//     bullets.createMultiple(5, 'enemyBullet');
//     bullets.setAll('anchor.x', 0.5);
//     bullets.setAll('anchor.y', 1);
//     bullets.setAll('outOfBoundsKill', true);
//     bullets.setAll('checkWorldBounds', true);
//     this.bullets = bullets;
//   }
// }

class Whale {
  constructor() {
    let randomHeight = (Math.floor(Math.random() * 5000) + 500)
    const whale = DontPanic.game.add.sprite(DontPanic.game.world.width/2 - 16, -(randomHeight), 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    DontPanic.game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = randomHeight / 100;
    this.whaleSprite = whale;
  }
}

class Petunias {
}

class Earth {

}

class Fueltanks {

}

class Coins {
  constructor() {
    let coins = DontPanic.game.add.group();
    coins.scale.x = 0.1;
    coins.scale.y = 0.1;
    coins.enableBody = true;

    for (var i = 0; i < 50; i++)
    {
      coins.randomX = Math.floor(Math.random() * 2500) + 5;
      coins.randomY = Math.floor(Math.random() * 3000) + 1;
      console.log(coins.randomX, coins.randomY);
      var coin = coins.create(coins.randomX, coins.randomY, 'coin');
      coin.body.collideWorldBounds = false;
      coin.body.gravity.y = 10;
    }
  }
}
