var currentScenario = 'reset';

class ImprobabilityDrive {
  constructor() {
    let improbabilityDrive = DontPanic.game.add.group();
    improbabilityDrive.enableBody = true;
    DontPanic.game.physics.arcade.enable(improbabilityDrive);
    improbabilityDrive.generated = false;
    this.improbabilityDrive = improbabilityDrive;
    var improbabilityDriveDelay = config[config.currentLevel]['infiniteImprobabilityDelay'];
    this.improbabilityDriveTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * improbabilityDriveDelay, this.improbabilityDriveGenerator, this);
    this.improbabilityDriveTimer.timer.start();
    this.improbabilityDrive = improbabilityDrive;
  }

  improbabilityDriveGenerator() {
    if (DontPanic.improbabilityDrive.generated) {
      DontPanic.improbabilityDrive.generated = false;
    } else {
      var button_iid = this.improbabilityDrive.create(0, DontPanic.game.world.height - 75, 'red_button');
      resizeSprite(button_iid, 0.5);
      button_iid.enableBody = true;
      button_iid.body.setSize(70, 60, 0, 0);
      button_iid.body.immovable = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1,0], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.input.useHandCursor = true;
      button_iid.events.onInputDown.add(this.triggerEvent, this);
      DontPanic.improbabilityDrive.generated = true;
      button_iid.alpha = 0;
      DontPanic.game.add.tween(button_iid).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
      DontPanic.improbabilityDrive.destructionTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * 3.5, this.removeButton, this);
    }
  }

  removeButton() {
    eventOnLatestChildAdded(DontPanic.improbabilityDrive.improbabilityDrive.children, DontPanic.improbabilityDrive.fadeOut)
  }

  fadeOut(sprite) {
    var fadeOut = DontPanic.game.add.tween(sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
    fadeOut.onComplete.add((button)=>{button.kill();}, this);
  }

  triggerEvent(button_iid){
    var eventTriggered = Math.random() <= 0.75 ? this.randomAssets : this.randomObstacle;
    eventTriggered(button_iid);
    button_iid.kill();
  }

  randomAssets(button_iid) {
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    let improbabilityDurationTimer = DontPanic.game.time.events.add(Phaser.Timer.SECOND * improbabilityDriveDuration, DontPanic.improbabilityDrive.assetReset, this);
    improbabilityDurationTimer.timer.start();
    DontPanic.improbabilityDriveTriggered = true;
    currentScenario = randomInt(3, 1);
    console.log(currentScenario);
    DontPanic.improbabilityDrive.regenerateAssets();
  }

  assetReset() {
    currentScenario = 'reset';
    DontPanic.improbabilityDrive.regenerateAssets();
  }

  regenerateAssets() {
    DontPanic.background.loadTexture(improbabilityScenarioAssets[currentScenario].background);
    DontPanic.player.playerSprite.loadTexture(improbabilityScenarioAssets[currentScenario].player, 0);
    DontPanic.enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarioAssets[currentScenario].enemy, 0);
    });
    DontPanic.coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarioAssets[currentScenario].coins);
    });
  }

  randomObstacle() {
    var obstacleTriggered = Math.random() <= 0.5 ? DontPanic.obstacle.whale : DontPanic.obstacle.petunias;
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
  },
  2 : {
    player: 'IID_player2',
    enemy: 'IID_enemy2',
    background: 'IID_background2',
    coins: 'IID_coin2',
  },
  3 : {
    player: 'IID_player3',
    enemy: 'IID_enemy3',
    background: 'IID_background3',
    coins: 'IID_coin3',
  }
};
