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
    if (improbabilityDrive.generated) {
      improbabilityDrive.generated = false;
    } else {
      var button_iid = this.improbabilityDrive.create(DontPanic.game.world.centerX/5, 1050, 'red_button');
      button_iid.scale.x = 0.5;
      button_iid.scale.y = 0.5;
      button_iid.enableBody = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1,0], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.events.onInputDown.add(this.triggerEvent, this);
      DontPanic.game.debug.body(button_iid);
      improbabilityDrive.generated = true;
      button_iid.alpha = 0;
      DontPanic.game.add.tween(button_iid).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
      improbabilityDrive.destructionTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * 3.5, this.removeButton, this);
    }
  }

  removeButton() {
    eventOnLatestChildAdded(improbabilityDrive.improbabilityDrive.children, improbabilityDrive.fadeOut)
  }

  fadeOut(sprite) {
    var fadeOut = DontPanic.game.add.tween(sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
    fadeOut.onComplete.add((button)=>{button.kill();}, this);
  }

  triggerEvent(button_iid){
    var eventTriggered = Math.random() <= 0.5 ? this.randomAssets : this.randomObstacle;
    eventTriggered(button_iid);
    button_iid.kill();
  }

  randomAssets(button_iid) {
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    let improbabilityDurationTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * improbabilityDriveDuration, improbabilityDrive.assetReset, this);
    improbabilityDurationTimer.timer.start();
    improbabilityDriveTriggered = true;
    currentScenario = 1; // when more scenarios are added this will be randomly generated
    improbabilityDrive.regenerateAssets();
  }

  assetReset() {
    currentScenario = 'reset';
    improbabilityDrive.regenerateAssets();
  }

  regenerateAssets() {
    background.loadTexture(improbabilityScenarioAssets[currentScenario].background);
    player.playerSprite.loadTexture(improbabilityScenarioAssets[currentScenario].player, 0);
    enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarioAssets[currentScenario].enemy, 0);
    });
    coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarioAssets[currentScenario].coins);
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
