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
      var button_iid = this.improbabilityDrive.create(DontPanic.game.world.centerX/2, DontPanic.game.world.height - 50, 'red_button');
      button_iid.scale.x = 0.3;
      button_iid.scale.y = 0.3;
      button_iid.enableBody = true;
      button_iid.animation = button_iid.animations.add('flash', [0,1,0,1,0,1], true);
      button_iid.play('flash');
      button_iid.inputEnabled = true;
      button_iid.events.onInputDown.add(this.regenerateAssets, this);
      DontPanic.game.debug.body(button_iid);
      improbabilityDrive.generated = true;
    }
  }

  regenerateAssets(button_iid) {
    console.log('iid triggered');
    button_iid.kill();
  }
}
