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
      console.log('improbabilityDrive generating!');
      console.log(DontPanic.game.world.height);
      var button_iid = this.improbabilityDrive.create(DontPanic.game.world.centerX/5, 1050, 'red_button');
      button_iid.scale.x = 0.3;
      button_iid.scale.y = 0.3;
      button_iid.enableBody = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.events.onInputDown.add(this.regenerateAssets, this);
      DontPanic.game.debug.body(button_iid);
      console.log(button_iid);
      improbabilityDrive.generated = true;
    }
  }

  //could call either regenerate assets or trigger another event (whale?)

  regenerateAssets(button_iid) {
    console.log('iid triggered');
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    this.improbabilityDurationTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * improbabilityDriveDuration, this.improbabilityDriveReset, this);
    this.improbabilityDurationTimer.timer.start();
    button_iid.kill();
    improbabilityDriveTriggered = true;
    currentScenario = 1;
    background.background.loadTexture(improbabilityScenarios[1].background);
    player.playerSprite.loadTexture(improbabilityScenarios[1].player, 0);
    enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarios[1].enemy, 0);
    });
    coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarios[1].coins);
    });
  }

  improbabilityDriveReset() {
    console.log('reset');
    currentScenario = 'reset';
    background.background.loadTexture(improbabilityScenarios['reset'].background);
    player.playerSprite.loadTexture(improbabilityScenarios['reset'].player, 0);
    enemy.enemies.forEachExists((enemy) =>  {
      enemy.loadTexture(improbabilityScenarios['reset'].enemy, 0);
    });
    coins.coins.forEachExists((coin) =>  {
      coin.loadTexture(improbabilityScenarios['reset'].coins);
    });
  }
}

const improbabilityScenarios = {
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
}
