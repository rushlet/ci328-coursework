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
    var eventTriggered = Math.random() <= 0.5 ? this.regenerateAssets : this.randomEvent;
    console.log(this);
    let that = this;
    eventTriggered(button_iid, that);
  }

  regenerateAssets(button_iid, that) {
    console.log('iid triggered');
    var improbabilityDriveDuration = config[config.currentLevel]['infiniteImprobabilityDuration'];
    that.improbabilityDurationTimer = DontPanic.game.time.events.loop(Phaser.Timer.SECOND * improbabilityDriveDuration, that.assetReset, this);
    that.improbabilityDurationTimer.timer.start();
    button_iid.kill();
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
    console.log('reset');
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

  randomEvent() {
    var eventTriggered = Math.random() <= 0.5 ? Whale : Petunias;
    new eventTriggered();
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

class Whale {
  constructor() {
    var randomX = Math.floor(Math.random() * 300) + 100;
    const whale = DontPanic.game.add.sprite(randomX, -100, 'whale');
    whale.scale.x = 0.3;
    whale.scale.y = 0.3;
    DontPanic.game.physics.arcade.enable(whale);
    whale.body.collideWorldBounds = false;
    whale.body.gravity.y = 50;
    this.whaleSprite = whale;
  }
}

class Petunias {
  constructor() {
    var randomX = Math.floor(Math.random() * 320) + 25;
    const petunias = DontPanic.game.add.sprite(randomX, -50, 'petunias');
    petunias.scale.x = 0.1;
    petunias.scale.y = 0.1;
    DontPanic.game.physics.arcade.enable(petunias);
    petunias.body.collideWorldBounds = false;
    petunias.body.gravity.y = 60;
    this.petuniasSprite = petunias;
  }
}
