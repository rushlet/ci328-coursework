var currentScenario = 'reset';

class ImprobabilityDrive {
  constructor() {
    let improbabilityDrive = DontPanic.game.add.group();
    improbabilityDrive.enableBody = true;
    DontPanic.game.physics.arcade.enable(improbabilityDrive);
    improbabilityDrive.scale.x = 0.5;
    improbabilityDrive.scale.y = 0.5;
    improbabilityDrive.generated = false;
    this.improbabilityDrive = improbabilityDrive;
    var improbabilityDriveDelay = config[config.currentLevel]['infiniteImprobabilityDelay'];
    this.improbabilityDriveTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * improbabilityDriveDelay, this.improbabilityDriveGenerator, this);
    this.improbabilityDriveTimer.timer.start();
    this.improbabilityDrive = improbabilityDrive;
  }

  improbabilityDriveGenerator() {
    if (improbabilityDrive.generated == true) {
      improbabilityDrive.generated = false;
    } else {
      var button_iid = this.improbabilityDrive.create(DontPanic.game.world.centerX/5, 1050, 'red_button');
      button_iid.scale.x = 0.3;
      button_iid.scale.y = 0.3;
      button_iid.enableBody = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1,0], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.events.onInputDown.add(this.triggerEvent, this);
      DontPanic.game.debug.body(button_iid);
      improbabilityDrive.generated = true;
    }
  }

  //could call either regenerate assets or trigger another event (whale?)
  triggerEvent(button_iid){
    var eventTriggered = Math.random() <= 0.5 ? this.regenerateAssets : this.randomObstacle;
    console.log(this);
    let that = this;
    eventTriggered(button_iid);
    button_iid.kill();
  }

  regenerateAssets(button_iid) {
    console.log('iid triggered');
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    let improbabilityDurationTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * improbabilityDriveDuration, improbabilityDrive.assetReset, this);
    improbabilityDurationTimer.timer.start();
    improbabilityDriveTriggered = true;
    currentScenario = 1;
    background.background.loadTexture(improbabilityScenarioAssets[1].background);
    player.playerSprite.loadTexture(improbabilityScenarioAssets[1].player, 0);
    enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarioAssets[1].enemy, 0);
    });
    coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarioAssets[1].coins);
    });
  }

  assetReset() {
    console.log('reset', this);
    currentScenario = 'reset';
    background.background.loadTexture(improbabilityScenarioAssets['reset'].background);
    player.playerSprite.loadTexture(improbabilityScenarioAssets['reset'].player, 0);
    enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarioAssets['reset'].enemy, 0);
    });
    coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarioAssets['reset'].coins);
    });
  }

  randomObstacle() {
    var obstacleTriggered = Math.random() <= 0.5 ? obstacle.whale : obstacle.petunias;
    obstacleTriggered();
  }
}

const improbabilityScenarioAssets = {
  reset: {
    player: `rocket_${config.playerColour}`, //get the right one from config
    enemy: 'enemyShip',
    background: 'background1',
    coins: 'coin',
  },
  1 : {
    player: 'IID_player1',
    enemy: 'IID_enemy1',
    background: 'IID_background1',
    coins: 'IID_teacup',
  }
};
